<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /* currentPage: this.page */
    }
  },
  computed: {
    // 这种改变其实通过watch也可以。请看我对currentPage的watch方法。 pageSize仍然用computed方式。
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  watch: {
    /* currentPage: function (newPage, oldPage) {
      this.$emit('update:page', newPage)
    } */
  },
  methods: {
    handleSizeChange(val) { // 此时val就是当前分页的选择的一页的个数
      //this.$emit('pagination')// 不用触发事件了，此种分页方式是全部获取后台数据，前台进行计算分页
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) { // 此时val就是当前页面页码
      //this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
