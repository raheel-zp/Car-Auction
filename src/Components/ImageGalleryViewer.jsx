import React, { useState,useRef,useEffect } from 'react';
// import Slider from 'react-slick';
import './ImageGalleryViewer.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const ImageGalleryViewer = ({ images, Product, showGallery, setShowGallery }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeNav1,setActiveNav1] = useState(true);
  const [activeNav2,setActiveNav2] = useState(false);
  const [activeNav3,setActiveNav3] = useState(false);
  const [activeNav4,setActiveNav4] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
    
  const handleSlideClick = (index) => {
    // console.log(index);
    const exteriorLength = Product.exteriorImages.length;
    const interiorLength = Product.interiorImages.length;
    const mechanicalLength = Product.mechanicalImages.length;
    const documentsLength = Product.documentsImages.length;
    if( index < exteriorLength ){
      // console.log('Exterior');
      setActiveNav1(true);
      setActiveNav2(false);
      setActiveNav3(false);
      setActiveNav4(false);
    }
    if( exteriorLength<=index && index<(exteriorLength+interiorLength) ){
      // console.log('interior');
      setActiveNav1(false);
      setActiveNav2(true);
      setActiveNav3(false);
      setActiveNav4(false);
    }
    if( (exteriorLength+interiorLength) <= index && index<(exteriorLength+interiorLength+mechanicalLength)){
      // console.log('mechanical');
      setActiveNav1(false);
      setActiveNav2(false);
      setActiveNav3(true);
      setActiveNav4(false);
    }
    if( (exteriorLength+interiorLength+mechanicalLength)<=index){
      // console.log('Documents');
      setActiveNav1(false);
      setActiveNav2(false);
      setActiveNav3(false);
      setActiveNav4(true);
    }
    setCurrentImage(index);
  };
  const swiperRef = useRef(null);

  const goPrev = () => {
    if (currentImage > 0) {
      // setCurrentImage(currentImage - 1);
      handleSlideClick(currentImage-1);
    }
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const goNext = () => {
    if (currentImage < images.length - 1) {
      handleSlideClick(currentImage+1);
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }
  };
  const hideImageGallery = ()=>{
    setShowGallery(false);
    document.body.style.overflow = 'auto';
  }
  const handleDownload = () => {
    const imageUrl = images[currentImage];

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `image_${currentImage + 1}.jpg`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Enter full-screen mode
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      // Exit full-screen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  
    // Toggle the full-screen state
    setIsFullScreen(!isFullScreen);
  };
  const [showItems, setShowItems] = useState(11); // Default value

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth > 769 && screenWidth < 992) {
        setShowItems(8);
      }
      if (screenWidth >= 481 && screenWidth <= 769) {
        setShowItems(5);
      }
      if (screenWidth < 481) {
        setShowItems(4);
      }
    };

    // Call the handleResize function initially and add an event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div  className='main-gallery1 prevent-select'>
        <div className="gallery-header">
            <div className="gh_left">
                <div className="image-position"> {currentImage+1} / {images.length} </div>
            </div>
            <div className="gh_mid">
                <div style={{fontWeight: activeNav1?'':'',color: activeNav1?'white':'',filter:activeNav1?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >EXTERIOR</div>
                <div style={{fontWeight: activeNav2?'':'',color: activeNav2?'white':'',filter:activeNav2?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >INTERIOR</div>
                <div style={{fontWeight: activeNav3?'':'',color: activeNav3?'white':'',filter:activeNav3?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >MECHANICAL</div>
                <div style={{fontWeight: activeNav4?'':'',color: activeNav4?'white':'',filter:activeNav4?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >DOCUMENTS</div>
            </div>
            <div className="gh_right">
                {/* <svg style={{height:'1.6rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> */}
                {/* <svg style={{height:'1.7rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg> */}
                <svg style={{height:'1.7rem'}} onClick={toggleFullScreen} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>
                <svg onClick={handleDownload} style={{height:'1.6rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                <svg onClick={hideImageGallery} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>                
            </div>
        </div>
        <div className="gallery-header2">
          <div className="head-mob-con1">
            <div className="image-position"> {currentImage+1} / {images.length} </div>
            <div className='gh_right' >
                {/* <svg style={{height:'1.6rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg> */}
                {/* <svg style={{height:'1.7rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg> */}
                <svg style={{height:'1.7rem'}} onClick={toggleFullScreen} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>
                <svg onClick={handleDownload} style={{height:'1.6rem'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                <svg onClick={hideImageGallery} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>                
            </div>
          </div>
          <div className="gh_mid">
            <div style={{fontWeight: activeNav1?'':'',color: activeNav1?'white':'',filter:activeNav1?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >EXTERIOR</div>
            <div style={{fontWeight: activeNav2?'':'',color: activeNav2?'white':'',filter:activeNav2?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >INTERIOR</div>
            <div style={{fontWeight: activeNav3?'':'',color: activeNav3?'white':'',filter:activeNav3?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >MECHANICAL</div>
            <div style={{fontWeight: activeNav4?'':'',color: activeNav4?'white':'',filter:activeNav4?'drop-shadow(0px 0px 5px #ffffff80)':'' }} >DOCUMENTS</div>
          </div>
        </div>
        <img className="main-image" src={images[currentImage]} alt="Main" />
        <div style={{position:'relative'}} >
          <div className="custom-prev-arrow" onClick={goPrev}>
            <svg style={{transform: 'rotate(180deg)'}} xmlns="http://www.w3.org/2000/svg" height="1.5em" fill='white' viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
          </div>
          <div className="custom-next-arrow" onClick={goNext}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" fill='white' viewBox="0 0 512 512"><path d="M489.4 233.4L512 256l-22.6 22.6-128 128-22.6 22.6L293.5 384l22.6-22.6L389.5 288 32 288 0 288l0-64 32 0 357.5 0-73.4-73.4L293.5 128l45.3-45.3 22.6 22.6 128 128z"/></svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
          </div>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={showItems}
            spaceBetween={10}
            freeMode={true}
            pagination={false}
            navigation={false}
            initialSlide={0}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} onClick={()=>{handleSlideClick(index)}} >
                <img className="thumbnail-image"
                  style={{
                    border:currentImage===index ?'2px solid white':'2px solid #ffffffc9',
                    filter:currentImage===index ?'drop-shadow(0 0 2px #ffffff80)':'',
                    opacity:currentImage===index ?'1':'0.6',
                  }} src={image} alt={`Thumbnail ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>
  );
};
export default ImageGalleryViewer;