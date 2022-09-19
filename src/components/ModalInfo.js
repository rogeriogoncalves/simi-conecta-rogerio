import React from 'react';
import { Modal } from 'antd';
import {
  DEFAULT_INFO_MODAL_CONFIGS,
  BUSINESS_MODELS,
  INVESTMENT_PHASES,
  SEGMENTATIONS,
  STAGES,
} from '../utils/constants';

import styles from './ModalInfo.module.css';

const stageModalData = title => ({
  title,
  content: STAGES.map(s => ({
    title: s.label,
    info: s.info,
  })),
});

const modalDataFor = subject => {
  switch (subject) {
    case 'stage':
      return stageModalData('Fases de negócios');
    case 'stages':
      return stageModalData('Estágios de desenvolvimento');
    case 'clientSegmentations':
      return {
        title: 'Tipos de segmentações',
        content: SEGMENTATIONS.map(s => ({
          title: s.label,
          info: s.info,
        })).filter(s => s.title !== 'Nenhum/Indiferente'),
      };
    case 'investmentPhases':
      return {
        title: 'Fases de investimento',
        content: INVESTMENT_PHASES.map(s => ({
          title: s.label,
          info: s.info,
        })).filter(
          s =>
            !['Nenhum/Indiferente', 'Acima de 7 milhões de reais'].includes(
              s.title,
            ),
        ),
      };
    case 'businessModels':
      return {
        title: 'Modelos de negócios',
        content: BUSINESS_MODELS.map(s => ({
          title: s.label,
          info: s.info,
        })).filter(s => !['Nenhum/Indiferente'].includes(s.title)),
      };

    default:
      return { title: '', content: '' };
  }
};

function ModalInfo(subject, configs = DEFAULT_INFO_MODAL_CONFIGS) {
  const { title, content } = modalDataFor(subject);

  return Modal.info({
    title,
    content: (
      <div className={styles.HelpPopup}>
        <div className={styles.HelpContainer}>
          {content.map(item => (
            <p key={item.title}>
              <strong>{item.title}: </strong> {item.info}
            </p>
          ))}
        </div>
      </div>
    ),
    ...configs,
  });
}

export default ModalInfo;
