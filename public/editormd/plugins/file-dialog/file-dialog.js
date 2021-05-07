/*!
 * file (upload) dialog plugin for Editor.md
 *
 * @file        file-dialog.js
 * @author      lym
 * @version     1.0.0
 * @updateTime  2019-04-10
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  var factory = function (exports) {

    var pluginName   = "file-dialog";

    exports.fn.fileDialog = function() {

      var _this       = this;
      var cm          = this.cm;
      var lang        = this.lang;
      var editor      = this.editor;
      var settings    = this.settings;
      var cursor      = cm.getCursor();
      var selection   = cm.getSelection();
      var fileLang   = lang.dialog.file;
      var classPrefix = this.classPrefix;
      var iframeName  = classPrefix + "file-iframe";
      var dialogName  = classPrefix + pluginName, dialog;

      cm.focus();

      var loading = function(show) {
        var _loading = dialog.find("." + classPrefix + "dialog-mask");
        _loading[(show) ? "show" : "hide"]();
      };

      if (editor.find("." + dialogName).length < 1)
      {
        var guid   = (new Date).getTime();
        var action = settings.fileUploadURL + (settings.fileUploadURL.indexOf("?") >= 0 ? "&" : "?") + "guid=" + guid;

        if (settings.crossDomainUpload)
        {
          action += "&callback=" + settings.uploadCallbackURL + "&dialog_id=editormd-file-dialog-" + guid;
        }

        var dialogContent = ( (settings.fileUpload) ? "<form target=\"" + iframeName + "\" method=\"post\" enctype=\"multipart/form-data\" class=\"" + classPrefix + "form\">" : "<div class=\"" + classPrefix + "form\">" ) +
          ( (settings.fileUpload) ? "<div name=\"" + iframeName + "\" id=\"" + iframeName + "\" guid=\"" + guid + "\"></div>" : "" ) +
          "<label>" + fileLang.url + "</label>" +
          "<input type=\"text\" data-url />" + (function(){
            return (settings.fileUpload) ? "<div class=\"" + classPrefix + "file-input\">" +
              "<input type=\"file\" id=\"fileId\" name=\"" + classPrefix + "file\" accept=\"*\" />" +
              "<input type=\"button\" class=\"editormd-btn\" value=\"" + fileLang.uploadButton + "\" />" +
              "</div>" : "";
          })() +
          "<br/>" +
          "<label>" + fileLang.alt + "</label>" +
          "<input type=\"text\" id=\"file-desc\" value=\"" + selection + "\" data-alt />" +
          "<br/>" +
          ( (settings.fileUpload) ? "</form>" : "</div>");

        //var fileFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "file-manager-btn\" style=\"float:left;\">" + fileLang.managerButton + "</button>";

        dialog = this.createDialog({
          title      : fileLang.title,
          width      : (settings.fileUpload) ? 465 : 380,
          height     : 210,
          name       : dialogName,
          content    : dialogContent,
          mask       : settings.dialogShowMask,
          drag       : settings.dialogDraggable,
          lockScreen : settings.dialogLockScreen,
          maskStyle  : {
            opacity         : settings.dialogMaskOpacity,
            backgroundColor : settings.dialogMaskBgColor
          },
          buttons : {
            enter : [lang.buttons.enter, function() {
              var url  = this.find("[data-url]").val();
              var alt  = this.find("[data-alt]").val();

              if (url === "")
              {
                alert(fileLang.fileURLEmpty);
                return false;
              }

              var altAttr = (alt !== "") ? " \"" + alt + "\"" : "";

              cm.replaceSelection("[" + alt + "](" + url + ")");

              if (alt === "") {
                cm.setCursor(cursor.line, cursor.ch + 2);
              }

              this.hide().lockScreen(false).hideMask();

              return false;
            }],

            cancel : [lang.buttons.cancel, function() {
              this.hide().lockScreen(false).hideMask();

              return false;
            }]
          }
        });

        dialog.attr("id", classPrefix + "file-dialog-" + guid);

        if (!settings.fileUpload) {
          return ;
        }

        var fileInput  = dialog.find("[name=\"" + classPrefix + "file\"]");

        fileInput.bind("change", function() {
          var fileName  = fileInput.val();
          $("#file-desc").val(fileName.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1")) // 截取文件名;
          var isFile   = new RegExp("(\\.(" + settings.fileFormats.join("|") + "))$");

          if (fileName === "")
          {
            alert(fileLang.uploadFileEmpty);

            return false;
          }

          if (!isFile.test(fileName))
          {
            alert(fileLang.formatNotAllowed + settings.fileFormats.join(", "));

            return false;
          }

          loading(true);

          var submitHandler = function() {

            var uploadIframe = document.getElementById('fileId');

            var file = uploadIframe.files[0];

            var forms = new FormData(document.forms[0]); //Filename
            forms.append(classPrefix + "file", file); // 文件

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
            _ajax(settings.fileUploadURL, forms, function(ret){
              if(ret.success == 1){
                $("." + classPrefix + "file-dialog").find("input[data-url]").val(ret.url);
                loading(false);
              }
            })
          };

          dialog.find("[type=\"button\"]").bind("click", submitHandler).trigger("click");
        });
      }

      dialog = editor.find("." + dialogName);
      dialog.find("[type=\"text\"]").val("");
      dialog.find("[type=\"file\"]").val("");

      this.dialogShowMask(dialog);
      this.dialogLockScreen();
      dialog.show();

    };

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
