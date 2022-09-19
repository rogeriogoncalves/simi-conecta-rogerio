import React, { useState, useRef } from 'react';
import { Input, Button, Spin } from 'antd';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/auth';
import useAsync from '../hooks/useAsync';
import styles from './Login.module.css';

function Login() {
  const { isLoading, isError, error, run } = useAsync();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const isSubmitable = formData.email && formData.password;
  const submitBtnRef = useRef();

  const onChangeInput = e => {
    const { name, value } = e.target;
    return setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onTryLogin = () => {
    if (isSubmitable) {
      run(login(formData));
    }
  };

  return (
    <div className={styles.Container}>
      <Logo />
      <form className={styles.FormContainer}>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          name="email"
          size="large"
          value={formData.email}
          onChange={onChangeInput}
          onPressEnter={() => submitBtnRef.current.click()}
        />

        <Input.Password
          type="password"
          placeholder="Digite sua senha"
          name="password"
          size="large"
          value={formData.password}
          onChange={onChangeInput}
          onPressEnter={onTryLogin}
        />

        <Button
          block
          disabled={!isSubmitable}
          size="large"
          type="primary"
          name="entrar"
          onClick={onTryLogin}
          ref={submitBtnRef}
        >
          Entrar
        </Button>
      </form>
      {isLoading ? <Spin /> : null}
      {isError ? <p>{error.response.data}</p> : null}
      <div className={styles.Register}>
        Não possui conta? <br />
        <a name="register" href="/register">
          Cadastre-se
        </a>
        &nbsp;agora!
      </div>
    </div>
  );
}

export default Login;
