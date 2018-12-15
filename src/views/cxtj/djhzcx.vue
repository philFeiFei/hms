<template>
  <cxtjPublic :listQueryp='listQuery' :isDj='isDj'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'djhzcx',
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
        querytype: 5,
      },
      isDj: true,
    }
  }
}
</script>


