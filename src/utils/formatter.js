export default {
  TrueOrFalse(bl) {
    if (bl) {
      return this.$createElement('span', { 'class': 'el-icon-success', style: 'color:#67C23A' })
    } else {
      return this.$createElement('span', { 'class': 'el-icon-error' })
    }
  }
}
