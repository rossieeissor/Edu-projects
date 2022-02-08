function ajax(url, method, functionName, dataObject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open(method, url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.responseType = "json";
  xhttp.send(requestData(dataObject));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      functionName(this.response);
    }
  };
}

function requestData(dataObj) {
  let out = "";
  for (let key in dataObj) {
    out += [key, "=", dataObj[key], "&"].join("");
  }
  return out.slice(0, -1);
}
