import { useRef, type FC } from "react";
import styles from "./UncontrolledForm.module.css";
import type { formData } from "../../types";
import { COUNTRIES } from "../../constants";

interface UncontrolledFormProps {
  onSubmit: ({}: formData) => void;
}

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const fileToBase64 = (file: File) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(String(reader.result));
      reader.onerror = () => rej;
      reader.readAsDataURL(file);
    });
  };

  const getTypedRes = async (data: FormData) => {
    const name = String(data.get("name"));
    const age = Number(data.get("age"));
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const gender = String(data.get("gender"));
    const country = String(data.get("country"));
    const agreement = data.has("agreement");

    let fileUrl;
    const media = data.get("media");
    if (media instanceof File) {
      fileUrl = await fileToBase64(media);
    }

    return {
      name,
      age,
      email,
      password,
      gender,
      country,
      agreement,
      fileUrl,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = await getTypedRes(data);
    console.log(result);
    // onSubmit(res);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <label>
        <input name="name" type="text" placeholder="Name"></input>
      </label>
      <label>
        <input name="age" type="number" placeholder="Age"></input>
      </label>
      <label>
        <input name="email" type="text" placeholder="E-mail"></input>
      </label>
      {/* 1 цифра, 1 заглавная буква, 1 строчная буква, 1 специальный символ */}
      <label>
        <input name="password" type="text" placeholder="Password"></input>
      </label>
      <label>
        <input name="password-confirm" type="text" placeholder="Confirm password"></input>
      </label>

      <div>
        <label>
          Female
          <input name="gender" value="female" type="radio"></input>
        </label>
        <label>
          Male
          <input name="gender" value="male" type="radio"></input>
        </label>
        <label>
          Other
          <input name="gender" value="other" type="radio"></input>
        </label>
      </div>

      <label>
        Accept agreement
        <input name="agreement" type="checkbox"></input>
      </label>

      <label>
        Upload file (only png and jpeg)
        <input name="media" type="file"></input>
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
