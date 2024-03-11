import Add24 from '../../../assets/svg/Add24';
import Button from '../../Button/Button/Button';
import styles from './AddEmojiBtn.module.scss';

export default function AddEmojiBtn({ isOpen, setIsOpen }) {
  const openAddEmojiBtn = () => {
    setIsOpen(true);
  };

  return !isOpen ? (
    <Button
      styleType="outlined36"
      className={`${styles.addEmojiBtn} ${styles.btn}`}
      onClick={openAddEmojiBtn}
    >
      <Add24 />
      <span className={styles.text}>추가</span>
    </Button>
  ) : (
    <Button
      styleType="outlined36"
      className={`${styles.addEmojiBtn} ${styles.btn}`}
    >
      <Add24 />
      <span className={styles.text}>닫기</span>
    </Button>
  );
}
