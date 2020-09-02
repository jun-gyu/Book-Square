import React from 'react';
import styled from 'styled-components';
import { Carousel } from "antd";
import "antd/dist/antd.css";
import firstCarousel from "../images/firstCarousel.png";
import secondCarousel from "../images/secondCarousel.png";
import thirdCarousel from "../images/thirdCarousel.png";

const MainPageCarouselWrapper = styled.div`
  color: #fff;
  margin: 50px 0;
  .carouselList {
    height: 100%;
    padding: 3% 0;
    box-sizing: border-box;
    & > img {
      display: inline-block;
      width: 300px;
      margin-left: 10%;
    }
    & > section {
      display: inline-block;
      margin-left: 10%;
      width: 500px;
      color: #fff;
      & > strong {
        font-size: 40px;
        display: block;
        letter-spacing: 1px;
      }
      & > span {
        font-size: 20px;
        margin-top: 5%;
        display: block;
      }
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
          <img src={`${firstCarousel}`} alt="소통과 공감" />
          <section>
            <strong>소통과 공감</strong>
            <span>
              나의 생각과 가치를 불특정 다수와 토론을 통해 공유함으로써 <br />
              더풍성한 독서의 유익을 창출 할 수 있습니다.
            </span>
          </section>
        </div>
        <div className="secondCarousel carouselList">
          <section>
            <strong>마음을 비우다</strong>
            <span>
              바쁜 일상 속, 지쳐가는 많은 사람들이
              <br />
              독서를 통해 더 나은 삶을 살아갈 수 있기를 희망합니다.
            </span>
          </section>
          <img src={`${secondCarousel}`} alt="마음을 비우다" />
        </div>
        <div className="thirdCarousel carouselList">
          <img src={`${thirdCarousel}`} alt="지혜와 나눔" />
          <section>
            <strong>지혜와 나눔</strong>
            <span>
              책 속에 있는 지혜의 길 <br />
              함께 인생의 지혜를 나눌 이들이 당신을 기다립니다.
            </span>
          </section>
        </div>
      </Carousel>
    </MainPageCarouselWrapper>
  );
};

export default MainPageCarousel;