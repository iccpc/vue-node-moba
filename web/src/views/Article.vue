<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 text-info border-bottom">
      <router-link :to="{name: 'home'}" tag="div" class="iconfont icon-arrow-left"></router-link>
      <div class="flex-1 text-ellipsis pr-5">
        <strong>{{ model.title }}</strong>
      </div>
      <div class="text-grey fs-xs">
        {{ model.updatedAt | date}}
      </div>
    </div>
    <div v-html="model.body" class="px-2 body"></div>
    <div class="mt-2 py-3 px-2 border-top">
      <div class="d-flex flex-1 pb-2 text-info">
        <strong>相关文章</strong>
      </div>
      <div>
        <router-link
          tag="div"
          class="py-1 pl-3"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          >{{ item.title }}</router-link
        >
      </div>
    </div>
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
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      console.log(res.data);
      this.model = res.data;
    },
  },
  watch: {
    id() {
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>