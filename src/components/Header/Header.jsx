import Logo from '../../assets/svg/Logo.jsx';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../Button';
import SubHeader from './SubHeader/SubHeader';

export default function Header() {
  const { pathname } = useLocation();

  const showSubHeader = !(
    pathname === '/' ||
    pathname === '/list' ||
    pathname === '/post' ||
    pathname.match('/messages')
  );

  return (
    <header className={styles.header}>
      {/* 상단 Nav바 */}
      <nav className={styles.topNav}>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Link to="/post">
          <Button styleType="outlined40" className={styles.btn}>
            롤링 페이퍼 만들기
          </Button>
        </Link>
      </nav>
      <hr className={styles.line} />
      {/* 하단 Nav바 */}
      {showSubHeader && <SubHeader />}
    </header>
  );
}
