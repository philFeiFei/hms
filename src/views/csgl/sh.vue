<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'shgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'SH'
    }
  }
}
</script>



