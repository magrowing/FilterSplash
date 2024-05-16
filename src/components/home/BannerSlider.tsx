import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const bannerDate = [
  {
    id: 0,
    image: '/images/banner_image_0.jpg',
    desc: '일러스트를 만나보세요. 고품질 백터로 구성된 새로운 라이브러리를 살펴보세요.',
    author: 'Martin Martz',
  },
  {
    id: 1,
    image: '/images/banner_image_1.jpg',
    desc: '그래픽을 만나보세요. 고품질 백터로 구성된 새로운 라이브러리를 살펴보세요.',
    author: 'Shubham Dhage',
  },
  {
    id: 2,
    image: '/images/banner_image_2.jpg',
    desc: '컬렉션을 만나보세요. 고품질 백터로 구성된 새로운 라이브러리를 살펴보세요.',
    author: 'Oleg Demakov',
  },
];

const Wrapper = styled.div`
  width: 45%;

  .mySwiper {
    padding-top: 3rem;
  }

  .swiper-pagination {
    text-align: right;
  }

  .swiper-pagination-bullets {
    top: 0;
    bottom: unset;
  }

  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.colors.primary};
  }
`;

const SwiperBox = styled.div`
  width: 100%;
  position: relative;
  border-radius: ${(props) => props.theme.shape.medium};
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${(props) => props.theme.shape.medium};
  }
`;

const SwiperDesc = styled.dl`
  position: absolute;
  bottom: 2rem;
  left: 0;
  z-index: 1;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;

  dt {
    color: ${(props) => props.theme.colors.baseWhite};
    font-size: ${(props) => props.theme.fonts.bodyMedium};
    font-weight: ${(props) => props.theme.fonts.weightBold};
    word-break: keep-all;
  }

  dd {
    color: ${(props) => props.theme.colors.third};
    font-size: ${(props) => props.theme.fonts.bodySmall};
    margin-top: ${(props) => props.theme.spacing.spacing0};
  }
`;

export default function BannerSlider() {
  return (
    <Wrapper>
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {bannerDate.map((item) => {
          const key = `banner-image-${item.id}`;
          return (
            <SwiperSlide key={key}>
              <SwiperBox>
                <img src={item.image} alt="banner-image" />
                <SwiperDesc>
                  <dt>{item.desc}</dt>
                  <dd>{`@${item.author}`}</dd>
                </SwiperDesc>
              </SwiperBox>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
}
