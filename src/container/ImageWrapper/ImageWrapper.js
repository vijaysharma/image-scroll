import React from "react";
import * as classes from './ImageWrapper.module.css';
import ImageCard from "../../components/ImageCard/ImageCard";

const ImageWrapper = ({imagesArray}) => {
  const images = imagesArray.length > 0 ? imagesArray.map(url => <ImageCard height={180} url={url} key={url} />) : null

  return (
    <div className={classes.ImagesWrapper}>
      {images}
    </div>
  )
};

export default ImageWrapper;