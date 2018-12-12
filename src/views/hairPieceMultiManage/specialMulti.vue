<template>
  <multiPublic :sftdp='sftd' :istdp='istd'></multiPublic>
</template>
<script>
import multiPublic from './components/multiPublic'
export default {
  name: 'specialHairMultiManage',
  components: { multiPublic },
  data() {
    return {
      sftd: 1,
      istd: true
    }
  }
}
</script>
