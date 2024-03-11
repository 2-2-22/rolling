import { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './ModalConfirm.module.scss';
import Modal from '../Modal';
import { Button } from '../../Button';
import isFunction from '../../../utils/isFunction';

const ModalConfirm = forwardRef((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const setInfo = ({ message, onClick }) => {
    setModalInfo({ message, onClick });
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

  const handleClick = async () => {
    if (isFunction(modalInfo?.onClick)) {
      await modalInfo?.onClick();
    }
    close();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal close={close}>
      <div className={styles.container}>
        <div className={styles.body}>{modalInfo?.message}</div>
        <div className={styles.footer}>
          <Button size="sm" onClick={handleClick}>
            확인
          </Button>
          <Button size="sm" styleType="outlined56" onClick={close}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
});

ModalConfirm.displayName = 'ModalConfirm';

export default ModalConfirm;
