<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'hbfdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'HBF',
      showWdks: false,//是否显示网底款式
    }
  }
}
</script>


