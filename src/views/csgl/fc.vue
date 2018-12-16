<template>
  <csglPublic :csbhp='csbh'></csglPublic>
</template>
<script>
import csglPublic from './components/csglPublic'
export default {
  name: 'fcgl',
  components: { csglPublic },
  data() {
    return {
      csbh: 'FC'
    }
  }
}
</script>



