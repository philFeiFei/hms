<template>
  <djglPublic :czlxChild='czlxChild' :showWdks='showWdks'></djglPublic>
</template>
<script>
import djglPublic from './components/djglPublic'
export default {
  name: 'hfdjgl',
  components: { djglPublic },
  data() {
    return {
      czlxChild: 'HF',
      showWdks: false,//是否显示网底款式
    }
  }
}
</script>


