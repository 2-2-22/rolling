import { useEffect, useRef } from 'react';
import CardOverview from '../CardOverview/CardOverview';
import styles from './TotalCardList.module.scss';

export default function TotalCardList({ CardListName, data, handleScroll }) {
  const recipients = data.results;
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 1.0,
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{CardListName}</h1>
      <div className={styles.content}>
        {recipients.map((recipient) => (
          <CardOverview key={recipient.id} recipient={recipient} />
        ))}
      </div>
      <div className={styles.infinityScrollDiv} ref={observerRef} />
    </section>
  );
}
