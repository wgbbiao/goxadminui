<template>
  <div>
    <el-table :data="list"
              border
              stripe>
      <el-table-column v-for="col in columns"
                       :key="col.id"
                       :prop="col.id"
                       :label="col.label"
                       :width="col.width"
                       :formatter="col.formatter">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button v-if="canCreate"
                     size="mini"
                     type="text"
                     @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="canDelete"
                     size="mini"
                     type="text"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total"
                   :current-page.sync="query.page"
                   :page-size="100"
                   background
                   layout="total, prev, pager, next"
                   class="pagination"
                   @current-change="GetList" />
  </div>
</template>
<script>
import { xadminList, xadminDelete } from '@/api/common'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    modelPath: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      default: function() {
        return {}
      }
    },
    canCreate: {
      type: Boolean,
      default: true
    },
    canDelete: {
      type: Boolean,
      default: true
    },
    createPage: {
      type: String,
      default: ''
    },
    editPage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      total: 0, page: 1
    }
  },
  watch: {
    '$route'() {
      this.GetList()
    }
  },
  mounted() {
    this.GetList()
  },
  methods: {
    GetList() {
      xadminList(this.modelPath, this.$route.query).then(res => {
        this.list = res.list
        this.total = res.total
      })
    },
    handleUpdate(obj) {
      this.$router.push({ name: this.editPage, params: { id: obj.id }})
    },
    handleDelete(obj) {
      this.$confirm('此操作将永久删除该' + this.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        xadminDelete(this.modelPath, obj.id).then(r => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.GetList()
        }, () => {
          this.$message({
            message: '删除失败',
            type: 'fail'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
