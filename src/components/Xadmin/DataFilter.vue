<template>
  <el-card :body-style="{ padding: '5px' }">
    <el-row :gutter="20"
            justify="space-between"
            type="flex">
      <el-col>
        <ele-form :inline="true"
                  :is-responsive="null"
                  :is-show-reset-btn="true"
                  :rules="rules"
                  :form-desc="formDesc"
                  :form-data="formData"
                  :request-fn="handleRequest"
                  class="datafilter"></ele-form>
      </el-col>
      <el-col style="text-align:right">
        <el-button v-permission="genPers([PolicyCreate])"
                   type="primary"
                   @click="Create">添加{{ name }}</el-button>
      </el-col>
    </el-row>
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
      this.$router.replace({ name: this.$route.name, query })
    },
    Create() {
      this.$router.push({ name: this.createPage })
    },
    genPers(perms) {
      return { perms, appLabel: this.$route.meta.appLabel || '' }
    }
  }
}
</script>
<style>
.datafilter .el-form-item {
  margin-bottom: 0;
}
</style>
