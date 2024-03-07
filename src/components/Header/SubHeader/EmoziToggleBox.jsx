import useFetch from '../../../hooks/useFetch';
import { LoadingPage } from '../../../pages/LoadingPage';
import styles from './EmoziToggleBox.module.scss';

export default function EmoziToggleBox({ recipientId }) {
  // Reactions 데이터
  const { data: reactionData, isLoading } = useFetch(
    `/2-7/recipients/${recipientId}/reactions/?limit=0&offset=0`,
  );

  // 데이터 로드 이후에 렌더링
  if (isLoading || !reactionData) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  const { results: reactionList } = reactionData;

  return (
    <div className={`${styles.showEmozi} ${styles.toggleBox}`}>
      {reactionList.map((reaction) => (
        <div className={styles.emoziBtn} key={reaction.id}>
          {reaction.emoji} {reaction.count}
        </div>
      ))}
    </div>
  );
}
