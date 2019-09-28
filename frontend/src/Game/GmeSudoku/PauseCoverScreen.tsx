import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { animated, useSpring } from "react-spring";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

import classNames from "./PauseCoverScreen.module.scss";

type TDifficulity = "easy" | "medium" | "difficult";
type TGameStage = "playing" | "paused";

type TInitializeState = "loading" | "empty" | "loaded";
interface IPauseCoverScreenProps {
  gameStage: TGameStage;
  handleDifficultyChosen: (d: TDifficulity) => any;
  initializeState: TInitializeState;
  isFetching: boolean;
  setGameStage: (s: TGameStage) => any;
}

function PauseCoverScreen({
  handleDifficultyChosen,
  gameStage,
  initializeState,
  isFetching,
  setGameStage
}: IPauseCoverScreenProps) {
  //states ---------------------------------------------------
  const [displayNone, setDisplayNone] = useState(false);
  const springStyle = useSpring({
    opacity: gameStage === "paused" ? 0.97 : 0,
    gradient: gameStage === "paused" ? 80 : 500,
    onRest: () => setDisplayNone(gameStage === "playing")
  });
  const style = useMemo(
    () => ({
      opacity: springStyle.opacity,
      background: springStyle.gradient.interpolate(
        g => `radial-gradient(#fff, #ccc ${g}%)`
      )
    }),
    [springStyle]
  );

  // methods -------------------------------------------------
  const renderDifficultyButton = useCallback(
    (difficulty: TDifficulity) => {
      return (
        <div
          className={classNames.levelBtn}
          onClick={() => handleDifficultyChosen(difficulty)}
        >
          {isFetching ? <CircularProgress /> : difficulty.toUpperCase()}
        </div>
      );
    },
    [handleDifficultyChosen, isFetching]
  );

  // effect --------------------------------------------------
  useEffect(
    () => {
      setDisplayNone(oDisplayNone => {
        if (oDisplayNone && gameStage === "paused") return true;
        else return oDisplayNone;
      });
    },
    [gameStage]
  );

  // return --------------------------------------------------
  const renderedEasyButton = useMemo(() => renderDifficultyButton("easy"), [
    renderDifficultyButton
  ]);
  const renderedMediumButton = useMemo(() => renderDifficultyButton("medium"), [
    renderDifficultyButton
  ]);
  const renderedDifficultButton = useMemo(
    () => renderDifficultyButton("difficult"),
    [renderDifficultyButton]
  );
  const renderedContinue = useMemo(
    () => {
      if (initializeState === "loading") return <CircularProgress />;
      if (initializeState === "empty") return <></>;
      return (
        <div
          className={classNames.continueBtn}
          onClick={() => setGameStage("playing")}
        >
          CONTINUE
        </div>
      );
    },
    [initializeState, setGameStage]
  );

  if (displayNone) return <></>;
  return (
    <animated.div className={classNames.container} style={style}>
      <div className={classNames.title}>CHOOSE YOUR GAME</div>
      {renderedEasyButton}
      {renderedMediumButton}
      {renderedDifficultButton}
      {renderedContinue}
    </animated.div>
  );
}

PauseCoverScreen.propTypes = {
  handleDifficultyChosen: PropTypes.func.isRequired,
  gameStage: PropTypes.oneOf(["paused", "playing"]).isRequired,
  initializeState: PropTypes.oneOf(["loading", "empty", "loaded"]).isRequired,
  isFetching: PropTypes.bool.isRequired,
  setGameStage: PropTypes.func.isRequired
};
export default memo(PauseCoverScreen);
