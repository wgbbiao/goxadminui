<template>
  <el-select v-model="sid"
             :remote-method="remoteMethod"
             :loading="loading"
             remote
             placeholder="输入用户昵称"
             filterable
             reserve-keyword
             @change="handleChange">
    <el-option v-for="(user, key) in filter_users"
               :key="key"
               :label="user.nickname"
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
    value: { type: Number, default: 0 },
    // value 是传递过来的值
    // desc是此组件的描述, 结构为
    // { style: {}, class: {}, on: {}, attrs: {} }
    desc: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      sid: '',
      loading: false,
      filter_users: [],
      newValue: this.value
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.sid)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        xadminList('models/User', { nickname__like: query }).then(r => {
          this.filter_users = r.list
          this.loading = false
        })
      }
    }
  }
}
</script>
