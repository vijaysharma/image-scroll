import React from "react";
import * as classes from './ImageCard.module.css';

const ImageCard = ({url, height}) => {
  const type = (/\.(mp4|webm|ogg)$/gi).test(url) ? 'video' : 'image';
  const image = (
    <div className={classes.ImageCard} style={{height: `${height}px`}}>
      <img src={url} width='auto' alt='Pet'/>
    </div>
  )
  const video = (
    <div className={classes.VideoCard} style={{height: `${height}px`}}>
      <video height="100%" autoPlay loop>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </div>
  )
  return ((url && type === 'image') ? image : video)
};

export default ImageCard;