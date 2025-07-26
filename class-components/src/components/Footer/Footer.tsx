import { NavLink } from 'react-router-dom';
import './style.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <NavLink
        className={({ isActive }) =>
          `footer__link${isActive ? ' footer__link--active' : ''}`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `footer__link${isActive ? ' footer__link--active' : ''}`
        }
      >
        About app
      </NavLink>
    </footer>
  );
};
