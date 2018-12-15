<template>
  <cxtjPublic :listQueryp='listQuery' :isGz='isGz'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'gzhzcx',
  components: { cxtjPublic },
  data() {
    return {
      listQuery: {
        ddqsrq: null,
        ddzzrq: null,
        lhsj: null,
        ddbh: null,
        sh: null,
        wdcc: null,
        wdks: null,
        fc: null,
        lhr: null,
        querytype: 3,
      },
      isGz: true,
    }
  }
}
</script>


