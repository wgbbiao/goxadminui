<template>
  <el-card :body-style="{ padding: '5px',position:'relative' }">
    <ele-form :inline="true"
              :is-responsive="null"
              :is-show-reset-btn="true"
              :rules="rules"
              :form-desc="formDesc"
              :form-data="formData"
              :request-fn="handleRequest"
              class="datafilter"></ele-form>
    <el-button v-if="createPage!==''"
               v-permission="genPers([PolicyCreate])"
               style="position: absolute;top:5px;right: 15px;"
               type="primary"
               @click="Create">添加{{ name }}</el-button>
  </el-card>
</template>
<script>
import defaultSettings from '@/settings'
const { PolicyCreate } = defaultSettings
export default {
  props: {
    formDesc: {
      type: Object,
      default: function() {
        return {}
      }
    },
    name: {
      type: String,
      default: '记录'
    },
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    createPage: {
      type: String, default: ''
    }
  },
  data() {
    return {
      PolicyCreate,
      formData: {}
    }
  },
  mounted() {
    this.formData = Object.assign({}, this.$route.query)
  },
  methods: {
    handleRequest(data) {
      const query = Object.assign({}, this.$route.query, data)
      const params = {}
      for (const [key, value] of Object.entries(query)) {
        params[key] = typeof value === 'boolean' ? Number(value) : value
      }
      this.$router.replace({ name: this.$route.name, query: params }).catch(err => {
        console.log('输出报错', err)
      })
    },
    Create() {
      console.log('dd')
      this.$router.push({ name: this.createPage })
    },
    genPers(perms) {
      return { perms, appLabel: this.$route.meta.appLabel || '' }
    }
  }
}
</script>
