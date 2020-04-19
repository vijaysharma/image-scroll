import React from "react";
import * as classes from './ImageCard.module.css';

const ImageCard = ({url, showVideo = false}) => {
  const type = (/\.(mp4|webm|ogg)$/gi).test(url) ? 'video' : 'image';
  const image = (
    <div className={classes.ImageCard}>
      <img src={url} width='auto' alt='Pet'/>
    </div>
  )
  const video = showVideo && (
    <div className={classes.VideoCard}>
      <video height="100%" autoPlay loop>
        <source src={url}/>
        Your browser does not support the video tag.
      </video>
    </div>
  )
  return ((url && type === 'image') ? image : video)
};

export default ImageCard;