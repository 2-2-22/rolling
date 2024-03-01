import logo from '../../assets/images/logo.svg';
import arrowDown from '../../assets/images/arrow_down.svg';
import add24 from '../../assets/images/add-24.svg';
import share24 from '../../assets/images/share-24.svg';
import styles from './Header.module.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// 카카오톡 공유 핸들러 함수
const handleShareKakao = () => {
  window.Kakao.Share.sendCustom({
    templateId: 104815,
    templateArgs: {
      title: 'Rolling Paper로 마음을 전해봐요',
      description: '평상시 고마웠던 지인에게 마음을 표현해봐요',
    },
  });
};

// URL 공유 핸들러 함수
const handleShareURL = () => {
  navigator.clipboard.writeText(window.location.href);
};

function Header() {
  // 토글 박스 DOM 참조용 Ref
  const showEmoziRef = useRef();
  const showShareRef = useRef();

  // Emozi 토글 핸들러 함수
  const handleToggleEmozi = (e) => {
    e.target.classList.toggle('isOpen');

    const isOpen = e.target.classList.contains('isOpen');

    if (isOpen) {
      showEmoziRef.current.style.display = 'block';
    } else {
      showEmoziRef.current.style.display = 'none';
    }
  };

  // 공유 버튼 토글 핸들러 함수
  const handleToggleShare = (e) => {
    e.target.classList.toggle('isOpen');

    const isOpen = e.target.classList.contains('isOpen');

    if (isOpen) {
      showShareRef.current.style.display = 'block';
    } else {
      showShareRef.current.style.display = 'none';
    }
  };

  return (
    <header className={styles.header}>
      {/* 상단 Nav바 */}
      <nav className={styles.topNav}>
        <div>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
        </div>
        <Link to="/post">
          <div className={styles.btn}>롤링 페이퍼 만들기</div>
        </Link>
      </nav>
      <hr className={styles.line} />
      {/* 하단 Nav바 */}
      <nav className={styles.bottomNav}>
        {/* To. 000 */}
        <section className={styles.section}>
          <div className={styles.toName}>To. Ashley Kim</div>
        </section>
        <section className={styles.section}>
          {/* 00명이 작성했어요 */}
          <div className={styles.postNumbers}>23명이 작성했어요!</div>
          <div className={styles.line}></div>
          {/* 이모지 상위 3개 보여주기 */}
          <div className={styles.emoziBtns}>
            <div className={styles.emoziBtn}>👍24</div>
            <div className={styles.emoziBtn}>😍16</div>
            <div className={styles.emoziBtn}>🎉10</div>
          </div>
          {/* 이모지 더 보기 버튼 */}
          <div className={styles.toggleBtn}>
            <img onClick={handleToggleEmozi} src={arrowDown} alt="arrow-down" />
          </div>
          {/* 이모지 토글 박스 */}
          <div
            className={`${styles.showEmozi} ${styles.toggleBox}`}
            ref={showEmoziRef}
          >
            <div className={styles.row}>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
            </div>
            <div className={styles.row}>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
              <div className={styles.emoziBtn}>👍24</div>
            </div>
          </div>
          {/* 이모지 추가 버튼 */}
          <div className={`${styles.addEmoziBtn} ${styles.btn}`}>
            <img src={add24} alt="add-24" />
            추가
          </div>
          <div className={styles.line}></div>
          {/* 공유 토글 버튼 */}
          <div className={`${styles.shareBtn} ${styles.btn}`}>
            <img onClick={handleToggleShare} src={share24} alt="share btn" />
          </div>
          {/* 공유 토글 박스 */}
          <div
            className={`${styles.showShare} ${styles.toggleBox}`}
            ref={showShareRef}
          >
            <div className={styles.shareBox} onClick={handleShareKakao}>
              카카오톡 공유
            </div>
            <div className={styles.shareBox} onClick={handleShareURL}>
              URL 공유
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
}

export default Header;
