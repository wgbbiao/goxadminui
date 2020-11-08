<template>
  <ele-form v-model="formData"
            v-bind="formConfig"
            :request-fn="handleRequest"
            :form-btns="formBtns"
            @request-success="handleRequestSuccess" />
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
    },
    preloads: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      id: 0,
      formData: {},
      formConfig: {
        isShowResetBtn: true,
        submitBtnText: '保存',
        formDesc: this.formDesc
      },
      act_type: 'back',
      formBtns: [
        {
          text: '保存并增加另一个',
          type: 'default',
          attrs: {
            disabled: false
          },
          click: () => {
            this.act_type = 'create'
            this.saveData()
          }
        },
        {
          text: '保存并继续编辑',
          type: 'default',
          attrs: {
            disabled: false
          },
          click: () => {
            this.act_type = 'continue'
            this.saveData()
          }
        }
      ]
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
      this.act_type = 'back'
      const params = {}
      if (this.preloads.length > 0) {
        params.preloads = this.preloads.join(',')
      }
      xadminGetOne(this.modelPath, this.id, params).then(r => {
        this.formData = GetFormDataFromRes(this.afterGet(r.data), this.excludeFields)
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
    saveData() {
      this.handleRequest(this.formData)
    },
    handleRequestSuccess() {
      console.log('123')
    },
    handleRequest(data) {
      data = this.preSave(data)
      if (this.id === 0) {
        xadminCreate(this.modelPath, data).then(r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.act_type === 'back') {
            this.$router.back()
          } else if (this.act_type === 'create') {
            this.formData = {}
          } else if (this.act_type === 'continue') {
            if (this.editPage !== '') {
              this.$router.replace({
                name: this.editPage,
                params: { id: r.data.id }
              })
            } else {
              // 新建
              this.formData = {}
              // this.$route.back()
            }
          }
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
      } else {
        xadminUpdate(this.modelPath, this.id, data).then(r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.act_type === 'back') {
            this.$router.back()
          } else if (this.act_type === 'create') {
            console.log(this.createPage)
            this.$router.replace({
              name: this.createPage
            })
          } else if (this.act_type === 'continue') {
            this.GetDetail()
          }
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
