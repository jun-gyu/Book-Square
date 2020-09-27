import React from 'react';
import styled from 'styled-components';
import { Carousel } from "antd";
import "antd/dist/antd.css";

const MainPageCarouselWrapper = styled.div`
  color: #fff;
  .carouselList {
    height: 300px;
    padding: 3%;
    box-sizing: border-box;
    & > * {
      display: inline-block;
      color: #fff;
    }
    & > strong {
      font-size: 40px;
      letter-spacing: 1px;
      margin-right: 30px;
      width: 30%;
    }
    & > span {
      max-width: 600px;
      font-size: 20px;
      margin-top: 30px;
    }
  }
  .firstCarousel {
    background: linear-gradient(90deg, #a8edea 0%, rgb(233, 213, 228) 100%);
  }
  .secondCarousel {
    background: linear-gradient(
      90deg,
      rgb(233, 213, 228) 0%,
      rgb(237, 233, 194) 100%
    );
    & > img {
      margin-left: 20%;
    }
  }
  .thirdCarousel {
    background: linear-gradient(
      90deg,
      rgb(237, 233, 194) 0%,
      rgb(208, 221, 212) 100%
    );
  }
`;

const MainPageCarousel = () => {
  return (
    <MainPageCarouselWrapper>
      <Carousel autoplay>
        <div className="firstCarousel carouselList">
          <strong>소통과 공감</strong>
          <span>
            나의 생각과 가치를 불특정 다수와 토론을 통해 공유함으로써 <br />
            더풍성한 독서의 유익을 창출 할 수 있습니다.
          </span>
        </div>
        <div className="secondCarousel carouselList">
          <strong>마음을 비우다</strong>
          <span>
            바쁜 일상 속, 지쳐가는 많은 사람들이
            <br />
            독서를 통해 더 나은 삶을 살아갈 수 있기를 희망합니다.
          </span>
        </div>
        <div className="thirdCarousel carouselList">
          <strong>지혜와 나눔</strong>
          <span>
            책 속에 있는 지혜의 길 <br />
            함께 인생의 지혜를 나눌 이들이 당신을 기다립니다.
          </span>
        </div>
      </Carousel>
    </MainPageCarouselWrapper>
  );
};

export default MainPageCarousel;