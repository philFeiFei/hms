<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <div class="info-container">
        <span class="display_name">欢迎【{{ name }}】登录系统,您的角色是</span>
        <span v-for="item in roles" :key="item" class="display_name">【{{ item | parseArrCode('role') }}】</span>
      </div>
      <h3>系统相关信息</h3>
      <p>阿里云服务器:2vCPU 4GB (I/O优化) <span :class="{lastDaysClass:alertLastDays}">{{jzrq}}到期</span>
        <span v-if="alertLastDays" :class="{lastDaysClass:alertLastDays}">据到期还有{{lastDays}}天，请提前续费！！！</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',
  data() {
    return {
      lastDays: null,
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'jzrq',
      'lastDaysToAlert'
    ]),
    alertLastDays() {
      var endDate1 = new Date(this.jzrq);
      var nowDate1 = new Date();

      var days = (endDate1.getTime() - nowDate1.getTime()) / 86400000;
      var lDays = Math.floor(days)
      this.lastDays = lDays
      if (lDays < this.lastDaysToAlert) {
        return true
      } else {
        return false
      }

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  .info-container {
    position: relative;
    margin-left: 15px;
    height: 450px;
    line-height: 100px;
    .display_name {
      font-size: 30px;
      line-height: 48px;
      top: 25px;
      color: lightslategrey;
    }
  }
}
span.lastDaysClass {
  color: red;
  font-weight: bold;
  font-size: 21px;
}
h3,
p {
  margin: 15px;
  font-weight: 500;
  color: lightslategrey;
}
</style>
