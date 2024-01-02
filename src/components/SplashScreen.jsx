import loader from "../assets/json/animations/loading.json";
import { useLottie } from "lottie-react";
import Logo from "../assets/logo.png";

const SplashScreen = () => {

  const { View } = useLottie({
    loop: true,
    autoplay: true,
    animationData: loader,
  });
  
  return (
    <div id="splashScreen">
  <div id="loading-container">{View}</div>
      {/* <img src={Logo} /> */}
    </div>
  );
};

export default SplashScreen;
