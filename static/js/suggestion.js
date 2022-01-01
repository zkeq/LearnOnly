var suggestContainer = document.getElementsByClassName("suggest")[0];
var searchInput = document.getElementsByClassName("search-input-text")[0];
var searchResult = document.getElementById("search-result");
// 清除建议框内容
function clearContent() {
  var size = searchResult.childNodes.length;
  for (var i = size - 1; i >= 0; i--) {
    searchResult.removeChild(searchResult.childNodes[i]);
  }
};

var timer = null;
// 注册输入框键盘抬起事件
searchInput.onkeyup = function (e) {
  suggestContainer.style.display = "block";
  // 如果输入框内容为空 清除内容且无需跨域请求
  if (this.value.length === 0) {
    clearContent();
    return;
  }
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (e.keyCode !== 40 && e.keyCode !== 38) {
    // 函数节流优化
    this.timer = setTimeout(() => {
      // 创建script标签JSONP跨域
      var script = document.createElement("script");
      script.src = "https://www.baidu.com/su?&wd=" + encodeURI(this.value.trim()) +
        "&p=3&cb=handleSuggestion";
      document.body.appendChild(script);
    }, 130)
  }

};

// 回调函数处理返回值
function handleSuggestion(res) {
  // 清空之前的数据！！
  clearContent();
  var result = res.s;
  // 截取前五个搜索建议项
  if (true) {
    result = result
  }
  console.log(result)
  for (let i = 0; i < result.length; i++) {
    // 动态创建li标签
    var liObj = document.createElement("li");
    liObj.innerHTML = result[i];
    searchResult.appendChild(liObj);
  }
  // 自执行匿名函数--删除用于跨域的script标签
}
