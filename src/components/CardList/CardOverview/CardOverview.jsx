import styles from './CardOverview.module.scss';
import { Link } from 'react-router-dom';
import { Reactions } from '../../Reactions';

export default function CardOverview({ recipient }) {
  const {
    id,
    backgroundColor,
    backgroundImageURL,
    messageCount,
    name,
    topReactions,
    recentMessages: visitors,
  } = recipient;
  const bgStyle = {
    background:
      backgroundImageURL &&
      `linear-gradient(180deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%), url(${backgroundImageURL})`,
    color: backgroundImageURL && '#FFF',
  };

  const visitorCount = messageCount - 3 > 0 ? messageCount - 3 : null;

  return (
    <Link
      to={`/post/${id}`}
      className={`${styles.content} ${styles[backgroundColor || 'null']}`}
      style={bgStyle}
    >
      <div className={styles.profileBox}>
        <h1 className={styles.name}>To. {name}</h1>
        <div className={styles.profileImageContainer}>
          {visitors.length > 0 ? (
            visitors.map((visitor, i) => (
              <img
                className={`${styles[`visitorImage-${i + 1}`]}`}
                key={visitor.id}
                src={visitor.profileImageURL}
              />
            ))
          ) : (
            <div className={styles.visitorEmptyCase}>
              첫 메세지의 주인공이 되어보세요!
            </div>
          )}
          {visitorCount && (
            <p className={styles.visitorCount}>+{visitorCount}</p>
          )}
        </div>
        <p className={styles.text}>
          <span className={styles.count}>{messageCount}명</span>이 작성했어요!
        </p>
      </div>
      <div className={styles.reactionsBox}>
        <hr className={styles.classifyLine} />
        {topReactions && <Reactions reactions={topReactions} />}
      </div>
    </Link>
  );
}
