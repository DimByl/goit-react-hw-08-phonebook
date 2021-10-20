import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';

import { authSelectors } from '../../redux/auth';

import styles from './AppBar.module.scss';

export default function AppBar({ isAuthenticated }) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};
AppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};