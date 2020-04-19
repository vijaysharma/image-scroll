import React, {useEffect, useState} from 'react';
import * as classes from './App.module.css';
import ImageWrapper from "./container/ImageWrapper/ImageWrapper";
import throttle from "./utils/throttle";
import Loader from "./components/Loader/Loader";
import Logo from './assets/logo.png';

const IMAGE_APIS = ['https://random.dog/woof.json', 'https://aws.random.cat/meow'];

const App = () => {

  let initialQuantity = Math.ceil(document.documentElement.clientHeight * document.documentElement.clientWidth / 40000);
  const [imagesArray, setImagesArray] = useState([]);
  const [imageCount, setImageCount] = useState(initialQuantity);
  const [prevCount, setPrevCount] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [loadMore, setLoadMore] = useState(false);

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
    }).catch(error => console.log('Promise All Error => ', error))

  }

  useEffect(() => {
    if (!(imagesArray.length > 0)) {
      getImagesArray(
        initialQuantity,
        IMAGE_APIS,
        imagesArray
      ).then(data => {
        setImagesArray(data);
      })
    }
  }, [])

  useEffect(() => {
    if (imageCount > prevCount && prevCount > 0) {
      setLoadMore(true);
      getImagesArray(
        10,
        IMAGE_APIS,
        imagesArray
      ).then(data => {
        setImagesArray(data);
        setLoadMore(false)
      })
    }
  }, [imageCount])


  const throttledScrollHandler = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      setPrevCount(imageCount);
      setImageCount(imageCount + 4)
    }
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  }, [imageCount, lastScrollTop])


  const imageWrapper = imagesArray && imagesArray.length < 1 ? <Loader/> :
    <ImageWrapper imagesArray={imagesArray} />

  return (
    <div className={classes.App}>
      <header className={classes.Header}>
        <img src={Logo} alt="Animals Ahoy Logo"/>
        <h1>Animals Ahoy</h1>
      </header>
      <div className={classes.ImageWrapper}>
        {imageWrapper}
      </div>
      {loadMore && <Loader/>}
    </div>
  );
}

export default App;
