<template>
  <div class="app-container">
    <Edit :rules="rules"
          :form-desc="formDesc"
          :model-path="modelPath"></Edit>
  </div>
</template>
<script>
import Edit from '@/components/Xadmin/Edit'
// import { xadminList } from '@/api/common'
export default {
  components: { Edit },
  data() {
    return {
      modelPath: 'goxadmin/Permission',
      rules: {},
      formDesc: {
        name: {
          type: 'input',
          label: '名称'
        },
        code: {
          type: 'input',
          label: '权限'
        }
      }
    }
  }
}
</script>
