<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/20220526092258.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/20220530093919.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/88555477841515.png" alt="" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div>爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-xs text-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span class="text-light-1">收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu-1" title="新闻咨询" :categories="newsCats">
      <template #items="{ category }">
        <div
          class="py-2 d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-4">{{ news.title }}</span>
          <span class="text-light-1">{{ news.createdAt | date }}</span>
        </div>
      </template>
    </m-list-card>
    <p>间距</p>
    <p>间距</p>
    <p>间距</p>
    <p>间距</p>
    <p>间距</p>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(value) {
      return dayjs(value).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
  },
};
</script>

<style lang="scss" >
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "grey");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
