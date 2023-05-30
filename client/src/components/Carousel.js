import React, { useState, useContext,useEffect } from 'react'

let count = 0;
const Carousel = ({images}) => {
  console.log(images)
  const featuredImages = ['https://bit.ly/3CoiKiQ', 'https://bit.ly/3DtZm5p', 'https://bit.ly/3l52A8v'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleOnNextClick = () => {
      count = (count + 1) % images.length;
      setCurrentIndex(count);
    };

    const handleOnPrevClick = () => {
      const productsLength = images.length;
      count = (currentIndex + productsLength - 1) % productsLength;
      setCurrentIndex(count);
    };

    useEffect(() => {
      startSlider();
    }, []);
  
    const startSlider = () => {
      setInterval(() => {
        handleOnNextClick();
      }, 5000);
    };
    return (
        <div className="max-w-screen-xl m-auto">
          <div className="w-full relative select-none">
          <div className="aspect-w-16 aspect-h-9">
          <img src={images[currentIndex]} alt="" />
    </div>
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
            {/* <button onClick={(e) => { e.stopPropagation(); handleOnPrevClick()}}>Previous</button>
          	<button onClick={handleOnNextClick}>Next</button> */}
            </div>
          </div>
        </div>
      );
    }


export default Carousel

// https://ndpniraj.com/blogs/responsive-infinite-carousel-slider-using-react-and-tailwind-css
