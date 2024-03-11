import useClickOutside from '../../../hooks/useClickOutside';
import useFetch from '../../../hooks/useFetch';
import { LoadingPage } from '../../../pages/LoadingPage';
import styles from './ShowEmojiBox.module.scss';
import { useRef } from 'react';

export default function ShowEmojiBox({ team, recipientId, close, isOpen }) {
  const ShowEmojiBoxRef = useRef();

  useClickOutside(ShowEmojiBoxRef, close);

  // Reactions 데이터
  const { data: reactionData, isLoading } = useFetch(
    `/${team}/recipients/${recipientId}/reactions/?limit=0&offset=0`,
  );

  // 데이터 로드 이후에 렌더링
  if (isLoading || !reactionData) {
    return <LoadingPage />;
  }

  const { results: reactionList } = reactionData;

  return (
    isOpen && (
      <div className={styles.emojiToggleBox} ref={ShowEmojiBoxRef}>
        {reactionList.map((reaction) => (
          <div className={styles.emojiBtn} key={reaction.id}>
            {reaction.emoji} {reaction.count}
          </div>
        ))}
      </div>
    )
  );
}
