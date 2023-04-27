/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import "./MainPage.css";
import unForgedKey from "./images/key-without-aembar.png";
import forgedKey from "./images/key-with-aembar.png";
import aembarPile from "./images/aembar.png";
import card from "./images/card.png";
import aembarimage from "./images/single-aembar.png";

const numRows = 2; // Number of rows
const numCols = 10; // Number of columns
const aembarSize = 50; // Size of each aembar in pixels
const initialX = 200; // Initial X position in pixels
const initialY = 300; // Initial Y position in pixels
var keyCost = 6;
var key01IsForged = false;
var key02IsForged = false;
var key03IsForged = false;
const minusText = "<";
const plusText = ">";

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
  };

  const [key01Sprite, setKey01Sprite] = useState(unForgedKey);
  const [key02Sprite, setKey02Sprite] = useState(unForgedKey);
  const [key03Sprite, setKey03Sprite] = useState(unForgedKey);

  function keyForge(index) {
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
    newAembars.forEach((element) => {
      if (element.y >= 570 && !forged) {
        playerAembar++;
      }
    });
    if (playerAembar >= 6) {
      collect = true;
    }

    newAembars.forEach((element) => {
      if (element.y >= 570) {
        if (collect && collected < keyCost) {
          element.x = initialX;
          element.y = initialY;
          collected++;
          forged = true;
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
          setKey02Sprite(forgedKey);
          key02IsForged = true;
          break;
        case 3:
          setKey03Sprite(forgedKey);
          key03IsForged = true;
          break;
        default:
          break;
      }
    }
    setAembars(newAembars);
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
          <span id="keycost">{"      " + keyCost + "      "}</span>
          <button id="plus" onClick={increaseCost}>
            {plusText}
          </button>
        </div>
        <div className="keys-div">
          <img
            id="key1"
            src={key01Sprite}
            className="key"
            onTouchStart={(event) => keyForge(1)}
          />
          <img src={aembarPile} className="pile" />
          <br />
          <img
            id="key2"
            src={key02Sprite}
            className="key"
            onTouchStart={(event) => keyForge(2)}
          />
          <br />
          <img
            id="key3"
            src={key03Sprite}
            className="key"
            onTouchStart={(event) => keyForge(3)}
          />
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
