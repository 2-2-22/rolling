import { Link } from 'react-router-dom';
import point1Img from '../../assets/images/landing1.png';
import point2Img from '../../assets/images/landing2.png';
import { Button } from '../../components/Button';
import styles from './Landing.module.scss';

function LandingPage() {
  return (
    <main>
      {/* 상단 Box */}
      <div className={styles.pointBox}>
        {/* 상단 - Left */}
        <div className={styles.textBox}>
          <div className={styles.pointBtn}>Point. 01</div>
          <p className={styles.boldText}>
            누구나 손쉽게, 온라인 <br />
            롤링 페이퍼를 만들 수 있어요
          </p>
          <p>로그인 없이 자유롭게 만들어요.</p>
        </div>
        {/* 상단 - Right */}
        <div className={styles.imgBox}>
          <img src={point1Img} alt="rolling card" />
        </div>
      </div>
      {/* 하단 Box */}
      <div className={styles.pointBox}>
        {/* 하단 - Left */}
        <div className={styles.imgBox}>
          <img src={point2Img} alt="emozi" />
        </div>
        {/* 하단 - Right */}
        <div className={styles.textBox}>
          <div className={styles.pointBtn}>Point. 02</div>
          <p className={styles.boldText}>
            서로에게 이모지로 감정을 표현해보세요
          </p>
          <p>롤링 페이퍼에 이모지를 추가할 수 있어요.</p>
        </div>
      </div>
      <Link to="/list">
        <Button styleType="primary56" size="md" className={styles.btn}>
          구경해보기
        </Button>
      </Link>
    </main>
  );
}

export default LandingPage;
