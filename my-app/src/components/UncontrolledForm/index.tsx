import { useRef, useState, type ChangeEvent, type FC, type FormEvent } from "react";
import styles from "./UncontrolledForm.module.css";
import type { formData } from "../../types";
import { COUNTRIES, EMAIL_REGEX, PASSWORD_REGEX } from "../../constants";

interface UncontrolledFormProps {
  onSubmit: ({}: formData) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        res(reader.result);
      } else {
        rej(new Error("Unexpected result type"));
      }
    };
    reader.onerror = () => rej(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

type Strength = "weak" | "medium" | "strong";

function getPasswordStrength(password: string): { score: number; label: Strength } {
  let score = 0;
  if (/[0-9]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;

  if (score <= 1) return { score, label: "weak" };
  if (score <= 3) return { score, label: "medium" };
  return { score, label: "strong" };
}

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const MAX_MB = 1;

  const formRef = useRef<HTMLFormElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPassRef = useRef<HTMLInputElement | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: Strength } | null>(null);

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleConfirmPassInput = () => {
    const password = passwordRef.current?.value;
    const confirmPass = confirmPassRef.current?.value;

    if (password !== confirmPass) {
      confirmPassRef.current?.setCustomValidity("Passwords should match");
    } else {
      confirmPassRef.current?.setCustomValidity("");
    }
  };

  const handlePasswordInput = () => {
    const password = passwordRef.current?.value;

    setPasswordStrength(password ? getPasswordStrength(password) : null);
    console.log(password);
    if (confirmPassRef.current && confirmPassRef.current.value) {
      handleConfirmPassInput();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);
    setImageBase64(null);
    if (!file) return;

    const allowedTypes = ["image/png", "image,jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Only PNG and JPEG are allowed");
      return;
    }

    const maxBytes = MAX_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      setImageError(`Max file size is ${MAX_MB}MB`);
      return;
    }

    try {
      const b64 = await fileToBase64(file);
      setImageBase64(b64);
    } catch {
      setImageError("Failed to read file");
    }
  };

  const getTypedRes = async (data: FormData) => {
    const name = String(data.get("name"));
    const age = Number(data.get("age"));
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const gender = String(data.get("gender"));
    const country = String(data.get("country"));
    const agreement = data.has("agreement");

    return {
      name,
      age,
      email,
      password,
      gender,
      country,
      agreement,
      file64: imageBase64,
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = await getTypedRes(data);
    console.log(result);
    // onSubmit(res);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <label>
        <input name="name" type="text" placeholder="Name" pattern="^[A-ZА-Я].*" title="Name should start with a capital letter" required></input>
      </label>
      <label>
        <input name="age" type="number" placeholder="Age" min={1} required title="Age should be number, no negative values"></input>
      </label>
      <label>
        <input name="email" type="text" placeholder="E-mail" pattern={EMAIL_REGEX.source} title="Enter correct e-mail"></input>
      </label>

      <div>
        <label>
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="Password"
            pattern={PASSWORD_REGEX.source}
            title="Password should contain at least one number, uppercase letter, lowercase letter and special character"
            onInput={handlePasswordInput}
          ></input>
        </label>
        <p>Must include: number, uppercase, lowercase, special char. Length ≥ 12 is stronger.</p>

        {passwordStrength && <p>{passwordStrength.label} password</p>}
      </div>
      <label>
        <input ref={confirmPassRef} name="password-confirm" type="text" placeholder="Confirm password" onInput={handleConfirmPassInput}></input>
      </label>

      <fieldset>
        <legend>Gender</legend>
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
      </fieldset>

      <label>
        Accept Terms and Conditions agreement
        <input name="agreement" type="checkbox" required></input>
      </label>

      <label>
        Upload file (only png and jpeg)
        <input name="media" type="file" required accept="image/png, image/jpeg" onChange={handleFileChange}></input>
        <p>{imageError ? imageError : " "}</p>
      </label>

      <select name="country" required defaultValue="">
        <option value="" disabled>
          Choose country
        </option>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button type="submit">Отправить</button>
    </form>
  );
};
