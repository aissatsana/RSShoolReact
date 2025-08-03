import './style.css';

export const About = () => {
  return (
    <h3 className="about">
      The application was made by
      <a
        className="about__link"
        href="https://github.com/aissatsana"
        target="_blank"
        rel="noreferrer noopener"
      >
        aissatsana
      </a>
      as part of the
      <a
        className="about__link"
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer noopener"
      >
        RS School React course
      </a>
    </h3>
  );
};
