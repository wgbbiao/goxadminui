<template>
  <div class="app-container">
    <data-filter :form-desc="formDesc"
                 :rules="rules"
                 name="管理员"
                 create-page="CreateUser">
    </data-filter>
    <list name="管理员"
          style="margin-top:15px"
          model-path="goxadmin/User"
          :query="form"
          :columns="columns"
          edit-page="EditorUser">
    </list>
  </div>
</template>
<script>
import List from '@/components/Xadmin/List'
import DataFilter from '@/components/Xadmin/DataFilter'
import { parseTime } from '@/utils'
export default {
  components: {
    List, DataFilter
  },
  data() {
    return {
      rules: {},
      form: {},
      formDesc: {
        'username__like': {
          type: 'input',
          label: '呢称',
          attrs: {
            clearable: true
          }
        }
      },
      columns: [
        { id: 'username', label: '呢称' },
        {
          id: 'is_super', label: '是否是超级管理员', formatter: (row, column) => {
            if (row.is_super) {
              return this.$createElement('span', { 'class': 'el-icon-success' })
            } else {
              return this.$createElement('span', { 'class': 'el-icon-error' })
            }
          }
        },
        {
          id: 'created_at', label: '添加时间', formatter: (row, column) => {
            if (row.created_at == null) {
              return 'null'
            } else {
              return parseTime(row.created_at)
            }
          }
        }
      ]
    }
  }
}
</script>
