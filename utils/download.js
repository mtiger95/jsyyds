"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.resolveBlob = resolveBlob;
var mimeMap = {
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  zip: "application/zip",
  normal: ""
};
/**
 * @description 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */

function resolveBlob(res) {
  var mimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mimeMap.xlsx;
  var aLink = document.createElement("a");
  var blob = new Blob([res.data], {
    type: mimeType
  }); // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;

  var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
  var contentDisposition = decodeURI(res.headers["content-disposition"]);
  var result = patt.exec(contentDisposition) || [];
  var fileNameRes = result[1];
  var fileName = fileNameRes.replace(/"/g, "");
  var downloadUrl = window.URL.createObjectURL(blob);
  aLink.href = downloadUrl;
  aLink.setAttribute("download", fileName); // 设置下载文件名称

  document.body.appendChild(aLink);
  aLink.click();
  window.URL.revokeObjectURL(downloadUrl);
  document.body.removeChild(aLink);
}

var _default = {
  resolveBlob: resolveBlob
};
exports["default"] = _default;