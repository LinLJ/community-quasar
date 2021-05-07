<template>
  <div :id="editorId" />
</template>

<script>
import config from './config'
import { getGUID } from '@/utils/validate'

export default {
  name: 'TdfMdEditor',
  props: {
    initMdContent: { // 初始化数据，markdown文档内容
      type: String,
      default: ''
    },
    config: { // 配置对象
      type: Object,
      default: () => {}
    },
    onChange: { // change事件监听函数，第一个参数为markdown文档内容，第二个参数为html文档内容
      type: Function
    }
  },
  data() {
    return {
      editorId: getGUID(),
      editor: null,
      editorConfig: { ...config, ...this.config }
    }
  },
  mounted() {
    this.editor = window.editormd(this.editorId, this.editorConfig)
    this.editor.on('load', () => {
      this.initMdContent && this.editor.setValue(this.initMdContent)
    })
    this.onChange && this.editor.on('change', () => {
      this.onChange(this.editor.getValue(), this.editor.getHTML())
    })
    this.editor.on('load', () => {
        window.editormd.loadPlugin(`${process.env.BASE_URL}editormd/plugins/image-handle-paste/image-handle-paste`, () => {
          this.editor.imagePaste() // 开启图片粘贴功能
        })
    })
  },
  beforeDestroy() {
    this.editor.off('load')
    this.editor.off('change')
    this.editor.off('load')
  },
  methods: {
    getValue() { // 获取markdown文档内容
      return this.editor.getValue()
    },
    setValue(val) { // 设置markdown文档内容
      return this.editor.setValue(val)
    },
    clear() { // 清空
      this.editor.clear()
    },
    insertValue(val) { // 当前光标处插入markdown文档内容
      this.editor.insertValue(val)
    },
    getHTML() { // 获取html内容
      return this.editor.getHTML()
    }
  }
}
</script>
<style lang="scss" scoped>
.editormd-fullscreen {
  z-index: 2;
}
</style>
