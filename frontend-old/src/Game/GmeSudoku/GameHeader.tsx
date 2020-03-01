import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import classNames from "./GameHeader.module.scss";

type TDifficulity = "easy" | "medium" | "difficult";
type TGameStage = "playing" | "paused";
interface IGameHeaderProps {
  difficulty: TDifficulity;
  handleSubmit: () => any;
  usedSecond: number;
  setGameStage: (s: TGameStage) => any;
}

function GameHeader({
  difficulty,
  handleSubmit,
  setGameStage,
  usedSecond
}: IGameHeaderProps) {
  const handlePause = useCallback(() => setGameStage("paused"), [setGameStage]);
  const usedHourLocale = useMemo(
    () =>
      Math.floor(usedSecond / 3600).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );
  const usedMinuteLocale = useMemo(
    () =>
      Math.floor(usedSecond / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );
  const usedSecondLocale = useMemo(
    () =>
      (usedSecond % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }),
    [usedSecond]
  );

  return (
    <div className={classNames.container}>
      <div className={classNames.usedTimeContainer}>
        <div className={classNames.usedTimeTitle}>USED</div>
        <div className={classNames.usedTimeValue}>
          {usedHourLocale}:{usedMinuteLocale}:{usedSecondLocale}
        </div>
      </div>
      <div className={classNames.btnContainer}>
        <div className={classNames.pauseBtn} onClick={handlePause}>
          PAUSE
        </div>
        <div className={classNames.submitBtn} onClick={handleSubmit}>
          SUBMIT
        </div>
      </div>
    </div>
  );
}

GameHeader.propTypes = {
  difficulty: PropTypes.oneOf(["easy", "medium", "difficult"]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setGameStage: PropTypes.func.isRequired,
  usedSecond: PropTypes.number.isRequired
};
export default memo(GameHeader);
