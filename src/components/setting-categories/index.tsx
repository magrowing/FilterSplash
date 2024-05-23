import styled from 'styled-components';

import Form from './Form';
import Keywords from './Keywords';
import Buttons from './Buttons';

import { CloseButton } from '../../styles/common/CloseButton';

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.dimmedBg};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 60rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fonts.bodyLarge};
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  svg {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.6rem;
  }
`;

const HelpText = styled.p`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.bodySmall};
`;

const PopupCloseButton = styled(CloseButton)`
  position: absolute;
  top: -2rem;
  right: 0;
  transform: translateY(-50%);
  z-index: 1001;
  padding: 0;
`;

type SettingCategoriesProps = {
  popup?: boolean;
  onClosePopup?: () => void;
};

export default function SettingCategories({
  popup,
  onClosePopup,
}: SettingCategoriesProps) {
  return (
    <Wrapper>
      <Container>
        {popup && (
          <PopupCloseButton type="button" onClick={onClosePopup}>
            팝업 닫기 버튼
          </PopupCloseButton>
        )}
        <TitleWrapper>
          <Title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clipRule="evenodd"
              />
            </svg>
            카테고리 설정
          </Title>
          <HelpText>카테고리는 최대 20개까지만 추가됩니다.</HelpText>
        </TitleWrapper>
        <Form />
        <Keywords />
        <Buttons popup={popup} onClosePopup={onClosePopup} />
      </Container>
    </Wrapper>
  );
}
