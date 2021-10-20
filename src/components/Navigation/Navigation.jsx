import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';

import logo from '../../images/logo.png';
import styles from './Navigation.module.scss';

export default function Navigation () {
  const isLoggedIn = useSelector(authSelectors.getIsAuthorized);

  return (
    <nav className={styles.Navigation}>
      <NavLink
        exact
        to="/"
        className={styles.LogoLink}
        activeClassName={styles.LogoLinkActive}
      >
        <img src={logo} alt="logo" />
      </NavLink>

      {isLoggedIn && (
        <NavLink
          exact
          to="/contacts"
          className={styles.NavLink}
          activeClassName={styles.NavLinkActive}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};