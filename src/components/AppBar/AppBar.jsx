import { useSelector } from 'react-redux';

import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';

import { getIsAuthorized } from '../../redux/auth/auth-selectors';

import styles from './AppBar.module.scss';

const AppBar = () => {
  const isAuthorized = useSelector(getIsAuthorized);

  return (
    <div className={styles.AppBar}>
      <Navigation />
      {isAuthorized ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;