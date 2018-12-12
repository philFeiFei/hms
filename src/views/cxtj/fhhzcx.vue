<template>
  <cxtjPublic :listQueryp='listQuery' :isFh='isFh'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'fhhzcx',
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
        querytype: 2,
      },
      isFh: true,
    }
  }
}
</script>


