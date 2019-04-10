<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'tpfxdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'TPFX',
      showWdks: true,//是否显示网底款式
    }
  }
}
</script>


