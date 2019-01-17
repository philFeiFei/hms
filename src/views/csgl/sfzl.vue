<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'sfzlgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'SFZL'
    }
  }
}
</script>



