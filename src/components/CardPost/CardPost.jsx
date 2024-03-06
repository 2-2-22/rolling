import style from './CardPostList.module.scss';
import Deleted from '../../assets/svg/Deleted';
import { formatDate } from '../../utils/dateFormatter';

function CardPost({ item, onDelete }) {
  const { id, profileImageURL, sender, relationship, content, createdAt } =
    item;

  return (
    <article className={style.cardPost}>
      {/* 카드프로필 */}
      <div className={style.cardProfileBox}>
        <div className={style.cardProfile}>
          <img className={style.cardImage} src={profileImageURL} />
          <div className={style.cardInfo}>
            <div className={style.cardName}>
              <p>
                From.<span>{sender}</span>
              </p>
            </div>
            <div className={style.cardBadge}>
              <p>{relationship}</p>
            </div>
          </div>
        </div>

        {typeof onDelete === 'function' && (
          // 실제로 삭제 버튼을 누른 CardPost를 알 수 있게 onDelete에 id를 넘겨줌
          <button className={style.deleteIcon} onClick={() => onDelete(id)}>
            <Deleted />
          </button>
        )}
      </div>

      {/* 카드내용 */}
      <div className={style.cardContentBox}>
        <div className={style.cardContent}>
          <p>{content}</p>
        </div>
        <p className={style.cardDate}>{formatDate(createdAt)}</p>
      </div>
    </article>
  );
}

export default CardPost;
