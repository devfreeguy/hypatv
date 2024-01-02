import React, { useEffect } from "react";
import placeholder from "/images/placeholder.jpg";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "./VideoPlayer.css";
import { MOVIES } from "flixhq-core";


const VideoPlayer = ({ title, thumbnail = "", url = "" }) => {
  const flixhq = new MOVIES.FlixHQ();

  useEffect(()=>{
    // (async () => {
      // const data = await flixhq.home();
      // console.log(data);
    // })();
  },[])
  return (
    <div id="custom-player-bg">
      {url ? (
        <MediaPlayer title={title} src="">
          <MediaProvider />
          <DefaultVideoLayout
            thumbnails={thumbnail ? thumbnail : placeholder}
            icons={defaultLayoutIcons}
          />
        </MediaPlayer>
      ) : (
        <img
          id="custom-player-thumbnail"
          src={thumbnail ? thumbnail : placeholder}
          // onLoad={()=> s}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
