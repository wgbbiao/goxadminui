<template>
  <div class="app-container">
    <data-filter :form-desc="formDesc"
                 :rules="rules"
                 name="角色"
                 create-page="CreatePermission" />
    <list name="角色"
          style="margin-top:15px"
          model-path="goxadmin/Permission"
          :query="form"
          :columns="columns"
          :preloads="['ContentType']"
          edit-page="EditPermission" />
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
        'name__like': {
          type: 'input',
          label: '名称',
          attrs: {
            clearable: true
          }
        }
      },
      columns: [
        { id: 'name', label: '名称' },
        { id: 'code', label: '权限' },
        {
          id: 'content_type.model', label: '权限', formatter: (row, column) => {
            return `${row.content_type.app_label}.${row.content_type.model}`
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
