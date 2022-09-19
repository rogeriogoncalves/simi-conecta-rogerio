import React, { useState, useEffect } from 'react';
import { Avatar, Card, Divider, Image, List, Skeleton } from 'antd';
import {
  LinkedinFilled,
  MailOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import EmptyInfo from './EmptyInfo';
import ProxyHandler from '../proxy/proxy-handler';
import { useAuth } from '../contexts/auth';
import useAsync from '../hooks/useAsync';
import updateContactedOrgs from '../utils/commonFunctions';
import {
  linkedinIconStyle,
  cardBodyStyle,
  infinityScrollStyle,
} from './CardList.AntdStyle';
import styles from './CardList.module.css';

let loaderRange = 0;
const loaderInc = 20;
let loaderLimit = Infinity;
let firstRun = true;

const resetAuxs = () => {
  loaderRange = 0;
  loaderLimit = Infinity;
  firstRun = true;
};

function CardList({ filter, overrideStyle }) {
  const history = useHistory();
  const { user, update } = useAuth();
  const { run } = useAsync();
  const { Meta } = Card;
  const [loading, setLoading] = useState(false);
  const [fullCardList, setFullCardList] = useState([]);
  const [cards, setCards] = useState([]);

  const descObj = itemDesc => (
    <div className={styles.Description}>{itemDesc}</div>
  );

  const doLoadingProcess = loadSrc => {
    setFullCardList(loadSrc);
    loaderLimit = loadSrc.length;
    const slicedData = loadSrc.slice(loaderRange, loaderRange + loaderInc);
    loaderRange += loaderInc;
    setCards([...cards, ...slicedData]);
    setLoading(false);
  };

  const loadMoreData = () => {
    if (loading) {
      return false;
    }
    setLoading(true);
    if (history.location.pathname === '/contacted-orgs') {
      doLoadingProcess(user.orgs[0].contactedOrgs);
      return true;
    }
    ProxyHandler.get('/database-empresas')
      .then(res => {
        doLoadingProcess(res.data);
        return true;
      })
      .catch(() => {
        setLoading(false);
      });
    return false;
  };

  useEffect(() => {
    resetAuxs();
    loadMoreData();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      loaderRange = loaderInc;
      if (filter === '') {
        setCards(fullCardList.slice(0, loaderInc));
      } else {
        const filteredCards = [];
        const keyword = filter.toLowerCase();
        fullCardList.forEach(card => {
          if (
            card.name.toLowerCase().includes(keyword) ||
            card.startupOuEBT.toLowerCase().includes(keyword) ||
            card.city.toLowerCase().includes(keyword) ||
            card.segment.toLowerCase().includes(keyword) ||
            card.clientType.toLowerCase().includes(keyword) ||
            card.model.toLowerCase().includes(keyword)
          ) {
            filteredCards.push(card);
          }
        });
        setCards(filteredCards.slice(0, loaderInc));
      }
    } else {
      firstRun = false;
    }
  }, [filter]);

  return (
    <div
      id="scrollableDiv"
      className={styles.CardListContainer}
      style={overrideStyle}
    >
      <InfiniteScroll
        dataLength={cards.length}
        next={loadMoreData}
        hasMore={cards.length < loaderLimit}
        loader={
          <div className={styles.Skeleton}>
            <Skeleton
              active
              paragraph={{ rows: 4, width: '100%' }}
              title={false}
            />
          </div>
        }
        endMessage={<Divider plain>Fim da lista</Divider>}
        scrollableTarget="scrollableDiv"
        style={infinityScrollStyle}
      >
        <List
          grid={{
            gutter: 16,
            column: 1,
          }}
          dataSource={cards}
          locale={{
            emptyText: loading ? (
              <span className={styles.LoadingText}>Carregando...</span>
            ) : (
              <EmptyInfo />
            ),
          }}
          renderItem={item => (
            <List.Item>
              <Card className={styles.Card} bodyStyle={cardBodyStyle}>
                <Meta
                  className={styles.Meta}
                  avatar={
                    <Avatar
                      src={<Image src={item.imageSrc} preview={false} />}
                      shape="square"
                      size="large"
                    />
                  }
                  title={item.name}
                  description={descObj(item.description)}
                  onClick={() =>
                    history.push({ pathname: '/org-details', state: item })
                  }
                />
                <div className={styles.IconsContainer}>
                  <a
                    href={`${item.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => updateContactedOrgs(item, user, update, run)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <LinkedinFilled style={linkedinIconStyle} />
                  </a>
                  <a
                    href={`mailto:${item.contact.mail}`}
                    rel="noopener noreferrer"
                    onClick={() => updateContactedOrgs(item, user, update, run)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <MailOutlined className={styles.Icon} />
                  </a>
                  <a
                    href={`${item.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => updateContactedOrgs(item, user, update, run)}
                    onKeyPress={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <GlobalOutlined className={styles.Icon} />
                  </a>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}

export default CardList;
