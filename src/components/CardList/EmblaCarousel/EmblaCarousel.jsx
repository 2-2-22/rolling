import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { usePrevNextButtons } from './EmblaCarouselArrowButtons';
import CardOverview from '../CardOverview/CardOverview';
import styles from './EmblaCarousel.module.scss';
import { ButtonArrow } from '../../Button';

export default function EmblaCarousel(props) {
  const { slides, options, CarouselName } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className={styles.embla}>
      <h1 className={styles.CarouselName}>{CarouselName}</h1>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {Object.keys(slides).map((recipientId) => (
            <div className={styles.embla__slide} key={recipientId}>
              <CardOverview
                recipient={slides[recipientId]}
                className={styles.embla__slide}
              />
            </div>
          ))}
        </div>
        <ButtonArrow
          className={styles.ArrowLeftBtn}
          direction={'left'}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <ButtonArrow
          className={styles.ArrowRightBtn}
          direction={'right'}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
        {/* <Button
          className={styles.embla__play}
          onClick={toggleAutoplay}
          type="button"
        >
          {isPlaying ? 'Stop' : 'Start'}
        </Button> */}
      </div>
    </section>
  );
}
