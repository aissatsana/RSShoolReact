import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loader__spinner}></div>
    <p className={styles.loader__text}>Loading...</p>
  </div>
);
