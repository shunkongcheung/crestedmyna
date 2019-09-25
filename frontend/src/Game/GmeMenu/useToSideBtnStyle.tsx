import { useCallback, useMemo } from "react";
import { useSpring } from "react-spring";

function useToSideBtnStyle(toSide: "left" | "right") {
  const NORMAL_PERCENT = 100,
    HOVER_PERCENT = 50;
  const [rToSideStyle, set] = useSpring(() => ({
    bgImgPercent: NORMAL_PERCENT
  }));
  const getBackgroundImage = useCallback(
    () => {
      return rToSideStyle.bgImgPercent.interpolate(
        (x: number) =>
          `linear-gradient(to ${toSide}, #eee, rgba(214, 214, 214, 1) ${x}%)`
      );
    },
    [rToSideStyle, toSide]
  );
  const toSideStyle = useMemo(
    () => ({ backgroundImage: getBackgroundImage() } as any),
    [getBackgroundImage]
  );

  const handleMouseEnterOrPress = useCallback(
    () => set({ bgImgPercent: HOVER_PERCENT }),
    [set, HOVER_PERCENT]
  );
  const handleMouseLeave = useCallback(
    () => set({ bgImgPercent: NORMAL_PERCENT }),
    [set, NORMAL_PERCENT]
  );

  return [toSideStyle, handleMouseEnterOrPress, handleMouseLeave];
}
export default useToSideBtnStyle;
