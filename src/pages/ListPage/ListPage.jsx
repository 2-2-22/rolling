import styles from './ListPage.module.scss';
import useFetch from '../../hooks/useFetch';
import { Button } from '../../components/Button';
import { LoadingPage } from '../LoadingPage/';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmblaCarousel, TotalCardList } from '../../components/CardList';
import { TEAM } from '../../constants';

// 안된것들
// overview pattern rect 설정
// background 3D
// 반응형
// 파비콘 메타데이터
// wiki, readme 작성
// 과제

export default function ListPage() {
  const LIMIT = 8;
  const query = `?limit=${LIMIT}&offset=0`;
  const [offset, setOffset] = useState(8);
  const navigatePostPage = useNavigate();
  const { data: dataSortedCreateAt, isLoading } = useFetch(
    `/${TEAM}/recipients/${query}`,
  );
  const { data: dataSortedLike, isSortedLikeLoading } = useFetch(
    `/${TEAM}/recipients/${query}&sort=like`,
  );
  const { data: totalData, isTotalDataLoading } = useFetch(
    `/${TEAM}/recipients/?limit=${offset}&offset=0`,
  );

  const handleBottomBtnClick = () => {
    navigatePostPage(`/post`);
  };

  const handleScroll = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isTotalDataLoading) {
      setOffset((prevOffset) => prevOffset + LIMIT);
    }
  };

  if (
    isLoading ||
    isSortedLikeLoading ||
    isTotalDataLoading ||
    !dataSortedCreateAt ||
    !dataSortedLike ||
    !totalData
  ) {
    return <LoadingPage />;
  }

  const hotItems = dataSortedLike ? dataSortedLike.results : null;
  const newItems = dataSortedCreateAt ? dataSortedCreateAt.results : null;
  const EmblaCarouselOptions = {
    align: 'start',
    dragFree: true,
    loop: true,
  };

  return (
    <main className={styles.container}>
      <EmblaCarousel
        slides={hotItems}
        options={EmblaCarouselOptions}
        CarouselName={'인기 롤링 페이퍼 🔥'}
      />
      <EmblaCarousel
        slides={newItems}
        options={EmblaCarouselOptions}
        CarouselName={'최근에 만든 롤링 페이퍼 ⭐️'}
      />

      <TotalCardList
        data={totalData}
        CardListName={'전체 롤링 페이퍼 💜'}
        handleScroll={handleScroll}
      />
      <div className={styles.buttonBg}>
        <Button
          className={styles.myButton}
          size={'md'}
          type={'button'}
          onClick={() => handleBottomBtnClick()}
        >
          나도 만들어보기
        </Button>
      </div>
    </main>
  );
}
