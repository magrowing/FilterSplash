import { styled } from 'styled-components';

export const CardListWrapper = styled.ul`
  width: 100%;
  columns: 4;
  column-gap: 2rem;

  @media screen and (max-width: 1440px) {
    columns: 3;
  }
`;

export const CardItem = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  break-inside: avoid;
  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
  }
`;

export const Img = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
`;

export const OverlayBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

export const UserInfo = styled.dl`
  width: 100%;
  display: flex;
  align-items: center;

  dt {
    color: ${(props) => props.theme.colors.baseWhite};
    margin-left: 1rem;
  }

  dd {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    overflow: hidden;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;
