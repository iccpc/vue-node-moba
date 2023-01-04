<template>
  <div>
    <el-container>
      <el-aside
        width="230px"
        style="height: 100vh; background-color: rgb(238, 241, 246)"
      >
        <el-menu
          router
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
              <template slot="title">图片</template>
              <el-menu-item index="/items/create">新增图片</el-menu-item>
              <el-menu-item index="/items/list">图片列表</el-menu-item>
            </el-menu-item-group>
            <!-- <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group> -->
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
              <el-menu-item index="/ads/create">新增轮播图</el-menu-item>
              <el-menu-item index="/ads/list">轮播图列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-message"></i>系统管理</template
            >
            <el-menu-item-group>
              <template slot="title">设置</template>
              <el-menu-item index="/users/create">添加管理员</el-menu-item>
							<el-menu-item index="/users/list">管理员列表</el-menu-item>
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
          <span>{{}}scss</span>
        </el-header>

        <el-main>
          <router-view :key="$route.path"></router-view>
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
  }
};
</script>

<style>
</style>