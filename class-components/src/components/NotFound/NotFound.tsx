import { NavLink } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">
        Oops, there is nothing, probably Rick deleted this page
      </p>
      <NavLink className="not-found__link" to="/">
        Go home
      </NavLink>
    </div>
  );
};
