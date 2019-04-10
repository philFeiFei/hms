<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'prdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'TPFW',
      showWdks: false,//是否显示网底款式
    }
  }
}
</script>


