import { useNavigate, useParams } from 'react-router-dom';
import styles from './PostMessagePage.module.scss';
import { EnterNameInput } from '../../components/EnterNameInput';
import { Button } from '../../components/Button';
import { ReactDraft } from '../../components/ReactDraft';
import { Dropdown } from '../../components/Dropdown';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import useMutate from '../../hooks/useMutate';
import { ErrorPage404 } from '../ErrorPage404';
import useManageInput from '../../hooks/useManageInput/useManageInput';

import {
  RELATIONSHIPS,
  FONTS,
  TEAM,
  DEFAULT_PROFILE_URL,
} from '../../constants';

export default function PostMessagePage() {
  const { recipientId } = useParams();
  const navigate = useNavigate();
  const URL = `/${TEAM}/recipients/${recipientId}/messages/`;
  const { mutate: postMessage } = useMutate(URL);
  const {
    handleClick,
    handleChange,
    inputRef,
    inputValue,
    isError,
    isValueExist,
  } = useManageInput();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      sender: e.target.sender.value || null,
      team: TEAM,
      recipientId: recipientId,
      profileImageURL: e.target.profileImageURL.value || DEFAULT_PROFILE_URL,
      relationship: e.target.relationship.value || null,
      content: e.target.content.value || null,
      font: e.target.font.value || null,
    };
    postMessage(formData, {
      onSuccess: () => {
        navigate(`/post/${recipientId}`);
      },
      onError: () => {
        return <ErrorPage404 />;
      },
    });
  };

  return (
    <div className={styles.div}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.box}>
          <div ref={inputRef}>
            <EnterNameInput
              placeholder="이름을 입력해 주세요."
              name="sender"
              onClick={handleClick}
              onChange={handleChange}
              value={inputValue}
              label="From."
              className={
                isError
                  ? styles.error
                  : isValueExist
                    ? styles.active
                    : styles.input
              }
            />
            {isError && <p className={styles.errormessage}>필수 항목입니다.</p>}
          </div>
        </div>
        <div className={styles.box}>
          <label htmlFor="sender" className={styles.label}>
            프로필 이미지
          </label>
          <p className={styles.description}>프로필 이미지를 선택해주세요!</p>
          <ProfileImage />
        </div>
        <div className={styles.box}>
          <Dropdown
            label="상대와의 관계"
            inputName="relationship"
            options={RELATIONSHIPS}
          />
        </div>
        <div className={styles.box}>
          <label htmlFor="sender" className={styles.label}>
            내용을 입력해 주세요
          </label>
          <ReactDraft />
        </div>
        <div className={styles.box}>
          <Dropdown label="폰트 선택" inputName="font" options={FONTS} />
        </div>
        <div className={styles.box}>
          <input type="hidden" name="team" value="4-22" />
          <div className={styles.button}>
            <Button size="full" type="submit">
              생성하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
