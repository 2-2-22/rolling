import { Toast } from '../../Toast/index.js';
import handleShareKakao from '../../../utils/handleShareKakao.js';
import Button from '../../Button/Button/Button.jsx';
import Share24 from '../../../assets/svg/Share24.jsx';
import { useRef, useState } from 'react';
import styles from './SubHeader.module.scss';
import useClickOutside from '../../../hooks/useClickOutside.js';

export default function ShareBtn() {
  // Toast, 토글 Box 상태 관리
  const [toast, setToast] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // 토글 박스 DOM 참조용 Ref
  const showShareRef = useRef();

  // URL 공유 핸들러 함수
  const handleShareURL = () => {
    // 클립보드에 URL 복사
    navigator.clipboard.writeText(window.location.href);
    // Toast 상태 변경
    setToast(true);
  };

  // 공유 버튼 토글 핸들러 함수
  const handleToggleShare = () => {
    if (!showShare) {
      showShareRef.current.style.display = 'block';
      setShowShare(true);
    } else {
      showShareRef.current.style.display = 'none';
      setShowShare(false);
    }
  };

  const closeShareBox = () => {
    showShareRef.current.style.display = 'none';
    setShowShare(false);
  };

  useClickOutside(showShareRef, closeShareBox);

  return (
    <>
      {/* 공유 토글 버튼 */}
      <div onClick={handleToggleShare}>
        <Button type="button" styleType="outlined36">
          <Share24 />
        </Button>
      </div>
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
      {toast && <Toast setToast={setToast} />}
    </>
  );
}
