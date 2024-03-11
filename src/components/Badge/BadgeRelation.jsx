import styles from './BadgeRelation.module.scss';

const COLORS = {
  지인: 'orange',
  동료: 'purple',
  가족: 'green',
  친구: 'blue',
};

function Relationship({ relationship = '지인', className }) {
  const classNames = `${styles.box} ${styles[COLORS[relationship]]} ${className || ''}`;

  return <div className={classNames}>{relationship}</div>;
}

export default Relationship;
