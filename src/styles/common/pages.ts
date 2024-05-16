import styled from 'styled-components';

export const PageWrapper = styled.article`
  width: 100%;
`

export const PageContainer = styled.section`
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;

  @media screen and (max-width: 1440px) {
    max-width: 90%;
  }
`