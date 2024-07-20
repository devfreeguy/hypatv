import { useLottie } from "lottie-react";
import loader from "../../assets/json/animations/loading.json";
import "./SuspenseLoading.css";

const SuspenseLoading = ({isComponent = false}) => {
  const { View } = useLottie({
    loop: true,
    autoplay: true,
    animationData: loader,
  });

  return (
    <div id={`suspense-loading ${isComponent ? "in-component" : ''}`}>
      <div className="suspense-loader">{View}</div>
    </div>
  );
};

export default SuspenseLoading;
