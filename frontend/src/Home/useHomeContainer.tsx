import useHmeNews from "./useHmeNews";
import useHmeWeather from "./useHmeWeather";

function useHomeContainer() {
  const newsState = useHmeNews();
  const weatherState = useHmeWeather();
  return { newsState, weatherState };
}

export default useHomeContainer;
