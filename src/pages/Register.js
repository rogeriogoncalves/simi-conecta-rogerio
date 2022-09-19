import React, { useState } from 'react';
import { Form, Input, Button, Pagination, Spin } from 'antd';
import {
  ArrowLeftOutlined,
  DollarOutlined,
  FastForwardOutlined,
  GlobalOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {
  FIRST_PAGE,
  SECOND_PAGE,
  REGISTER_TOTAL_PAGES,
  DATA_ITEMS_PER_PAGE,
  CATEGORIES,
} from '../utils/constants';
import { confirmPassword, email, required } from '../utils/validations';
import isFirefoxAndMobile from '../utils/browsers';
import { useAuth } from '../contexts/auth';
import useAsync from '../hooks/useAsync';
import styles from './Register.module.css';

function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { preRegister } = useAuth();
  const history = useHistory();
  const orgIdx = 0;
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    orgs: [
      {
        name: '',
        startupOuEBT: '',
        description: '',
        contact: {
          linkedin: '',
          mail: '',
          website: '',
        },
        contactedOrgs: [],
        connectionPrefs: {},
      },
    ],
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        orgs: [{ ...prev.orgs[orgIdx], name: value }],
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const onFinishForm = () => {
    run(preRegister(formData));
  };

  const onCategoryClick = value => {
    setFormData(prev => ({
      ...prev,
      orgs: [{ ...prev.orgs[orgIdx], startupOuEBT: value }],
    }));
  };

  return (
    <div className={styles.Container}>
      <h1>Vamos começar</h1>
      <Form
        onFinishFailed={() => setCurrentPage(FIRST_PAGE)}
        onFinish={() => onFinishForm()}
        className={styles.FormContainer}
        layout="vertical"
        requiredMark
      >
        <Form.Item
          className={styles.ArrowBack}
          hidden={currentPage !== FIRST_PAGE}
          name="arrowBack"
        >
          <ArrowLeftOutlined onClick={() => history.push('/')} />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name="email"
          label={<span className={styles.FormItemLabel}>E-mail:</span>}
          rules={[
            email('Por favor, forneça um e-mail válido.'),
            required('Por favor, preencha o e-mail para cadastro.'),
          ]}
          value={formData.email}
          onChange={onChangeInput}
        >
          <Input
            name="email"
            placeholder="E-mail"
            size="large"
            maxLength={255}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name="password"
          label={<span className={styles.FormItemLabel}>Senha:</span>}
          rules={[
            required('Por favor, preencha a senha para cadastro.'),
            { min: 5, message: 'Mínimo 5 caracteres.' },
          ]}
          value={formData.password}
          onChange={onChangeInput}
          hasFeedback
        >
          <Input.Password
            name="password"
            type="password"
            placeholder="Senha"
            size="large"
            maxLength={1024}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name="confirmPassword"
          label={<span className={styles.FormItemLabel}>Confirmar senha:</span>}
          dependencies={['password']}
          hasFeedback
          rules={[
            required('Por favor, confirme a senha para cadastro.'),
            formInstance => confirmPassword(formInstance, 'password'),
          ]}
        >
          <Input.Password
            name="confirmPassword"
            type="password"
            placeholder="Senha"
            size="large"
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name="name"
          label={
            <span className={styles.FormItemLabel}>
              Qual o nome da sua organização?
            </span>
          }
          rules={[required('Por favor, preencha o nome da sua organização.')]}
          value={formData.orgs[orgIdx].name}
          onChange={onChangeInput}
        >
          <Input
            name="name"
            placeholder="Nome da organização"
            size="large"
            maxLength={255}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== SECOND_PAGE}
          label={
            <span className={styles.FormItemLabel}>
              Em qual categoria a organização se encontra?
            </span>
          }
          className={styles.ItemLabelContainer}
        >
          <Button
            className={[styles.Button, styles.ButtonPrimary]}
            block
            disabled={currentPage !== SECOND_PAGE}
            onClick={() => onCategoryClick(CATEGORIES.startup)}
            size="large"
            type="primary"
            htmlType="submit"
            icon={<RocketOutlined />}
          >
            Startup
          </Button>
          <Button
            className={[styles.Button, styles.ButtonDefault]}
            block
            disabled={currentPage !== SECOND_PAGE}
            onClick={() => onCategoryClick(CATEGORIES.accelerator)}
            size="large"
            type="default"
            htmlType="submit"
            icon={<FastForwardOutlined />}
          >
            Aceleradora
          </Button>
          <Button
            className={[styles.Button, styles.ButtonPrimary]}
            block
            disabled={currentPage !== SECOND_PAGE}
            onClick={() => onCategoryClick(CATEGORIES.investors)}
            size="large"
            type="primary"
            htmlType="submit"
            icon={<DollarOutlined />}
          >
            Investidores
          </Button>
          <Button
            className={[styles.Button, styles.ButtonDefault]}
            block
            disabled={currentPage !== SECOND_PAGE}
            onClick={() => onCategoryClick(CATEGORIES.bigCompanies)}
            size="large"
            type="default"
            htmlType="submit"
            icon={<GlobalOutlined />}
          >
            Grandes Empresas
          </Button>
        </Form.Item>

        <Form.Item hidden={currentPage !== SECOND_PAGE}>
          {isLoading ? <Spin /> : null}
          {isError ? <p>{error.response.data}</p> : null}
        </Form.Item>
      </Form>
      <div
        className={
          isFirefoxAndMobile() ? styles.PaginationFirefox : styles.Pagination
        }
      >
        <Pagination
          size="default"
          onChange={page => setCurrentPage(page)}
          current={currentPage}
          defaultPageSize={DATA_ITEMS_PER_PAGE}
          total={REGISTER_TOTAL_PAGES}
        />
      </div>
    </div>
  );
}

export default Register;
