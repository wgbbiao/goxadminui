<template>
  <div>
    <el-table ref="table"
              v-loading="loading"
              :data="list"
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
                       :width="actions.length>0 ? 151: 110"
                       label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button v-if="canCreate"
                       size="mini"
                       type="primary"
                       icon="el-icon-edit"
                       @click="handleUpdate(scope.row)"></el-button>
            <el-button v-if="canDelete"
                       size="mini"
                       type="primary"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row)"></el-button>
            <el-dropdown v-if="actions.length>0"
                         trigger="click"
                         @command="handleCommand">
              <el-button type="primary"
                         size="mini"
                         icon="el-icon-menu"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(act,key) in actions"
                                  :key="key"
                                  :command="()=>act.handel(scope.row)">{{ act.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total"
                   :current-page.sync="$route.query.page"
                   :page-size="20"
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
    },
    preloads: {
      type: Array,
      default: function() {
        return []
      }
    },
    actions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      page: 1, loading: false
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
    handleCommand(f) {
      // console.log('handleCommand')
      f()
    },
    GetList() {
      const query = Object.assign({}, this.$route.query)
      if (this.preloads.length > 0) {
        query.preloads = this.preloads.join(',')
      }
      this.loading = true
      xadminList(this.modelPath, query).then(res => {
        this.list = res.list
        this.total = res.total
        this.loading = false
      })
    },
    handleUpdate(obj) {
      this.$router.push({
        name: this.editPage, params: { id: obj.id }
      })
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
