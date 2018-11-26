<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <div class="info-container">
        <span class="display_name">欢迎【{{ name }}】登录系统</span>
        <!-- <span class="display_name">角色：</span>
        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 30px;
    height: 150px;
    line-height: 100px;
    .display_name {
      font-size: 30px;
      line-height: 48px;
      color: firebrick;
      top: 25px;
    }
  }
}
</style>
