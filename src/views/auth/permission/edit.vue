<template>
  <div class="app-container">
    <Edit :rules="rules"
          create-page="CreatePermission"
          :form-desc="formDesc"
          :model-path="modelPath" />
  </div>
</template>
<script>
import Edit from '@/components/Xadmin/Edit'
import { xadminList } from '@/api/common'
export default {
  components: { Edit },
  data() {
    return {
      modelPath: 'goxadmin/Permission',
      rules: {},
      formDesc: {
        name: {
          type: 'input',
          label: '名称',
          required: true
        },
        code: {
          type: 'input',
          label: '权限',
          required: true
        },
        content_type_id: {
          type: 'select',
          required: true,
          label: '文档类型',
          options() {
            return new Promise((resolve, reject) => {
              xadminList('goxadmin/ContentType', { '__all__': true }).then(res => {
                const data = []
                res.list.forEach(p => {
                  console.log(p)
                  data.push({
                    value: p.id,
                    text: `${p.app_label}.${p.model}`
                  })
                })
                resolve(data)
              }).catch(err => {
                reject(err.data)
              })
            })
          }
        }
      }
    }
  }
}
</script>
