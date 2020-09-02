import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import contentMainIMG from '../images/searchPageIcon1.png';
import searchIcon from '../images/searchIMG.png';
import searchContainerTopBar from "../images/searchContainerTopBar.png";
import searchPageNodeBG from "../images/searchPageNodeBG.png";
import searchPageGoalIMG from '../images/searchPageGoalIMG.png';
import searchPageReading from "../images/searchPageReading.png";
import searchPageDiscussion from "../images/searchPageDiscussion.png";

const SearchPageAniWrapper = styled.div`
  .container {
    width: 580px;
    height: 420px;
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    top: 60%;
    left: 50%;
  }
  .container .control {
    width: 20px;
    height: 20px;
    background: #258bf8;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    left: 10px;
    cursor: pointer;
    &.activeControl {
      display: none;
    }
    &:before,
    &:after {
      content: "";
      background: rgba(37, 139, 248, 0.4);
      width: 100%;
      height: 100%;
      transform: translate3d(-50%, -50%, 0);
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      animation: pulse 3s infinite ease;
    }
    &:after {
      animation-delay: 1.5s;
    }
  }

  .innerContainer {
    background: url(${searchContainerTopBar}) no-repeat 0 5px / 100%;
    height: 420px;
    box-shadow: 0 0 0 1px #ddd, 0 14px 28px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotateX(50deg) rotateY(0deg) rotateZ(30deg);
    position: relative;
    transition: all 0.4s ease;
    & > .searchBox {
      position: absolute;
      top: 40px;
      left: -80px;
      width: 90%;
      background-color: white;
      background-image: url(${searchIcon});
      background-repeat: no-repeat;
      background-position: 20px 26px;
      background-size: 20px 20px;
      box-shadow: 0 0 0 2px #258bf8, 15px 30px 15px rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      line-height: 68px;
      padding: 0 20px 0 50px;
      font-size: 19px;
      transition: all 0.4s 0.3s ease;
      z-index: 3;
    }
    & > .content {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 10px;
      opacity: 0.5;
      transition: all 0.4s 0.2s ease;
      transform: translate3d(0, 0, 0);
      & > .sources {
        width: 120px;
        position: absolute;
        left: 5%;
        top: 40%;
        transition: all 0.3s ease;
      }
      & .results {
        width: 60%;
        position: absolute;
        left: 35%;
        bottom: 7%;
        & > .result {
          padding: 15px 0px 15px 55px;
          position: relative;
          box-shadow: 0 1px 0 #ddd;
          &:last-child {
            box-shadow: 0 0 0;
          }
          & > .resultImageBox {
            width: 40px;
            height: 40px;
            position: absolute;
            top: 15px;
            left: 0;
            & > img {
              width: 100%;
            }
          }
          & > .mainTitle {
            color: #258bf8;
            margin: 0 0 4px;
          }
          & > .discription {
            color: #aaa;
            font-size: 14px;
          }
        }
      }
    }
    & > .nodes {
      width: 100%;
      height: 100%;
      background: url(${searchPageNodeBG});
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      background-size: cover;
      opacity: 0;
      transition: opacity 0.3s 0.3s ease;
      & > .node {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 0 1px #ccc, 0 4px 6px rgba(0, 0, 0, 0.09);
        border-radius: 50%;
        transition: all 0.3s ease;
        opacity: 0;
        & > img {
          width: 60%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .innerContainer[data-animated="true"] {
    transform: translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transition: all 0.4s ease;
  }
  .innerContainer[data-animated="true"] .content {
    opacity: 1;
  }
  .innerContainer[data-animated="true"][data-stage="one"] .searchBox {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    box-shadow: 0 0 0 2px #258bf8, 0px 15px 30px rgba(0, 0, 0, 0.05);
    width: 55%;
  }
  .innerContainer[data-animated="true"][data-stage="one"] .content .sources {
    opacity: 0;
    transform: translateY(20%);
    transition: all 0.3s 0.3s ease;
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .content
    .results
    .result {
    transition: all 0.3s 0.3s ease;
    transform: translateY(100%);
    opacity: 0;
  }
  .innerContainer[data-animated="true"][data-stage="one"] .nodes {
    opacity: 1;
  }
  .innerContainer[data-animated="true"][data-stage="one"] .nodes .node.active {
    transition: all 0.3s 0.4s ease;
    opacity: 1;
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(1) {
    transform: translate3d(-370%, -150%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(2) {
    transform: translate3d(-370%, 10%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(3) {
    transform: translate3d(110%, 100%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(4) {
    transform: translate3d(-50%, -310%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(5) {
    transform: translate3d(110%, -230%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(6) {
    transform: translate3d(-210%, 100%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="one"]
    .nodes
    .node.active:nth-child(7) {
    transform: translate3d(270%, 170%, 0);
  }
  .innerContainer[data-animated="true"][data-stage="two"] .searchBox {
    top: 40px;
    left: 20px;
    transform: translate3d(0%, 0%, 0);
    width: calc(100% - 40px);
    box-shadow: 0 0 0 2px #ccc;
  }
  .innerContainer[data-animated="true"][data-stage="two"] .content .sources {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s 0.6s ease;
  }
  .innerContainer[data-animated="true"][data-stage="two"]
    .content
    .results
    .result {
    transform: translateY(100%);
    opacity: 0;
  }
  .innerContainer[data-animated="true"][data-stage="two"]
    .content
    .results
    .result:nth-child(1) {
    animation: loadResult 0.8s 0.4s 1 ease forwards;
  }
  .innerContainer[data-animated="true"][data-stage="two"]
    .content
    .results
    .result:nth-child(2) {
    animation: loadResult 0.8s 0.8s 1 ease forwards;
  }
  .innerContainer[data-animated="true"][data-stage="two"]
    .content
    .results
    .result:nth-child(3) {
    animation: loadResult 0.8s 1.2s 1 ease forwards;
  }
  .innerContainer[data-animated="true"][data-stage="two"]
    .content
    .results
    .result:nth-child(4) {
    animation: loadResult 0.8s 1.6s 1 ease forwards;
  }

  @keyframes pulse {
    0% {
      transform: translate3d(-50%, -50%, 0) scale(1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate3d(-50%, -50%, 0) scale(2);
      opacity: 0;
    }
  }
  @keyframes loadResult {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SearchPageAni = () => {

  const [controler, setControler] = useState(false);
  const [dataAnimated, setDataAnimated] = useState(false);
  const [dataStage, setDataStage] = useState(null);
  

  let searchTerm = null;
  useEffect(() => {
    searchTerm = document.querySelector(".searchBox").textContent;
  }, [controler]);

  const stageSetting = (stage) => {
    setDataAnimated(true);
    setDataStage(stage);
  }

  const finishAnimation = () => {
    setDataAnimated(false);
    setDataStage(null);
  }

  const typed = () => {
    let searchbar = document.querySelector(".searchBox");
    let typeSpeed = 80;
    let count = 0;

    function typeLoop() {
      setTimeout(() => {
        let letters = searchTerm.substring(0, count++);
        searchbar.textContent = letters;
        if (count <= searchTerm.length) {
          typeLoop();
        } else {
          setTimeout(() => {
            stageSetting("two");
          }, 600);
        }
      }, typeSpeed);
    }
    typeLoop();
  }

  const activeNodes = () => {
    let count = 1;
    document.querySelectorAll(".node").forEach((item) => {
      count++;
      let delay = 400 + 100 * count;
      setTimeout(() => {
        item.classList.add("active");
      }, delay);
    });
  }

  const resetNodes = () => {
    document.querySelectorAll(".node").forEach((item) => item.classList.remove("active"));
  }

  const animationControler = (e) => {
    e.preventDefault();
    setControler(true);
    stageSetting("one");

    setTimeout(() => {
      typed();
      activeNodes();
    }, 300);

    setTimeout(() => {
      resetNodes();
      finishAnimation();
    }, 5000);

    setTimeout(() => {
      setControler(false);
    }, 5500);
  };

  return (
    <SearchPageAniWrapper>
      <div className="container">
        <div className="innerContainer" data-animated={dataAnimated} data-stage={dataStage}>
          <div className="searchBox">어떤 책을 읽으셨나요?</div>
          <div className="content">
            <img className="sources" src={`${contentMainIMG}`} alt="컨텐츠 이미지"/>
            <div className="results">
              <div className="result">
                <div className="resultImageBox">
                  <img src={`${searchPageReading}`} alt="책 읽기"/>
                </div>
                <div className="mainTitle">Intimacy with books</div>
                <div className="discription">Let's look into the wisdom in the book.</div>
              </div>
              <div className="result">
                <div className="resultImageBox">
                  <img src={`${searchPageGoalIMG}`} alt="목표 설정"/>
                </div>
                <div className="mainTitle">Goal &#38; challenge</div>
                <div className="discription">Try setting your own goals and challenge</div>
              </div>
              <div className="result">
                <div className="resultImageBox">
                  <img src={`${searchPageDiscussion}`} alt="토론"/>
                </div>
                <div className="mainTitle">Share thought with others</div>
                <div className="discription">Knowledge doubles as it is shared.</div>
              </div>
            </div>
          </div>
          <div className="nodes">
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-dropbox.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-web.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-atlassian.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-drive.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-exchange.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-sharepoint.svg"
                alt=""
              />
            </div>
            <div className="node">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/2933/node-salesforce.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          className={controler ? "control activeControl" : "control"}
          onClick={animationControler}
        ></div>
      </div>
    </SearchPageAniWrapper>
  );
};

export default SearchPageAni;