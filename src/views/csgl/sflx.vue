<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'sflxgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'SFLX'
    }
  }
}
</script>



