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
      currentPage: this.page
    }
  },
  computed: {
    // 这种改变其实通过watch也可以。请看我对currentPage的watch方法。 pageSize仍然用computed方式。
    /* currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    }, */
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
    currentPage: function(newPage, oldPage) {
      console.log('oldPage is %s,newpage is %s', oldPage, newPage)
      this.$emit('update:page', newPage)
    }
  },
  methods: {
    // 下面当前页改变与一页的个数改变 都会触发父组件，调用父组件绑定的事件'pagination'，---》父组件这个事件其实就是进行了查询。
    handleSizeChange(val) { // 此时val就是当前分页的选择的一页的个数
      // this.$emit('pagination', { page: this.currentPage, limit: val }) //这是模版
      this.$emit('pagination')// 这是优化后的，这里的这个参数没必要传，因为这俩参数已经通过computed属性中set方法同步过去了。
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) { // 此时val就是当前页面页码
      this.$emit('pagination', { page: val, limit: this.pageSize })// 触发父组件事件’pagination‘，入参是后面对象
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
