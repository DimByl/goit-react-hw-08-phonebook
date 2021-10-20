import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authSelectors, authOperations } from '../../redux/auth';

import avatar from '../../images/avatar.png';
import styles from './UserMenu.module.scss';

export default function UserMenu () {
  const name = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();

  const logOutHandler = useCallback(
    () => dispatch(authOperations.logOut()),
  [dispatch],
  );

  return (
    <div className={styles.UserMenu}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={avatar} alt="panda" />

        <div className={styles.userText}>
          <span className={styles.text}>{name}!</span>
          <span className={styles.text}>Welcome!</span>
        </div>
      </div>

      <button className={styles.logoutBtn} onClick={logOutHandler}>
        Logout
      </button>
    </div>
  );
};