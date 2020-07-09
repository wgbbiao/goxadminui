<template>
  <el-select v-model="newValue"
             :remote-method="remoteMethod"
             :loading="loading"
             remote
             :placeholder="desc.attrs.placeholder"
             filterable
             reserve-keyword
             @change="handleChange">
    <el-option v-for="(user, key) in filter_users"
               :key="key"
               :label="user.mobile"
               :value="user.id" />
  </el-select>
</template>
<script>
import { xadminList } from '@/api/common'
import formMixin from 'vue-ele-form/lib/mixins/formMixin'
export default {
  name: 'UserAutocomplate',
  componentName: 'UserAutocomplate',
  mixins: [formMixin],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: { type: Number, default: null }
  },
  data() {
    return {
      loading: false,
      filter_users: [],
      newValue: ''
    }
  },
  methods: {
    remoteMethod(query) {
      this.sid = ''
      if (query !== '') {
        this.loading = true
        xadminList('models/User', { mobile__like: query }).then(r => {
          this.filter_users = r.list
          this.loading = false
        })
      }
    }
  }
}
</script>
