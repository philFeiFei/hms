<template>
  <multiPublic :sftdp='sftd' :istdp='istd'></multiPublic>
</template>
<script>
import multiPublic from './components/multiPublic'
export default {
  name: 'ordinaryHairMultiManage',
  components: { multiPublic },
  data() {
    return {
      sftd: 0,
      istd: false
    }
  }
}
</script>


