import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Button, Select, Form, message, Pagination, Spin } from 'antd';
import {
  CheckOutlined,
  QuestionCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import {
  DATA_ITEMS_PER_PAGE,
  FIRST_PAGE,
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  FIFTH_PAGE,
  SIXTH_PAGE,
  REGISTER_ORGANIZATION_TOTAL_PAGES,
  STAGES,
  SEGMENTS,
  TECHNOLOGIES,
  BUSINESS_MODELS,
  SEGMENTATIONS,
  INVESTMENT_PHASES,
  EBT_CONNECTION_PREFS,
  REQUIRED_MSG,
} from '../../utils/constants';
import isFirefoxAndMobile from '../../utils/browsers';
import ModalInfo from '../../components/ModalInfo';
import { useAuth } from '../../contexts/auth';
import useAsync from '../../hooks/useAsync';
import { required } from '../../utils/validations';
import { getPrevEndpoint } from '../Profile';
import {
  h1Style,
  formItemStyle,
  selectStyle,
  submitBtnStyle,
} from './OnboardingOrganization.AntdStyle';
import styles from './OnboardingOrganization.module.css';

const { Option } = Select;

function OnboardingOrganization() {
  const { isLoading, isError, error, run } = useAsync();
  const { user, logout, register, updatePrefs } = useAuth();
  const orgIdx = 0;
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [formData, setFormData] = useState(
    _.pick(user.orgs[orgIdx].connectionPrefs, EBT_CONNECTION_PREFS),
  );

  const onChangeStages = value => {
    setFormData(prev => ({ ...prev, stages: value }));
  };

  const onChangeSegments = value => {
    setFormData(prev => ({ ...prev, segments: value }));
  };

  const onChangeTechnologies = value => {
    setFormData(prev => ({ ...prev, technologies: value }));
  };

  const onChangeBusinessModels = value => {
    setFormData(prev => ({ ...prev, businessModels: value }));
  };

  const onChangeClientSegmentations = value => {
    setFormData(prev => ({ ...prev, clientSegmentations: value }));
  };

  const onChangeInvestmentPhases = value => {
    setFormData(prev => ({ ...prev, investmentPhases: value }));
  };

  const onArrowLeftClick = () => {
    const prevEndpoint = getPrevEndpoint();
    if (prevEndpoint === '/profile') {
      history.goBack();
    } else {
      logout();
      history.push('/register');
    }
  };

  const onFinishForm = () => {
    const prevEndpoint = getPrevEndpoint();
    if (prevEndpoint === '/profile') {
      const data = { email: user.email, connectionPrefs: formData };
      run(updatePrefs(data)).then(() =>
        message.success({
          key: 'successful',
          content: 'Preferências atualizadas com sucesso!',
          duration: 5,
          onClose: history.push(prevEndpoint),
          onClick: () => message.destroy('successful'),
        }),
      );
    } else {
      const newUser = { ...user };
      newUser.orgs[orgIdx].connectionPrefs = formData;
      run(register(newUser)).then(() =>
        message.success({
          key: 'successful',
          content: 'Cadastro efetuado com sucesso!',
          duration: 3,
          onClose: history.push('/'),
          onClick: () => message.destroy('successful'),
        }),
      );
    }
  };

  return (
    <div className={styles.Container}>
      <h1 style={h1Style}>{user.orgs[orgIdx].startupOuEBT}</h1>
      <Form
        className={styles.FormContainer}
        requiredMark={false}
        onFinish={onFinishForm}
      >
        <Form.Item
          className={styles.ArrowBack}
          hidden={currentPage !== FIRST_PAGE}
          name="arrowBack"
        >
          <ArrowLeftOutlined onClick={onArrowLeftClick} />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIRST_PAGE}
          name={EBT_CONNECTION_PREFS[FIRST_PAGE - 1]}
          initialValue={formData.stages}
          label={
            <span>
              Qual(is) estágio(s) de desenvolvimento das startups que a{' '}
              <strong>{user.orgs[orgIdx].name}</strong> trabalha?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione o(s) estágio(s)"
            optionLabelProp="label"
            value={formData.stages}
            onChange={onChangeStages}
            showSearch={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            listHeight={260}
            style={selectStyle}
          >
            {STAGES.map(stage => (
              <Option
                size="large"
                key={stage.value}
                value={stage.label}
                label={stage.label}
              >
                <div name={stage.label} className={styles.OptionItem}>
                  {stage.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== FIRST_PAGE}>
          <QuestionCircleOutlined
            className={styles.Help}
            onClick={() => ModalInfo(EBT_CONNECTION_PREFS[FIRST_PAGE - 1])}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== SECOND_PAGE}
          name={EBT_CONNECTION_PREFS[SECOND_PAGE - 1]}
          initialValue={formData.segments}
          label={
            <span>Tem preferência por segmento(s) de Startups? Qual(is)?</span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione o(s) segmento(s)"
            optionLabelProp="label"
            value={formData.segments}
            onChange={onChangeSegments}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {SEGMENTS.map(segment => (
              <Option
                size="large"
                key={segment.value}
                value={segment.label}
                label={segment.label}
              >
                <div name={segment.value} className={styles.OptionItem}>
                  {segment.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hidden={currentPage !== THIRD_PAGE}
          name={EBT_CONNECTION_PREFS[THIRD_PAGE - 1]}
          initialValue={formData.technologies}
          label={
            <span>Tem preferência por determinadas tecnologias? Qual(is)?</span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione a(s) tecnologia(s)"
            optionLabelProp="label"
            value={formData.technologies}
            onChange={onChangeTechnologies}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {TECHNOLOGIES.map(technology => (
              <Option
                size="large"
                key={technology.value}
                value={technology.label}
                label={technology.label}
              >
                <div name={technology.value} className={styles.OptionItem}>
                  {technology.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FOURTH_PAGE}
          name={EBT_CONNECTION_PREFS[FOURTH_PAGE - 1]}
          initialValue={formData.businessModels}
          label={
            <span>
              Tem preferência por determinado modelo de negócio? Qual(is)?
            </span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione o(s) modelo(s) de negócio"
            optionLabelProp="label"
            value={formData.businessModels}
            onChange={onChangeBusinessModels}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {BUSINESS_MODELS.map(businessModel => (
              <Option
                size="large"
                key={businessModel.value}
                value={businessModel.label}
                label={businessModel.label}
              >
                <div name={businessModel.value} className={styles.OptionItem}>
                  {businessModel.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== FOURTH_PAGE}>
          <QuestionCircleOutlined
            className={styles.Help}
            onClick={() => ModalInfo(EBT_CONNECTION_PREFS[FOURTH_PAGE - 1])}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== FIFTH_PAGE}
          name={EBT_CONNECTION_PREFS[FIFTH_PAGE - 1]}
          initialValue={formData.clientSegmentations}
          label={
            <span>Tem preferência por segmentação de clientes? Qual(is)?</span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione o(s) segmento(s) de clientes"
            optionLabelProp="label"
            value={formData.clientSegmentations}
            onChange={onChangeClientSegmentations}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {SEGMENTATIONS.map(segmentation => (
              <Option
                size="large"
                key={segmentation.value}
                value={segmentation.label}
                label={segmentation.label}
              >
                <div name={segmentation.value} className={styles.OptionItem}>
                  {segmentation.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== FIFTH_PAGE}>
          <QuestionCircleOutlined
            className={styles.Help}
            onClick={() => ModalInfo(EBT_CONNECTION_PREFS[FIFTH_PAGE - 1])}
          />
        </Form.Item>

        <Form.Item
          hidden={currentPage !== SIXTH_PAGE}
          name={EBT_CONNECTION_PREFS[SIXTH_PAGE - 1]}
          initialValue={formData.investmentPhases}
          label={
            <span>Tem preferência por fase de investimento da startup?</span>
          }
          colon={false}
          rules={[required(REQUIRED_MSG)]}
          required
          className={styles.FormItem}
          style={formItemStyle}
        >
          <Select
            size="large"
            mode="multiple"
            placeholder="Selecione a(s) fase(s) de investimento"
            optionLabelProp="label"
            value={formData.investmentPhases}
            onChange={onChangeInvestmentPhases}
            showSearch={false}
            virtual={false}
            menuItemSelectedIcon={
              <CheckOutlined className={styles.OptionItem} />
            }
            style={selectStyle}
          >
            {INVESTMENT_PHASES.map(investmentPhase => (
              <Option
                size="large"
                key={investmentPhase.value}
                value={investmentPhase.label}
                label={investmentPhase.label}
              >
                <div name={investmentPhase.value} className={styles.OptionItem}>
                  {investmentPhase.label}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hidden={currentPage !== SIXTH_PAGE}>
          <QuestionCircleOutlined
            className={styles.Help}
            onClick={() => ModalInfo(EBT_CONNECTION_PREFS[SIXTH_PAGE - 1])}
          />
        </Form.Item>

        <Form.Item hidden={currentPage !== SIXTH_PAGE} style={submitBtnStyle}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={currentPage !== SIXTH_PAGE}
          >
            Concluir
          </Button>
        </Form.Item>
      </Form>
      <div
        className={
          isFirefoxAndMobile() ? styles.PaginationFirefox : styles.Pagination
        }
      >
        <Pagination
          size="default"
          simple
          onChange={page => setCurrentPage(page)}
          current={currentPage}
          defaultPageSize={DATA_ITEMS_PER_PAGE}
          total={REGISTER_ORGANIZATION_TOTAL_PAGES}
        />
      </div>
      {isLoading ? <Spin /> : null}
      {isError ? <p>{error.response.data}</p> : null}
    </div>
  );
}

export default OnboardingOrganization;
