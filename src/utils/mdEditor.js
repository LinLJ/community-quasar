const route = ['/blog/new', '/blog/edit', 'blog/view', 'forum/postView', 'faq/view', '/forum/post/new',
    '/forum/post/edit', '/faq/new', '/faq/edit', '/faq/answer/edit'] // 使用editor的路由，需要删除依赖

const jsDependencies = [
  `${process.env.BASE_URL}editormd/lib/codemirror/codemirror.min.js`,
  `${process.env.BASE_URL}editormd/lib/codemirror/modes.min.js`,
  `${process.env.BASE_URL}editormd/lib/codemirror/addons.min.js`,
  `${process.env.BASE_URL}editormd/lib/marked.min.js`,
  `${process.env.BASE_URL}editormd/lib/prettify.min.js`
  // 不开启流程图等功能时不需要引入
  // `${process.env.BASE_URL}editormd/lib/raphael.min.js`,
  // `${process.env.BASE_URL}editormd/lib/sequence-diagram.min.js`,
  // `${process.env.BASE_URL}editormd/lib/underscore.min.js`,
  // `${process.env.BASE_URL}editormd/lib/flowchart.min.js`,
  // `${process.env.BASE_URL}editormd/lib/jquery.flowchart.min.js`
]
const cssDependencies = [
  `${process.env.BASE_URL}editormd/lib/codemirror/codemirror.min.css`,
  `${process.env.BASE_URL}editormd/lib/codemirror/addon/dialog/dialog.css`,
  `${process.env.BASE_URL}editormd/lib/codemirror/addon/search/matchesonscrollbar.css`
]

// 目前editormd单页应用时重复加载依赖资源，去掉自动加载又会有其他问题
// 组件销毁前移除资源，当页面多个组件时其他组件失效
// hack只能在路由跳转时判断，离开的路由使用了editor.md组件，销毁依赖
function delDependencies() {
  const $ = window.jQuery
  $('head link[type="text/css"]').each(function() {
    if (cssDependencies.includes($(this).attr('href'))) {
      $(this).remove()
    }
  })
  $('head script[type="text/javascript"]').each(function() {
    if (jsDependencies.includes($(this).attr('src'))) {
      $(this).remove()
    }
  })
}

export default function(path) {
  for (let i = 0, len = route.length; i < len; i++) {
    if (path.startsWith(route[i])) {
      delDependencies()
    }
  }
}
