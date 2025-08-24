import { useRef, useState, type FC, type FormEvent } from "react";
import styles from "./UncontrolledForm.module.css";
import type { Country, formData, Gender } from "../../types";
import { COUNTRIES, EMAIL_REGEX, IMAGE_TYPES, MAX_IMAGE_MB, PASSWORD_REGEX } from "../../constants";
import type { FormErrors, Strength, UncontrolledFormProps } from "./types";
import { fileToBase64, getPasswordStrength } from "./helpers";

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: Strength } | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const validateName = (name: string) => {
    if (!name) return "Enter name";
    if (!/^[A-Z]/.test(name)) return "Name should start with uppercased letter";
    return null;
  };

  const validateAge = (age: number) => {
    if (!age) return "Enter age";
    if (!Number.isInteger(age)) return "Age should be integer number";
    if (age < 1 || age > 99) return "Age should be from 1 to 99";
    return null;
  };

  const validateEmail = (email: string) => {
    if (!email) return "Enter email";
    if (!EMAIL_REGEX.test(email)) return "Enter correct email";
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password) return "Enter password";
    if (!PASSWORD_REGEX.test(password)) return "Password should contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character";
    return null;
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!password) return null;
    if (!confirmPassword) return "Confirm password";
    if (password !== confirmPassword) return "Passwords should match";
    return null;
  };

  const validateGender = (gender: string) => (!gender ? "Choose one option" : undefined);
  const validateCountry = (country: string) => (!country ? "Choose one option" : undefined);
  const validateAgreement = (checked: boolean) => (!checked ? "The agreement is binding" : undefined);

  const handlePasswordInput = () => {
    const password = passwordRef.current?.value;
    setPasswordStrength(password ? getPasswordStrength(password) : null);
  };

  const validateFile = async (value: File) => {
    if (!value) return "Upload file";
    if (!IMAGE_TYPES.includes(value.type)) return "Only PNG and JPEG are allowed";
    if (value.size > MAX_IMAGE_MB * 1024 * 1024) return `Max file size is ${MAX_IMAGE_MB}MB`;
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("name"));
    const age = Number(data.get("age"));
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const confirmPassword = String(data.get("password-confirm"));
    const gender = String(data.get("gender")) as Gender;
    const country = String(data.get("country")) as Country;
    const agreement = data.has("agreement");
    const media = data.get("media");

    const newErrors: FormErrors = {};
    newErrors.name = validateName(name) || "";
    newErrors.age = validateAge(age) || "";
    newErrors.email = validateEmail(email) || "";
    newErrors.password = validatePassword(password) || "";
    newErrors.passwordConfirm = validateConfirmPassword(password, confirmPassword) || "";
    newErrors.gender = validateGender(gender) || "";
    newErrors.country = validateCountry(country) || "";
    newErrors.agreement = validateAgreement(agreement) || "";

    const file = media instanceof File ? media : null;
    newErrors.file = (file && (await validateFile(file))) || "";

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    const file64 = file ? await fileToBase64(file) : "";

    const result: formData = {
      name,
      age,
      email,
      password,
      gender,
      country,
      agreement,
      file: file64,
    };

    onSubmit(result);
    console.log(result);

    // onSubmit(res);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <div className={styles.wrap}>
        <label className={styles.label}>
          Name
          <input className={styles.input} name="name" type="text" placeholder="Name"></input>
        </label>
        <p className={styles.error}>{errors.name}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Age
          <input className={styles.input} name="age" type="number" placeholder="Age"></input>
        </label>
        <p className={styles.error}>{errors.age}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          E-mail
          <input className={styles.input} name="email" type="text" placeholder="E-mail"></input>
        </label>
        <p className={styles.error}>{errors.email}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Password
          {passwordStrength && <span className={styles["password-hint"]}>({passwordStrength.label})</span>}
          <input className={styles.input} ref={passwordRef} name="password" type="password" placeholder="Password" onInput={handlePasswordInput}></input>
        </label>

        <p className={styles.error}>{errors.password}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Confrim password
          <input className={styles.input} name="password-confirm" type="text" placeholder="Confirm password"></input>
        </label>
        <p className={styles.error}>{errors.passwordConfirm}</p>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Gender</legend>
        <div className={styles.wrap}>
          <label>
            Female
            <input name="gender" value="female" type="radio" required></input>
          </label>
          <label>
            Male
            <input name="gender" value="male" type="radio"></input>
          </label>
          <label>
            Other
            <input name="gender" value="other" type="radio"></input>
          </label>
          <p className={styles.error}>{errors.gender}</p>
        </div>
      </fieldset>

      <div className={styles.wrap}>
        <label htmlFor="country">Country</label>
        <select id="country" name="country" required defaultValue="">
          <option value="" disabled>
            Choose country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p className={styles.error}>{errors.country}</p>
      </div>

      <div className={styles.wrap}>
        <label>
          <input name="agreement" type="checkbox" required></input> <p className={styles.error}>{errors.agreement}</p>
          Accept Terms and Conditions agreement
        </label>
        <p className={styles.error}>{errors.agreement}</p>
      </div>

      <div className={styles.wrap}>
        <label>
          Upload file (only png and jpeg)
          <input name="media" type="file" required accept="image/png, image/jpeg"></input>
          <p className={styles.error}>{errors.file}</p>
        </label>
        <p className={styles.error}>{errors.agreement}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
