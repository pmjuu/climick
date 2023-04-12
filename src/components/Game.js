import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SIZE } from "../assets/constants";
import ClimbingWall from "./ClimbingWall";
import Modal from "./Modal";
import Ranking from "./Ranking";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  .game-display {
    width: 950px;
    height: ${SIZE.GAME_HEIGHT}px;
    background-color: #999;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 400px;
    height: ${SIZE.GAME_HEIGHT}px;

    .status-box {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 300px;
      background-color: rgba(30, 30, 30, 0.9);
      color: #fff;
      font-size: 2.5rem;

      .row {
        margin: 10px 15px;
      }

      .category {
        margin-right: 10px;
        font-weight: 700;
      }

      .hp-bar {
        width: 366px;
        height: 30px;
        background-color: #44d;
        border: 1px solid #fff;
      }
    }

    .button {
      margin-top: 5px;
      padding: 0;
      width: 100%;
    }
  }
`;

export default function Game() {
  const navigate = useNavigate();
  const name = localStorage.getItem("climick-name");
  const [isModalOpened, setIsModalOpened] = useState(false);

  useEffect(() => {
    if (!name) navigate("/");
  }, [name, navigate]);

  const clickRanking = () => setIsModalOpened(true);
  const clickHomePage = () => navigate("/");
  const clickRestart = () => navigate("/game");
  const closeModal = () => setIsModalOpened(false);

  return (
    <>
      <Wrapper>
        <div className="wall">
          <ClimbingWall />
        </div>
        <div className="sidebar">
          <div className="status-box">
            <div className="row">
              <span className="category">Name</span>
              <span>{name}</span>
            </div>
            <div className="row">
              <span className="category">Time</span>
              <span>00:00</span>
            </div>
            <div className="row">
              <span className="category">HP</span>
            </div>
            <div className="row hp-bar" />
          </div>
          <div className="button-section">
            <button className="button" onClick={clickRanking}>
              🏆 Ranking
            </button>
            <button className="button" onClick={clickHomePage}>
              🏠 Home Page
            </button>
            <button className="button" onClick={clickRestart}>
              Restart
            </button>
          </div>
        </div>
      </Wrapper>
      {isModalOpened && (
        <Modal closeModal={closeModal}>
          <Ranking />
        </Modal>
      )}
    </>
  );
}
