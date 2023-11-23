import "../styles/general.css";
import Logo from "../assets/logo.png";
import { useEffect } from "react";

const Loading = ({ show }) => {
  // const [loading, setLoading] = useState('')

  // useEffect(()=>{
  //   if(loading !== 'stop'){
  //     setLoading(sessionStorage.getItem('loading'));
  //   }
  // })

  if (show) {
    return (
      <div id="splashScreen">
        <img src={Logo} />
      </div>
    );
  }
};

export default Loading;
