<template>
  <div>
    <van-tabbar active-color="#8060DA" inactive-color="#d4d4d4" router>
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace :to="url">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	computed:{
		url() {
			return localStorage.token?'/me':'/login'
		}
	}
};
</script>

<style>
</style>