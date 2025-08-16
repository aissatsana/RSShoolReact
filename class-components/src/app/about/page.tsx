import styles from './About.module.css';

export const metadata = { title: 'About' };

// export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <h3 className={styles.about}>
      The application was made by
      <a
        className={styles.about__link}
        href="https://github.com/aissatsana"
        target="_blank"
        rel="noreferrer noopener"
      >
        aissatsana
      </a>
      as part of the
      <a
        className={styles.about__link}
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer noopener"
      >
        RS School React course
      </a>
    </h3>
  );
}
