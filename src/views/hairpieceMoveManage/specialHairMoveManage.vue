<template>
  <hairMovePublic :sftdp='sftd'></hairMovePublic>
</template>
<script>
import hairMovePublic from './components/hairMovePublic'
export default {
  name: 'specialHairMoveManage',
  components: { hairMovePublic },
  data() {
    return {
      sftd: 1,
    }
  }
}
</script>


