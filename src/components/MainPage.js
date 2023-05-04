/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import "./MainPage.css";
import unForgedKey from "./images/key-without-aembar.png";
import forgedKey from "./images/key-with-aembar.png";
import forgedKeyBlue from "./images/key-with-aembar-blue.png";
import forgedKeyRed from "./images/key-with-aembar-red.png";
import aembarPile from "./images/aembar.png";
import card from "./images/card.png";
import aembarimage from "./images/single-aembar.png";

const numRows = 2; // Number of rows
const numCols = 10; // Number of columns
var aembarSize = 50; // Size of each aembar in pixels
var initialX = 160; // Initial X position in pixels
var initialY = 280; // Initial Y position in pixels
var key01IsForged = false;
var key02IsForged = false;
var key03IsForged = false;
var cardX = 700;
var cardY = 700;
const minusText = "<"; //previous button Text
const plusText = ">"; //next button Text
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth; //Get width of the screen

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight; //Get height of the screen

if (width > 700) {
  initialX = width - 200; // Initial X position in pixels
  aembarSize = (width * 90) / 1180;
  cardX = (width * 640) / 1180;
  cardY = (height * 410) / 820;

  if (height < 420) {
    cardX = (width * 460) / 851;
    cardY = (height * 110) / 393;
    aembarSize = (width * 65) / 1180;
    initialX = 310;
    initialY = 170;
  }

  console.log(cardX, cardY);
}
console.log(width);
function MainPage() {
  const [aembars, setAembars] = useState(
    Array(numRows * numCols).fill({ x: initialX, y: initialY })
  );
  const [dragging, setDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const handleTouchStart = (index, event) => {
    setDragging(true);
    setDragIndex(index);
    setOffsetX(event.targetTouches[0].clientX - aembars[index].x);
    setOffsetY(event.targetTouches[0].clientY - aembars[index].y);
  };

  const handleTouchMove = (event) => {
    if (dragging && dragIndex !== -1) {
      const newAembars = [...aembars];
      newAembars[dragIndex] = {
        x: event.targetTouches[0].clientX - offsetX,
        y: event.targetTouches[0].clientY - offsetY,
      };
      setAembars(newAembars);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    setDragIndex(-1);
    setOffsetX(0);
    setOffsetY(0);

    console.log(aembars);
  };

  const [key01Sprite, setKey01Sprite] = useState(unForgedKey);
  const [key02Sprite, setKey02Sprite] = useState(unForgedKey);
  const [key03Sprite, setKey03Sprite] = useState(unForgedKey);

  function keyForge(index) {
    width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth; //Get width of the screen

    height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight; //Get height of the screen
    cardX = (width * 640) / 1180;
    cardY = (height * 410) / 820;

    if (height < 420) {
      cardX = (width * 460) / 851;
      cardY = (height * 110) / 393;
      aembarSize = (width * 65) / 1180;
      initialX = 310;
      initialY = 170;
    }

    var playerAembar = 0;
    var collected = 0;
    var collect = false;
    var forged = false;
    switch (index) {
      case 1:
        forged = key01IsForged;
        break;
      case 2:
        forged = key02IsForged;
        break;
      case 3:
        forged = key03IsForged;
        break;
      default:
        break;
    }

    let newAembars = [...aembars];
    if (!forged) {
      newAembars.forEach((element) => {
        if (width > 768) {
          if (element.x >= cardX && element.y >= cardY) {
            playerAembar++;
          }
        } else {
          if (element.y >= cardY && !forged) {
            playerAembar++;
          }
        }
      });
      if (playerAembar >= keyCost) {
        collect = true;
      }

      newAembars.forEach((element) => {
        if (width > 768) {
          if (element.x >= cardX && element.y >= cardY) {
            console.log(element.x, element.y);
            if (collect && collected < keyCost) {
              element.x = initialX;
              element.y = initialY;
              collected++;
              forged = true;
            }
          }
        } else {
          if (element.y >= 488) {
            if (collect && collected < keyCost) {
              element.x = initialX;
              element.y = initialY;
              collected++;
              forged = true;
            }
          }
        }
      });
      if (collect) {
        switch (index) {
          case 1:
            setKey01Sprite(forgedKey);
            key01IsForged = true;
            break;
          case 2:
            setKey02Sprite(forgedKeyRed);
            key02IsForged = true;
            break;
          case 3:
            setKey03Sprite(forgedKeyBlue);
            key03IsForged = true;
            break;
          default:
            break;
        }
      }
      setAembars(newAembars);
    } else {
      switch (index) {
        case 1:
          setKey01Sprite(unForgedKey);
          key01IsForged = false;
          break;
        case 2:
          setKey02Sprite(unForgedKey);
          key02IsForged = false;
          break;
        case 3:
          setKey03Sprite(unForgedKey);
          key03IsForged = false;
          break;
        default:
          console.log("Unknown Key");
          break;
      }
    }
  }

  const [keyCost, setKeyCost] = useState(6);

  function decreaseCost() {
    if (keyCost - 1 >= 0) {
      setKeyCost(keyCost - 1);
    }
  }

  function increaseCost() {
    setKeyCost(keyCost + 1);
  }

  return (
    <div onTouchMove={handleTouchMove}>
      <div className="inline">
        <div className="btn-div">
          <button id="minus" onClick={decreaseCost}>
            {minusText}
          </button>
          <span id="keycost">{keyCost}</span>
          <button id="plus" onClick={increaseCost}>
            {plusText}
          </button>
        </div>
        <div className="keys-div">
          {key01Sprite && (
            <img
              src={key01Sprite}
              alt="Selected image"
              className="key"
              id="key01"
              onTouchEnd={(event) => keyForge(1)}
            />
          )}
          <img src={aembarPile} className="pile" />
          <br />
          {key02Sprite && (
            <img
              src={key02Sprite}
              alt="Selected image"
              className="key"
              id="key02"
              onTouchEnd={(event) => keyForge(2)}
            />
          )}
          <br />
          {key03Sprite && (
            <img
              src={key03Sprite}
              alt="Selected image"
              className="key"
              id="key03"
              onTouchEnd={(event) => keyForge(3)}
            />
          )}
        </div>
        <div className="aembar-repository"></div>
      </div>
      <div className="card">
        <img src={card} className="card-image" />
        {aembars.map((aembar, index) => (
          <img
            key={index}
            src={aembarimage}
            className="aembar"
            style={{
              position: "absolute",
              left: aembar.x + "px",
              top: aembar.y + "px",
              width: aembarSize + "px",
              height: aembarSize + "px",
            }}
            onTouchStart={(event) => handleTouchStart(index, event)}
            onTouchEnd={handleTouchEnd}
          />
        ))}
      </div>
    </div>
  );
}
export default MainPage;
