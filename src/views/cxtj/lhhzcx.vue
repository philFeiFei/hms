<template>
  <cxtjPublic :listQueryp='listQuery' :isLh='isLh'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'lhhzcx',
  components: { cxtjPublic },
  data() {
    return {
      listQuery: {
        smqsrq: null,
        smzzrq: null,
        lhsj: null,
        ddbh: null,
        sh: null,
        wdcc: null,
        wdks: null,
        fc: null,
        lhr: null,
        querytype: 1,
      },
      isLh: true,
    }
  }
}
</script>


