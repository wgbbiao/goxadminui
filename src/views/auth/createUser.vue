<template>
  <div class="app-container">
    <Edit :rules="rules"
          :form-desc="formDesc"
          :model-path="modelPath"
          :pre-save="preSave"></Edit>
  </div>
</template>
<script>
import Edit from '@/components/Xadmin/Edit'
import { xadminList } from '@/api/common'
export default {
  components: { Edit },
  data() {
    return {
      modelPath: 'goxadmin/User',
      rules: {},
      formDesc: {
        username: {
          type: 'input',
          label: '用户名'
        },
        is_super: {
          type: 'switch',
          label: '超级管理员'
        },
        roles: {
          type: 'transfer',
          label: '角色',
          options() {
            return new Promise((resolve, reject) => {
              xadminList('goxadmin/Role', { '__all__': true }).then(res => {
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
        },
        permissions: {
          type: 'transfer',
          label: '角色',
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
      if (data.permissions.length > 0) {
        var permissions = []
        data.permissions.forEach(id => {
          permissions.push({ id: id })
        })
        data.permissions = permissions
      }
      if (data.roles.length > 0) {
        var roles = []
        data.roles.forEach(role => {
          roles.push({ id: role })
        })
        data.roles = roles
      }
      return data
    }
  }
}
</script>
