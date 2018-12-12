<template>
  <hairMovePublic :sftdp='sftd'></hairMovePublic>
</template>
<script>
import hairMovePublic from './components/hairMovePublic'
export default {
  name: 'ordinaryHairMoveManage',
  components: { hairMovePublic },
  data() {
    return {
      sftd: 0,
    }
  }
}
</script>


