<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'lfdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'LF',
      showWdks: false,//是否显示网底款式
    }
  }
}
</script>


