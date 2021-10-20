import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../components/Container';

import authOperations from '../../redux/auth/auth-operations';

import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

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

  const handleFormSubmit = event => {
    event.preventDefault();

    const user = { name, email, password };
    dispatch(authOperations.signUp(user));

    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <form
        className={styles.SignUpForm}
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <label className={styles.formLabel}>
          <span className={styles.formText}>Name:</span>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
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
            pattern="^[a-z0-9_-]{7,18}$"
            title="Password length cannot be shorter than 7 characters, can contain letters, numbers, hyphens and underscores"
            required
          />
        </label>

        <button className={styles.formBtn} type="submit">
          Sign up
        </button>
      </form>
    </Container>
  );
};

export default SignUpPage;