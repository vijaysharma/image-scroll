import React from "react";
import * as classes from './ImageWrapper.module.css';
import ImageCard from "../../components/ImageCard/ImageCard";

const ImageWrapper = ({imagesArray, showVideo = false}) => {
  const images = imagesArray && imagesArray.length > 0 ? imagesArray.map(url => <ImageCard url={url} key={url} showVideo={showVideo} />) : null

  return (
    <div className={classes.ImagesWrapper}>
      {images}
    </div>
  )
};

export default ImageWrapper;