import Box from "@mui/material/Box";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = ["/images/banner4.png", "/images/banner5.png"];

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
