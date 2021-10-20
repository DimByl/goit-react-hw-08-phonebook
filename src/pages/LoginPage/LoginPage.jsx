import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';

import authOperations from '../../redux/auth/auth-operations';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = useCallback(
    event => {
      event.preventDefault();
      if (!email || !password) {
        alert('Fill the Login form');
        return;
      }
      dispatch(authOperations.logIn({ email, password }));

      setEmail('');
      setPassword('');
    },
  [dispatch, email, password],
  );

  return (
    <Container>
      <form
        className={styles.SignUpForm}
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <label className={styles.formLabel}>
          <span className={styles.formText}>E-mail:</span>
          <input
            type="email"
            className={styles.formInput}
            placeholder="Enter e-mail"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formText}>Password:</span>
          <input
            type="password"
            className={styles.formInput}
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </label>

        <button className={styles.formBtn} type="submit">
          Log in
        </button>
      </form>
    </Container>
  );
};

export default LoginPage;