<template>
  <div>
    <el-container>
      <el-aside
        width="230px"
        style="height: 100vh; background-color: rgb(238, 241, 246)"
      >
        <el-menu
          router
          :default-openeds="['1']"
          unique-opened
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>内容管理</template
            >
            <el-menu-item-group>
              <template slot="title">类别</template>
              <el-menu-item index="/categories/create">新增分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新增物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新增文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-message"></i>运营管理</template
            >
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新增广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-message"></i>系统管理</template
            >
            <el-menu-item-group>
              <template slot="title">设置</template>
              <el-menu-item index="/ads/create">全局配置</el-menu-item>
              <el-menu-item index="/ads/list">参数</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "Youli",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
	created() {
		console.log(this.$route)
	},
};
</script>

<style>
</style>