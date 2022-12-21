<template>
  <div>
    <h1>{{ id ? "编辑" : "新增" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input
              v-model="model.name"
              maxlength="15"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input
              v-model="model.title"
              maxlength="15"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <div class="rate">
              <el-rate
                :max="10"
                show-score
                v-model="model.scores.difficult"
              ></el-rate>
            </div>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
					<el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row>
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-card shadow="hover">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'icon', res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    type="textarea"
                    v-model="item.description"
                  ></el-input>
                </el-form-item>
                <el-form-item label="提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="skillRemove(i)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      items: [],
      categories: [],
      model: {
        scores: {
          difficult: 0,
        },
        skills: [],
      },
      parents: [],
    };
  },
  methods: {
		// 技能删除
    skillRemove(i) {
      this.model.skills.splice(i, 1);
    },
    handleAvatarSuccess(res) {
      // this.model.icon = res.url
      this.$set(this.model, "avatar", res.url);
    },
    beforeAvatarUpload(file) {},
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);

    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style scoped>
.rate {
  margin-top: 0.6rem;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>