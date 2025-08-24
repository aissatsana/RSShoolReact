import { type FC } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./ControlledForm.module.css";
import type { Country, formData, Gender, FormProps } from "../../types";
import { COUNTRIES, EMAIL_REGEX, IMAGE_TYPES, MAX_IMAGE_MB, PASSWORD_REGEX } from "../../constants";
import { fileToBase64, getPasswordStrength } from "../../helpers";

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Enter name")
      .test("starts-with-capital", "Name should start with uppercased letter", (v) => (v ? /^[A-Z]/.test(v) : false)),
    age: yup.number().typeError("Enter age").integer("Age should be integer number").min(1, "Age should be from 1 to 99").max(99, "Age should be from 1 to 99").required("Enter age"),
    email: yup.string().trim().required("Enter email").matches(EMAIL_REGEX, "Enter correct email"),
    password: yup.string().required("Enter password").matches(PASSWORD_REGEX, "Password should contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character"),
    confirmPassword: yup
      .string()
      .required("Confirm password")
      .oneOf([yup.ref("password")], "Passwords should match"),
    gender: yup.string<Gender>().required("Choose one option"),
    country: yup.string<Country>().required("Choose one option"),
    agreement: yup.boolean().oneOf([true], "The agreement is binding"),
    media: yup
      .mixed<FileList>()
      .test("file-required", "Upload file", (v) => v instanceof FileList && v.length > 0)
      .test("file-type", "Only PNG and JPEG are allowed", (v) => {
        if (!(v instanceof FileList) || v.length === 0) return false;
        return IMAGE_TYPES.includes(v[0]?.type);
      })
      .test("file-size", `Max file size is ${MAX_IMAGE_MB}MB`, (v) => {
        if (!(v instanceof FileList) || v.length === 0) return false;
        return v[0].size <= MAX_IMAGE_MB * 1024 * 1024;
      }),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

export const ControlledForm: FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      country: "" as Country,
      agreement: false,
      media: undefined,
    },
  });

  const password = watch("password");
  const passwordStrength = password ? getPasswordStrength(password) : null;

  const onValid: SubmitHandler<FormValues> = async (data) => {
    const file = data.media?.[0];
    if (!file) {
      setError("media", { message: "Upload file" });
      return;
    }
    const file64 = await fileToBase64(file);

    const result: formData = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      country: data.country,
      agreement: !!data.agreement,
      file: file64,
    };

    onSubmit(result);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate>
      <div className={styles.wrap}>
        <label className={styles.label}>
          Name
          <input className={styles.input} type="text" placeholder="Name" {...register("name")} />
        </label>
        <p className={styles.error}>{errors.name?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Age
          <input className={styles.input} type="number" placeholder="Age" {...register("age", { valueAsNumber: true })} />
        </label>
        <p className={styles.error}>{errors.age?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          E-mail
          <input className={styles.input} type="email" placeholder="E-mail" {...register("email")} />
        </label>
        <p className={styles.error}>{errors.email?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Password {passwordStrength && <span className={styles["password-hint"]}>({passwordStrength.label})</span>}
          <input className={styles.input} type="password" placeholder="Password" {...register("password")} />
        </label>
        <p className={styles.error}>{errors.password?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          Confirm password
          <input className={styles.input} type="password" placeholder="Confirm password" {...register("confirmPassword")} />
        </label>
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Gender</legend>
        <div className={styles.wrap}>
          <label>
            Female
            <input type="radio" value="female" {...register("gender")} />
          </label>
          <label>
            Male
            <input type="radio" value="male" {...register("gender")} />
          </label>
          <label>
            Other
            <input type="radio" value="other" {...register("gender")} />
          </label>
          <p className={styles.error}>{errors.gender?.message}</p>
        </div>
      </fieldset>

      <div className={styles.wrap}>
        <label htmlFor="country">Country</label>
        <select id="country" {...register("country")} defaultValue="">
          <option value="" disabled>
            Choose country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p className={styles.error}>{errors.country?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label className={styles.label}>
          <input type="checkbox" {...register("agreement")} />
          <span>Accept Terms and Conditions agreement</span>
        </label>
        <p className={styles.error}>{errors.agreement?.message}</p>
      </div>

      <div className={styles.wrap}>
        <label>
          Upload file (only png and jpeg)
          <input type="file" accept="image/png, image/jpeg" {...register("media")} />
        </label>
        <p className={styles.error}>{errors.media?.message}</p>
      </div>

      <button type="submit" disabled={!isDirty || !isValid}>
        Submit
      </button>
    </form>
  );
};
