<template>
  <div>
    <van-field v-model="model.title" label="标题" />
    <vue-editor
      v-model="model.body"
      useCustomImageHandler
      @image-added="handleImageAdded"
      class="bg-white"
    ></vue-editor>
    <van-button color="#8060DA" size="large" @click="save()">发文</van-button>
  </div>
</template>

<script>
import { Notify } from 'vant';
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    VueEditor,
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      // if (this.id) {
      //   res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      // } else {
      // 	}
      res = await this.$http.post("rest/articles", this.model);
      this.$router.push("/me");
      // 成功通知
      Notify({ type: "success", message: "发表成功" });
    },
  },
};
</script>

<style>
</style>