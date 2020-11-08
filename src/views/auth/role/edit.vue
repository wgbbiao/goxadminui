<template>
  <div class="app-container">
    <Edit :rules="rules"
          :form-desc="formDesc"
          :model-path="modelPath"
          :preloads="['Permissions']"
          edit-page="EditRole"
          create-page="CreateRole"
          :pre-save="preSave" />
  </div>
</template>
<script>
import Edit from '@/components/Xadmin/Edit'
import { xadminList } from '@/api/common'
export default {
  components: { Edit },
  data() {
    return {
      modelPath: 'goxadmin/Role',
      rules: {},
      formDesc: {
        name: {
          type: 'input',
          label: '名称',
          required: true
        },
        permissions: {
          type: 'transfer',
          label: '权限',
          required: true,
          options() {
            return new Promise((resolve, reject) => {
              xadminList('goxadmin/Permission', { '__all__': true }).then(res => {
                const data = []
                res.list.forEach(p => {
                  data.push({
                    key: p.id,
                    label: p.name
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
  },
  methods: {
    preSave(data) {
      if (data.permissions && data.permissions.length > 0) {
        var permissions = []
        data.permissions.forEach(id => {
          permissions.push({ id: id })
        })
        data.permissions = permissions
      }
      return data
    }
  }
}
</script>
