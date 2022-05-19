
export default {
  formatBoolean({ cellValue }) { // 根据布尔值返回是否
    if (cellValue === true) {
      return '是'
    } else if (cellValue === false) {
      return '否'
    }
  }
}
