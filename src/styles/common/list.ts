import { styled } from 'styled-components';

export const CardListWrapper = styled.ul`
  width: 100%;
  columns: 4;
  column-gap: 2rem;
  min-height: 100vh;
  margin-bottom: 2rem;

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
    > div {
      opacity: 1;
    }
    > dl {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1440px) {
    margin-bottom: 2rem;
  }
`;

export const Img = styled.img`
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
`;

export const OverlayBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

export const UserInfo = styled.dl`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  opacity: 0;

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
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: 0;
`;
