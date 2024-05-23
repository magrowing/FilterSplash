import { Link } from 'react-router-dom';

import styled from 'styled-components';
import CommonButton from '../../styles/common/commonButton';
import { ButtonBox, Img, UserInfo } from '../../styles/common/list';
import { CloseButton } from '../../styles/common/CloseButton';

import { useBookmarkStore } from '../../stores/useSettingBookmarkStore';

import { CardDTO } from '../../types/card';

import { numberFormat, splitString } from '../../utils/formatUtils';

const DetailDialogWrapper = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const DetailDimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.dimmedBg};
`;

const Container = styled.div`
  position: relative;
  z-index: 102;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 90rem;
`;

const DialogContent = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 90vh;
  padding: 2rem;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  dl {
    position: relative;
    bottom: unset;
    left: unset;
    opacity: 1;
    dt {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  div {
    position: relative;
    top: unset;
    right: unset;
    opacity: 1;
  }
`;

const DialogScrollBox = styled.div`
  width: 100%;
  max-height: calc(100vh - 2rem);
  margin-right: -2rem;
  padding-right: 2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.8rem;
    height: 5rem;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4rem;
    background-color: ${(props) => props.theme.colors.third};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const DialogImg = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const DialogInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

const DialogInfo = styled.dl`
  dt {
    font-size: ${(props) => props.theme.fonts.bodySmall};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const DialogTagList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const DialogTagItem = styled.li`
  padding: ${(props) => props.theme.shape.small};
  margin-right: ${(props) => props.theme.shape.small};
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.baseGray};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  border-radius: ${(props) => props.theme.shape.small};
`;

type DetailDialogProps = {
  data: CardDTO;
  handleClose: () => void;
  handleAddBookmark: (data: CardDTO) => void;
};

export default function DetailDialog({
  data,
  handleClose,
  handleAddBookmark,
}: DetailDialogProps) {
  const bookmarkData = useBookmarkStore((state) => state.bookmarkData);
  return (
    <DetailDialogWrapper>
      <DetailDimmed onClick={handleClose} />
      <Container>
        <CloseButton type="button" onClick={handleClose}>
          삭제 버튼
        </CloseButton>
        <DialogContent>
          <DialogHeader>
            <UserInfo>
              <dd>
                <Img
                  src={data.user.profile_image.medium}
                  alt={`${data.user.name}-이미지`}
                />
              </dd>
              <dt>{data.user.name}</dt>
            </UserInfo>
            <ButtonBox>
              <CommonButton
                className={
                  bookmarkData.filter((item) => item.id === data.id).length ===
                  1
                    ? `is_active`
                    : ''
                }
                image={
                  bookmarkData.filter((item) => item.id === data.id).length ===
                  1
                    ? '/images/icon_bookmark_active.svg'
                    : '/images/icon_bookmark.svg'
                }
                onClick={() => handleAddBookmark(data)}
              >
                북마크
              </CommonButton>
              <Link to={data.links.download} target="_blank">
                <CommonButton image={'/images/icon_download.svg'}>
                  다운로드
                </CommonButton>
              </Link>
            </ButtonBox>
          </DialogHeader>
          <DialogScrollBox>
            <DialogImg>
              <Img src={data.urls.small} alt={data.alt_description} />
            </DialogImg>
            <DialogInfoWrap>
              <DialogInfo>
                <dt>조회수</dt>
                <dd>{numberFormat(data.likes)}</dd>
              </DialogInfo>
              <DialogInfo>
                <dt>다운로드</dt>
                <dd>{numberFormat(data.user.total_likes)}</dd>
              </DialogInfo>
              <DialogInfo>
                <dt>이미지 크기</dt>
                <dd>
                  {numberFormat(data.width)} X {numberFormat(data.width)}
                </dd>
              </DialogInfo>
              <DialogInfo>
                <dt>업로드</dt>
                <dd>{splitString(data.created_at)}</dd>
              </DialogInfo>
              <DialogInfo>
                <dt>마지막 업데이트</dt>
                <dd>{splitString(data.updated_at)}</dd>
              </DialogInfo>
            </DialogInfoWrap>
            <DialogTagList>
              {data.tags.map((tag) => (
                <DialogTagItem key={`${tag.type}_${tag.title}`}>
                  {tag.title}
                </DialogTagItem>
              ))}
            </DialogTagList>
          </DialogScrollBox>
        </DialogContent>
      </Container>
    </DetailDialogWrapper>
  );
}
