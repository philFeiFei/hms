<template>
  <cxtjPublic :listQueryp='listQuery' :isZx='isZx'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'zxhzcx',
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
        querytype: 6,
      },
      isZx: true,
    }
  }
}
</script>


