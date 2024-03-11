import EmojiPicker from 'emoji-picker-react';
import styles from './AddEmojiBtn.module.scss';
import { useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
import useMutate from '../../../hooks/useMutate';
import { TEAM } from '../../../constants';
import { useParams } from 'react-router-dom';

export default function AddEmojiBox({ isOpen, setIsOpen, setIsSelected }) {
  const showAddEmojiRef = useRef();
  const { recipientId } = useParams();
  const URL = `/${TEAM}/recipients/${recipientId}/reactions/`;
  const { mutate } = useMutate(URL);

  const handleEmojiSelect = (emoji) => {
    console.log(emoji.emoji);

    const formData = {
      emoji: emoji.emoji,
      type: 'increase',
    };

    mutate(formData, {
      onSuccess: () => {
        console.log('Success!');
        setIsSelected(true);
        setIsOpen(false);
      },
      onError: () => {
        console.log('Error!');
      },
    });
  };

  const closeEmojiPicker = () => {
    setIsOpen(false);
  };

  useClickOutside(showAddEmojiRef, closeEmojiPicker);

  return (
    isOpen && (
      <div ref={showAddEmojiRef} className={styles.toggleBox}>
        <EmojiPicker onEmojiClick={handleEmojiSelect} />
      </div>
    )
  );
}
