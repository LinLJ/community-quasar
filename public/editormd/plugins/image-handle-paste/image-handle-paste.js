/*!
 * file (upload) dialog plugin for Editor.md
 *
 * @file        file-dialog.js
 * @author      wyc
 * @version     1.0.0
 * @updateTime  2019-06-04
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  var factory = function (exports) {
    var $            = jQuery;           // if using module loader(Require.js/Sea.js).
    var pluginName   = "image-handle-paste";  // 定义插件名称

    //图片粘贴上传方法
    exports.fn.imagePaste = function() {
      var _this       = this;
      var cm          = _this.cm;
      var settings    = _this.settings;
      var editor      = _this.editor;
      var classPrefix = _this.classPrefix;
      var id          = _this.id;
      _this.pasteFlag = 1;
      // _this.delayTime = 1000;
      var timeId      = undefined;
      var delayTime   = 5000;

      if(!settings.imageUpload || !settings.imageUploadURL){
        console.log('你还未开启图片上传或者没有配置上传地址');
        return false;
      }

      //监听粘贴板事件
      $('#' + id).on('paste', function (e) {
        if(_this.pasteFlag === 1) {
          var items = (e.clipboardData || e.originalEvent.clipboardData).items;

          //判断图片类型
          if (items && items[0].type.indexOf('image') > -1) {

            var file = items[0].getAsFile();
            var forms = new FormData(document.forms[0]); //Filename
            forms.append(classPrefix + "image-file", file); // 文件

            _ajax(settings.imageUploadURL, forms, function(ret){
              if(ret.success == 1){
                cm.replaceSelection("![](" + ret.url  + ")");
              }
            })
          }
          _this.pasteFlag = 0
        } else {
          // debounce(setFlag, _this) // xswl
          if(timeId) {
            return
          } else {
            timeId = setTimeout(() => {
              setFlag.call(_this)
              clearTimeout(timeId)
              timeId = undefined
            }, delayTime)
          }
        }
      })
    };
    var _ajax = function(url, data, callback) {
      $.ajax({
        "type": 'post',
        "cache": false,
        "url": url,
        "data": data,
        "dateType": "json",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        success: function(ret){
          callback(JSON.parse(ret));
        },
        error: function (err){
          console.log('请求失败')
        }
      })
    }
    // var debounce = function (method, context) { // 配合上面注释为xswl的代码使用
    //   method.tId && clearTimeout(method.tId)
    //   method.tId = setTimeout(() => {
    //     method.call(context)
    //     delete method.tId
    //   }, context.delayTime)
    // }
    var setFlag = function () {
      this.pasteFlag = 1
    }
  };

  // CommonJS/Node.js
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
  {
    module.exports = factory;
  }
  else if (typeof define === "function")  // AMD/CMD/Sea.js
  {
    if (define.amd) { // for Require.js

      define(["editormd"], function(editormd) {
        factory(editormd);
      });

    } else { // for Sea.js
      define(function(require) {
        var editormd = require("./../../editormd");
        factory(editormd);
      });
    }
  }
  else
  {
    factory(window.editormd);
  }

})();
