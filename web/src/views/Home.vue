<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, i) in swiperList.items" :key="i">
        <img class="w-100" :src="item.image" alt="" />
      </swiper-slide>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div>栈友</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div>图片集</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-xs text-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span class="text-light-1">收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="mulu1" title="新闻咨询" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 d-flex ai-center"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info text-border px-1">{{
            news.categoryName
          }}</span>
          <span class="flex-1 text-dark-1 text-ellipsis pl-2 pr-4">{{
            news.title
          }}</span>
          <span class="text-light-1 fs-xs">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card title="社区推荐" icon="">
      <template #items>
        <div>正在开发中...</div>
      </template>
    </m-list-card>
    <m-tabbar class="mt-4"> </m-tabbar>
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
      swiperList: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchSwipers() {
      const res = await this.$http.get("swiper");
      this.swiperList = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchSwipers();
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
