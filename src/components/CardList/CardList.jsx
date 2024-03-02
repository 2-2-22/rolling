import CardOverview from './CardOverview';
import styles from './CardList.module.scss';
// import arrowLeft from '../../assets/svg/ArrowLeft';
// import arrowRight from '../../assets/svg/ArrowRight';

export default function CardList({ CardListName, recipients }) {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{CardListName}</h1>
      <div className={styles.content}>
        {recipients &&
          recipients.map((recipient) => (
            <CardOverview key={recipient.id} recipient={recipient} />
          ))}
        {/* {offset > 0 && <img className={styles.arrowLeft} src={arrowLeft} />}

        {hasNext && <img className={styles.arrowRight} src={arrowRight} />} */}
      </div>
    </section>
  );
}

CardList;