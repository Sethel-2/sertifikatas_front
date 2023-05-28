import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Navbar from "../components/navbar.js";
import "../homePage.css";
import "../components/swiper.css";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/autoplay/autoplay.min.css";
import slide1Img from "../images/slide-1.jpg";
import slide2Img from "../images/slide-2.jpg";
import slide3Img from "../images/slide-3.jpg";

function HomePage() {
  return (
    <div className="background-image">
      <Navbar />
      <h1 className="home-title">
        Energinio naudingumo sertifikavimo informacinė sistema
      </h1>
      <div className="my-swiper-wrapper">
        <Swiper
          pagination
          navigation
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: true }}
        >
          <SwiperSlide>
            <div className="slide-flex">
              <img src={slide1Img} className="slide-img" />
              <div className="slide-text-block">
                <h2>Sertifikatų užsakymų kontrolė jūsų rankose</h2>
                <p>
                  Ši informacinė sistema padės jums valdyti užsakymų procesus visu sertifikavimo metu.
                  Esant poreikiui, galite sekti būseną, talpinti reikalingu dokumentus, trinti, redaguoti ir netgi pridėti naujus užsakymus.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-flex">
              <img src={slide2Img} className="slide-img" />
              <div className="slide-text-block">
                <h2>Klientai jūsų neužmirš</h2>
                <p>
                  Ši sistema taip pat suteikia pridetinę vertę ir jūsų esamiems ir būsimiems klientams. Įkelti failai ir užsakymų procesai
                  yra taip pat matomi jūsų paskirtiems klientams pagal poreikį. Sutaupote laiko ant procesų, daugiau laiko galite skirti sertifikavimui.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-flex">
              <img src={slide3Img} className="slide-img" />
              <div className="slide-text-block">
                <h2>Viskas vienoje vietoje</h2>
                <p>
                  Jums nebereikės mąstyti kurioje vietoje yra paslėpti dokumentai. Procesas yra paprastas ir susistematizuotas pagal jūsų poreikius. Sertifikatas lengvai pasiekiamas ir parsiunčiamas.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomePage;
