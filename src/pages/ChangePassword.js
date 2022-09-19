import React, { useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { confirmPassword, required } from '../utils/validations';
import useAsync from '../hooks/useAsync';
import { useAuth } from '../contexts/auth';
import h1Style from './ChangePassword.AntdStyle';
import styles from './ChangePassword.module.css';

function ChangePassword() {
  const { user, changePassword } = useAuth();
  const { isLoading, isError, error, run } = useAsync();
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: user.email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onFinishForm = () => {
    run(changePassword(formData)).then(() => {
      message.success({
        key: 'successful',
        content: 'Senha alterada com sucesso!',
        duration: 5,
        onClose: history.goBack(),
        onClick: () => message.destroy('successful'),
      });
    });
  };

  return (
    <div className={styles.Container}>
      <h1 style={h1Style}>Alterar senha</h1>
      <Form
        onFinish={() => onFinishForm()}
        className={styles.FormContainer}
        layout="vertical"
        requiredMark
      >
        <Form.Item className={styles.ArrowBack} name="arrowBack">
          <ArrowLeftOutlined onClick={() => history.goBack()} />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label={<span className={styles.FormItemLabel}>Senha atual:</span>}
          rules={[required('Campo obrigatório!')]}
          value={formData.oldPassword}
          onChange={onChangeInput}
        >
          <Input.Password
            name="oldPassword"
            type="password"
            placeholder="Senha atual"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={<span className={styles.FormItemLabel}>Nova senha:</span>}
          rules={[
            required('Campo obrigatório!'),
            { type: 'string', min: 6, message: 'Senha muito curta' },
          ]}
          value={formData.newPassword}
          onChange={onChangeInput}
          hasFeedback
        >
          <Input.Password
            name="newPassword"
            type="password"
            placeholder="Nova senha"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className={styles.FormItemLabel}>Confirmar senha:</span>}
          value={formData.confirmPassword}
          onChange={onChangeInput}
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            required('Campo obrigatório!'),
            formInstance => confirmPassword(formInstance, 'newPassword'),
          ]}
        >
          <Input.Password
            name="confirmPassword"
            type="password"
            placeholder="Nova senha"
            size="large"
          />
        </Form.Item>

        {isLoading ? <Spin /> : null}
        {isError ? error.response.data : null}

        <Form.Item name="submit">
          <Button
            disabled={
              formData.oldPassword === '' ||
              formData.newPassword === '' ||
              formData.confirmPassword !== formData.newPassword
            }
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.Button}
          >
            Confirmar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;
