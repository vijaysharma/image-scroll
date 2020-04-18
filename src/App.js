import React, {useEffect, useState} from 'react';
import './App.css';
import ImageWrapper from "./container/ImageWrapper/ImageWrapper";


const IMAGE_APIS = ['https://random.dog/woof.json', 'https://aws.random.cat/meow'];

const App = () => {
  let initialQuantity = Math.ceil(document.documentElement.clientHeight / 180 * document.documentElement.clientWidth / 220);
  const [imagesArray, setImagesArray] = useState([]);
  const [imageCount, setImageCount] = useState(initialQuantity);
  const [prevCount, setPrevCount] = useState(0);
  const getImagesArray = (quantity, apis, array = []) => {
    if (!quantity || quantity < 1) {
      return;
    }
    const fetchPromises = []
    for (let i = 0; i < quantity; i++) {
      fetchPromises.push(
        fetch(apis[i % apis.length]).then(response => {
          return response.json()
        })
      )
    }

    return Promise.all(fetchPromises).then(res => {
      const files = res.map(r => r['file'] ? r['file'] : r['url'])
      return [...new Set([...array, ...files])]
    })
  }
  useEffect(() => {
    if (!(imagesArray.length > imageCount)) {
      getImagesArray(
        imageCount,
        IMAGE_APIS,
        imagesArray
      ).then(data => {
        setImagesArray(data);
      })
    }
  }, [imageCount])

  const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const debouncedScrollHandler = debounce(() => {
    if (document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop
      < 10) {
      setPrevCount(imageCount);
      setImageCount(imageCount + 20)
    }
  }, 2000)

  window.addEventListener('scroll', debouncedScrollHandler);

  useEffect(() => {
    if (imageCount > prevCount) {
      console.log('prevCount', prevCount);
      console.log('imageCount', imageCount);
      getImagesArray(
        20,
        IMAGE_APIS,
        imagesArray
      ).then(data => {
        setImagesArray(data);
      })
    }
  }, [prevCount, imageCount])

  const imageWrapper = imagesArray.length < 1 ? <h1>Loading ...</h1> : <ImageWrapper imagesArray={imagesArray} />
  return (
    <div className="App">
      {imageWrapper}
      <p>loading...</p>
    </div>
  );
}

export default App;
