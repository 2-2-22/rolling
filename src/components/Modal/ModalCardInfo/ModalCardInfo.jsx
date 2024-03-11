import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './ModalCardInfo.module.scss';
import Modal from '../Modal';
import { Button } from '../../Button';
import { Avatar } from '../../Avatar';
import { BadgeRelation } from '../../Badge';
import { formatDate } from '../../../utils/dateFormatter';
import { FONT_TYPE } from '../../../constants';

const ModalCardInfo = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const setInfo = ({
    profileImageURL,
    sender,
    relationship,
    createdAt,
    content,
    font,
  }) => {
    setModalInfo({
      profileImageURL,
      sender,
      relationship,
      createdAt,
      content,
      font,
    });
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
        close,
        setInfo,
      };
    },
    [],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal close={close}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.info}>
            <div className={styles.profile}>
              <Avatar
                src={modalInfo?.profileImageURL}
                alt={modalInfo?.sender}
              />
            </div>
            <div className={styles.infoText}>
              <div className={styles.sender}>
                From. <span>{modalInfo?.sender}</span>
              </div>
              <div className={styles.relationship}>
                <BadgeRelation relationship={modalInfo?.relationship} />
              </div>
            </div>
          </div>
          <div className={styles.time}>{formatDate(modalInfo?.createdAt)}</div>
        </header>
        <div
          className={`${styles.body} ${styles[FONT_TYPE[modalInfo?.font]]}`}
          dangerouslySetInnerHTML={{ __html: modalInfo?.content }}
        ></div>
        <footer className={styles.footer}>
          <Button styleType="primary40" size="sm" onClick={close}>
            확인
          </Button>
        </footer>
      </div>
    </Modal>
  );
});

ModalCardInfo.displayName = 'ModalCardInfo';

export default ModalCardInfo;
