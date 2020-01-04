<template>
  <ele-form :is-responsive="null"
            :is-show-reset-btn="true"
            :rules="rules"
            :form-desc="formDesc"
            :form-data="formData"
            :request-fn="handleRequest"></ele-form>
</template>

<script>
import { xadminGetOne, xadminUpdate, xadminCreate } from '@/api/common'
import { GetFormDataFromRes } from '@/utils'
export default {
  props: {
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    formDesc: {
      type: Object,
      default: function() {
        return {}
      }
    },
    modelPath: {
      type: String, default: ''
    },
    preSave: {
      type: Function,
      default: function(data) {
        return data
      }
    },
    afterGet: {
      type: Function,
      default: function(data) {
        return data
      }
    },
    listPage: {
      type: String,
      default: ''
    },
    createPage: {
      type: String,
      default: ''
    },
    editPage: {
      type: String,
      default: ''
    },
    modelName: {
      type: String,
      default: ''
    },
    excludeFields: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      id: 0, formData: {}
    }
  },
  watch: {
    id(newval, oldval) {
      if (newval > 0) {
        this.GetDetail()
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    }
  },
  methods: {
    GetDetail() {
      xadminGetOne(this.modelPath, this.id).then(r => {
        this.formData = GetFormDataFromRes(r.data, this.excludeFields)
      }, err => {
        if (err.response.status === 403) {
          this.$message({
            message: `您无权限修改${this.modelName}`,
            type: 'error'
          })
        } else {
          this.$message({
            message: `读取${this.modelName}信息失败`,
            type: 'error'
          })
        }
      })
    },
    handleRequest(data) {
      data = this.preSave(data)
      if (this.id === 0) {
        xadminCreate(this.modelPath, data).then(r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({
            name: this.editPage, params: { id: r.data.id }
          })
        })
      } else {
        xadminUpdate(this.modelPath, this.id, data).then(r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }, err => {
          if (err.response.status === 403) {
            this.$message({
              message: `您无权限修改${this.modelName}`,
              type: 'error'
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>
