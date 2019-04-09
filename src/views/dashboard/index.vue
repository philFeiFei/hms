<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard' //默认是adminDashboard
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {//vue创建之后，是否roles包含超级管理员角色，如果不包括则进入editDashboard。
    //所有系统默认1是超级管理员
    if (!this.roles.includes(1)) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
