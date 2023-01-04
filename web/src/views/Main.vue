<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" width="35" />
      <div class="px-2 flex-1">
        <div class="text-white">博客栈</div>
        <div class="fs-xs text-grey-1">一个博客分享平台...</div>
      </div>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" mode="closeable"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="bg-primary pt-3 pb-2">
        <div class="nav nav-inverse jc-around pb-1">
          <div class="nav-item active">
            <router-link class="nav-link" tag="div" to="/">首页</router-link>
          </div>
          <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/"
              >我要发文</router-link
            >
          </div>
        </div>
      </div>
      <router-view></router-view>
    </van-pull-refresh>
		
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
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
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
        this.fetchNewsCats();
        this.fetchSwipers();
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
  .user-icon {
  }
}
</style>