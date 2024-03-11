import styles from './CardPostList.module.scss';
import Deleted from '../../assets/svg/Deleted';
import { BadgeRelation } from '../Badge';
import { formatDate } from '../../utils/dateFormatter';
import { Button } from '../Button';

function CardPost({ item, onDelete, onClick }) {
  const { id, profileImageURL, sender, relationship, content, createdAt } =
    item;

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  return (
    <article className={styles.cardPost} onClick={() => onClick(item)}>
      {/* 카드프로필 */}
      <div className={styles.cardProfileBox}>
        <div className={styles.cardProfile}>
          <img className={styles.cardImage} src={profileImageURL} />
          <div className={styles.cardInfo}>
            <div className={styles.cardName}>
              <p>
                From.<span className={styles.senderName}>{sender}</span>
              </p>
            </div>
            <div className={styles.box}>
              <BadgeRelation relationship={relationship} />
            </div>
          </div>
        </div>

        {onDelete && (
          // 실제로 삭제 버튼을 누른 CardPost를 알 수 있게 onDelete에 id를 넘겨줌
          <Button
            type="button"
            className={styles.deleteIcon}
            onClick={handleDelete}
            styleType="outlined40"
          >
            <Deleted />
          </Button>
        )}
      </div>

      {/* 카드내용 */}
      <div className={styles.cardContentBox}>
        <div className={styles.cardContent}>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
        <p className={styles.cardDate}>{formatDate(createdAt)}</p>
      </div>
    </article>
  );
}

export default CardPost;
