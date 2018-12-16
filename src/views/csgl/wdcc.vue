<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'wdccgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'WDCC'
    }
  }
}
</script>



