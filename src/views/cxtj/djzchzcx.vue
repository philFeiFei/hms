<template>
  <cxtjPublic :listQueryp='listQuery' :isDjzc='isDjzc'></cxtjPublic>
</template>
<script>
import cxtjPublic from './components/cxtjPublic'
export default {
  name: 'djzchzcx',
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
        querytype: 7,
      },
      isDjzc: true,
    }
  }
}
</script>


