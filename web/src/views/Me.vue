<template>
  <div>
    <div class="px-4">
      <van-image
        round
        fit="contain"
        width="10rem"
        height="10rem"
        src="https://avatars.githubusercontent.com/u/44671117?v=4"
        class="px-2"
      />
    </div>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="value in item"
        :key="value"
        icon="photo-o"
        :text="value.title"
				:to="value.url"
      />
    </van-grid>
    <div style="margin-top: 200px">
      <van-button color="#d4d4d4" size="large">
        <span class="text-danger">退出账号</span>
      </van-button>
    </div>
				<m-tabbar></m-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: [
        {
          title: "发文",
					url: '/edit'
        },
        {
          title: "内容管理",
					url:'/body'
        },
        {
          title: "设置",
					url: ''
        },
      ],
    };
  },
};
</script>

<style>
</style>