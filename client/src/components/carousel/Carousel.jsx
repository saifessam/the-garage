import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './style.css';

const Carousel = ({ type, condition, images }) => {
  const renderImage = (image) => {
    if (type === 'vehicle') {
      return <img src={`/assets/${type}/${condition}/${image}`} />;
    } else {
      return <img src={`/assets/${type}/${image}`} />;
    }
  };

  return (
    <Swiper spaceBetween={0} slidesPerView={1} modules={[Navigation]} navigation loop>
      {images?.map((image) => {
        return <SwiperSlide key={image}>{renderImage(image)}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default Carousel;
