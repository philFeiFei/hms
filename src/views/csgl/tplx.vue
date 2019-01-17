<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'tplxgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'TPLX'
    }
  }
}
</script>



