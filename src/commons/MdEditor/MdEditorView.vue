<template>
  <div :id="viewId" />
</template>

<script>
import { getGUID } from '@/utils/validate'

export default {
  name: 'MdEditorView',
  props: {
    mdContent: { // 需要显示的markdown文档
      type: String,
      required: true,
      default: ''
    },
    config: { // 配置对象
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      viewId: getGUID(),
      viewConfig: {
        gfm: true,
        toc: true,
        tocm: false,
        tocStartLevel: 1,
        tocTitle: '目录',
        tocDropdown: false,
        tocContainer: '',
        markdown: this.mdContent,
        markdownSourceCode: false,
        htmlDecode: 'style,script,iframe',
        autoLoadKaTeX: true,
        pageBreak: true,
        atLink: true, // for @link
        emailLink: true, // for mail address auto link
        tex: false,
        taskList: false, // Github Flavored Markdown task lists
        emoji: true,
        flowChart: false,
        sequenceDiagram: false,
        previewCodeHighlight: true,
        ...this.config
      },
      viewInstance: null
    }
  },
  mounted() {
    this.viewInstance = window.editormd.markdownToHTML(this.viewId, this.viewConfig)
  },
  watch: {
    mdContent(val) {
      this.viewInstance.empty()
      this.viewInstance.attr('class', '')
      this.viewInstance = window.editormd.markdownToHTML(this.viewId, {...this.viewConfig, markdown: val})
    }
  }
}
</script>
<style lang="scss" scoped>
.editormd-html-preview {
  font-size: 16px;
}
</style>

