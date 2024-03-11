import ArrowDown from '../../../assets/svg/ArrowDown.jsx';
import ArrowUp from '../../../assets/svg/ArrowUp.jsx';
import styles from './SubHeader.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { Reactions } from '../../Reactions';
import { LoadingPage } from '../../../pages/LoadingPage';
import ShowEmojiBox from './ShowEmojiBox.jsx';
import AddEmojiBtn from './AddEmojiBtn.jsx';
import { TEAM } from '../../../constants';
import ShareBtn from './ShareBtn.jsx';
import AddEmojiBox from './AddEmojiBox.jsx';

export default function SubHeader() {
  // 이모지 상태 관리
  const [emojiIsSelected, setEmojiIsSelected] = useState(false);

  console.log(emojiIsSelected);

  // 토글 박스 상태 관리
  const [emojiBoxIsOpen, setEmojiBoxIsOpen] = useState(false);
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);

  // const [recipient, setRecipient] = useState(null);

  // Recipient 데이터
  const { recipientId } = useParams();
  const { data: recipientData, isLoading } = useFetch(
    `/${TEAM}/recipients/${recipientId}/`,
  );

  // useEffect(() => {
  //   const getRecipient = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://rolling-api.vercel.app/${TEAM}/recipients/${recipientId}/`,
  //       );
  //       if (!response.ok) {
  //         throw new Error('Recipient Data를 받아오는데 실패했습니다.');
  //       }
  //       const json = await response.json();
  //       setRecipient(json);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getRecipient();
  // }, [emojiIsSelected]);

  // 데이터 로드 이후에 렌더링
  if (isLoading || !recipientData) {
    // setRecipient(recipientData);
    return <LoadingPage />;
  }

  const { name, messageCount, topReactions, recentMessages } = recipientData;
  // const { name, messageCount, topReactions, recentMessages } = recipient;

  // Emoji 토글 핸들러 함수
  const openEmojiToggle = () => {
    setEmojiBoxIsOpen(true);
  };

  const closeEmojiToggle = () => {
    setEmojiBoxIsOpen(false);
  };

  return (
    <header>
      <nav className={styles.bottomNav}>
        {/* To. 000 */}
        <section className={styles.section}>
          <div className={styles.toName}>To. {name}</div>
        </section>
        <section className={styles.section}>
          {/* 작성자 프로필 사진 */}
          <div
            className={`${styles.profileImageContainer} ${styles[`imageCount${recentMessages.length}`]}`}
          >
            {recentMessages.map((sender, i) => (
              <img
                className={`${styles[`visitorImage-${i + 1}`]}`}
                key={sender.id}
                src={sender.profileImageURL}
              />
            ))}
            {messageCount - 3 > 0 ? (
              <div className={styles.visitorCount}>+{messageCount - 3}</div>
            ) : (
              <div></div>
            )}
          </div>
          {/* 00명이 작성했어요 */}
          <div className={styles.postNumbers}>
            <span className={styles.countBold}>{messageCount}</span>
            명이 작성했어요!
          </div>
          <div className={styles.line}></div>
          {/* 이모지 상위 3개 보여주기 */}
          <Reactions reactions={topReactions} />
          {/* 이모지 더 보기 버튼 */}
          {topReactions.length ? (
            emojiBoxIsOpen ? (
              <div>
                <ArrowUp />
              </div>
            ) : (
              <div className={styles.toggleBtn} onClick={openEmojiToggle}>
                <ArrowDown />
              </div>
            )
          ) : (
            <div></div>
          )}
          {/* 이모지 토글 박스 */}
          <ShowEmojiBox
            team={TEAM}
            recipientId={recipientId}
            close={closeEmojiToggle}
            isOpen={emojiBoxIsOpen}
          />
          {/* 이모지 추가 버튼 */}
          <AddEmojiBtn
            isOpen={emojiPickerIsOpen}
            setIsOpen={setEmojiPickerIsOpen}
          />
          {/* 이모지 추가 토글 박스 */}
          <AddEmojiBox
            isOpen={emojiPickerIsOpen}
            setIsOpen={setEmojiPickerIsOpen}
            setIsSelected={setEmojiIsSelected}
          />
          <div className={styles.line}></div>
          {/* 공유 토글 박스 */}
          <ShareBtn />
        </section>
      </nav>
    </header>
  );
}
