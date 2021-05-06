export default {
  width: '100%',
  height: 500,
  path: `${process.env.BASE_URL}editormd/lib/`, // lib文件夹的地址
  pluginPath: '', // plugins文件夹的地址，空则是和lib文件夹同级
  placeholder: '请输入内容...',
  // syncScrolling: 'single',
  tabSize: 2,
  indentUnit: 2,
  fontSize: '14px',
  saveHTMLToTextarea: true, // 开启即可
  imageUpload: true,
  imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
  imageUploadURL: process.env.VUE_APP_IMG_UPLOAD, // 图片上传的接口地址
  fileUpload: true,
  fileFormats: ["doc", "docx", "xls", "xlsx", "html", "java", "js", "pdf", "ppt", "pptx", "tar", "txt", "zip"],
  fileUploadURL: process.env.VUE_APP_FILE_UPLOAD, // 附件上传的接口地址
  emoji: true,
  toolbarAutoFixed: false,
  toolbarIcons: 'full' // 全部工具按钮在下方
}
// [
//   "undo", "redo", "|",
//   "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
//   "h1", "h2", "h3", "h4", "h5", "h6", "|",
//   "list-ul", "list-ol", "hr", "|",
//   "link", "reference-link", "image", "file", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
//   "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
//   "help", "info"
// ]
