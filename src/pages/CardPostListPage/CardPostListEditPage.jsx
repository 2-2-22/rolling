import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './CardPostListPage.module.scss';
import { useEffect, useRef, useState } from 'react';
import CardPostList from '../../components/CardPost/CardPostList';
import { Button } from '../../components/Button';
import { ModalCardInfo, ModalConfirm } from '../../components/Modal';
import useMutate from '../../hooks/useMutate';
import { TEAM } from '../../constants';

function CardPostListEditPage() {
  const { recipientId } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isEdit = pathname.split('/')[3] === 'edit' ? true : false;

  const modalConfirmRef = useRef(null);
  const modalCardInfoRef = useRef(null);

  const LIMIT = 9;
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef(null);

  const { data: recipientInfo, mutate: getRecipientInfo } = useMutate(
    `/${TEAM}/recipients/${recipientId}/`,
    'GET',
  );
  const [messages, setMessages] = useState([]);
  const { mutate: deleteCardOverview } = useMutate(
    `/${TEAM}/recipients/${recipientId}/`,
    'DELETE',
  );

  const handleCardPostDelete = isEdit
    ? (id) => {
        modalConfirmRef.current?.setInfo({
          message: '정말 삭제하시겠습니까?',
          onClick: async () => {
            try {
              const response = await fetch(
                `https://rolling-api.vercel.app/4-22/messages/${id}/`,
                { method: 'DELETE' },
              );

              if (!response.ok) {
                throw new Error('삭제에 실패하였습니다.');
              }

              setMessages((preMessages) =>
                preMessages.filter((message) => message.id !== id),
              );
            } catch (error) {
              console.error(error);
            }
          },
        });
        modalConfirmRef.current?.open();
      }
    : null;

  const handleNavigateEditPage = () => {
    navigate(`${pathname}/edit`);
  };

  const handleCardOverviewDelete = () => {
    modalConfirmRef.current?.setInfo({
      message: '정말 삭제하시겠습니다?',
      onClick: () => {
        deleteCardOverview(null, {
          // onSuccess가 동작했을 때 navigate('/list')가 동작해야한다.
          onError: () => {
            navigate('/list');
          },
        });
      },
    });
    modalConfirmRef.current?.open();
  };

  const handleNavigatePostMessagePage = !isEdit
    ? () => {
        navigate(`/post/${recipientId}/messages`);
      }
    : null;

  const handleInfoOpen = (item) => {
    modalCardInfoRef.current?.setInfo(item);
    modalCardInfoRef.current?.open();
  };

  // mutate에서 setData를 내려줘야 추가적인 리팩토링 가능한 상태입니다.
  const handleMessagesLoad = async () => {
    if (!hasNext) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://rolling-api.vercel.app/4-22/recipients/${recipientId}/messages/?limit=${LIMIT}&offset=${offset}`,
      );
      if (!response.ok) {
        throw new Error('메세지 리스트를 받아오지 못했습니다.');
      }
      const { results = [], next = null } = await response.json();

      if (offset === 0) {
        setMessages(results);
      } else {
        setMessages((preMessages) => [...preMessages, ...results]);
      }

      setHasNext(next ? true : false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useIntersectionObserver를 만들어서 작업했으면 더 좋았을 거 같습니다.
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setOffset((preOffset) => preOffset + LIMIT);
    }
  };

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1.0,
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef]);

  useEffect(() => {
    getRecipientInfo(null, {
      onError: () => {
        navigate('/list');
      },
    });
  }, [recipientId]);

  useEffect(() => {
    handleMessagesLoad();
  }, [recipientId, offset]);

  return (
    <>
      <div
        className={`${styles.background} ${styles[recipientInfo?.backgroundColor]}`}
        style={{ backgroundImage: `url(${recipientInfo?.backgroundImageURL})` }}
      />
      <div className={styles.container}>
        {isEdit ? (
          <Button type="button" onClick={handleCardOverviewDelete} size="sm">
            삭제하기
          </Button>
        ) : (
          <Button type="button" onClick={handleNavigateEditPage} size="sm">
            편집하기
          </Button>
        )}
        <CardPostList
          items={messages}
          onDelete={handleCardPostDelete}
          onAdd={handleNavigatePostMessagePage}
          onClick={handleInfoOpen}
        />
      </div>
      <div ref={observerRef} style={{ height: '10px;' }} />
      <ModalCardInfo ref={modalCardInfoRef} />
      <ModalConfirm ref={modalConfirmRef} />
    </>
  );
}

export default CardPostListEditPage;
