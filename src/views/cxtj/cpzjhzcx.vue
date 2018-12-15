<template>
  <cxtjPublic :listQueryp='listQuery' :isCpzj='isCpzj'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'cpzjhzcx',
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
        querytype: 7,
      },
      isCpzj: true,
    }
  }
}
</script>


