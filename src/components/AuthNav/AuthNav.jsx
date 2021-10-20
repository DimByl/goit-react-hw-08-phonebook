import { NavLink } from 'react-router-dom';

import styles from './AuthNav.module.scss';

const AuthNav = () => (
  <div className={styles.AuthNav}>
    <NavLink
      exact
      to="/signup"
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      Sign up
    </NavLink>

    <NavLink
      exact
     to="/login"
      className={styles.NavLink}
      activeClassName={styles.NavLinkActive}
    >
      Log in
    </NavLink>
  </div>
);

export default AuthNav;