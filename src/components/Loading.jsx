import { useLottie } from "lottie-react";
import loader from '../assets/json/animations/loading.json'

const Loading = () => {

  const { View } = useLottie({
      loop: true,
      autoplay: true,
      animationData: loader,
    });

  return (
    <div id="loading">
      <div id="loading-container">{View}</div>
    </div>
  );
};

export default Loading;
