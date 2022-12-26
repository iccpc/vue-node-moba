<template>
  <div>
    <swiper>
      <swiperSlide>
        <img class="w-100" src="../assets/images/125-freehover.png" alt="" />
      </swiperSlide>
      <swiperSlide>
        <img class="w-100" src="../assets/images/131-freehover.png" alt="" />
      </swiperSlide>
      <swiperSlide>
        <img class="w-100" src="../assets/images/140-freehover.png" alt="" />
      </swiperSlide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide,
  },
};
</script>
