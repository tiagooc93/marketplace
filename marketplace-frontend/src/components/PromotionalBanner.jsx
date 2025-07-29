import Box from "@mui/material/Box";
import banner1 from "../images/banner4.png";
import banner2 from "../images/banner5.png";
import { GlobalStyles } from "@mui/material";
import { useState } from "react";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [banner1, banner2];

function PromotionalBanner() {
  return (
    <>
      <Box
        sx={{
          mt: 5,
          width: "100%",
          height: 300,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ height: "100%", width: "75%" }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            style={{ width: "100%" }}
          >
            {banners.map((img, i) => (
              <SwiperSlide key={i}>
                <Box
                  component="img"
                  src={img}
                  alt={`Banner ${i + 1}`}
                  sx={{ width: "100%", height: 300, objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </>
  );
}

export default PromotionalBanner;
