<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'wdksgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'WDKS'
    }
  }
}
</script>



