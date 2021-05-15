async function getSlotInfo(key) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = async function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(key).innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "/garage/apislot/" + key, true);
  xhttp.send();
}
