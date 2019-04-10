<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'ppdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'PP',
      showWdks: false,//是否显示网底款式
    }
  }
}
</script>


