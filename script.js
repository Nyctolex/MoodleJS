function saveData() {
  var username = document.getElementById("lusername").value;
  var id = document.getElementById("lid").value;
  var password = document.getElementById("lpassword").value;
  var autologin_value = document.getElementById("autologin").checked;

  data = {
    lusername: username,
    lid: id,
    lpassword: password,
    autologin: autologin_value,
  };
  chrome.storage.sync.set(data, function () {});
}

function render_page() {
  activated_txt = document.getElementById("activated_txt");
  console.log(document.getElementById("autologin").checked);
  if (document.getElementById("autologin").checked) {
    activated_txt.textContent = "ON";
  } else {
    activated_txt.textContent = "OFF";
  }
}

function showSettings() {
  settingTab = document.getElementById("settingsTab");
  settingTab.style.maxHeight = "400px";
  arrow = document.getElementById("moreSettings");
  arrow.style.transition = ".4s";
  document.getElementById("moreSettingText").style.visibility = "hidden";
  arrow.style.webkitTransform = "rotate(180deg)";
}
function toggleShowSettings() {
  settingTab = document.getElementById("settingsTab");
  if (settingTab.style.maxHeight == "" || settingTab.style.maxHeight == "0px") {
    settingTab.style.maxHeight = "400px";
    arrow = document.getElementById("moreSettings");
    arrow.style.transition = ".4s";
    document.getElementById("moreSettingText").style.visibility = "hidden";
    arrow.style.webkitTransform = "rotate(180deg)";
  } else {
    settingTab.style.maxHeight = "0";
    arrow = document.getElementById("moreSettings");
    arrow.style.transition = ".5s";
    arrow.style.webkitTransform = "rotate(0deg)";
  }
}
// open a new tab in a new window if the current one is empty. ow it opens it in the current window
function openTab(newUrl){
  var query = { active: true, currentWindow: true };
  chrome.tabs.query(query, (tabs)=>{
    currentTab = tabs[0];
    currentTabUrl = currentTab.url
    // open it in current tab if this is an empty tab
    if (currentTabUrl.includes("newtab")){
      chrome.tabs.update({ url:  newUrl});
    } else{
      //open it in a new current tab if this is not empty tab
      window.open(newUrl);
    }
  });

}

window.onload = function () {

  //moodle button
  console.log("Button");
  document.getElementById("moodleBtn").addEventListener("click", () => {
    openTab("https://moodle.tau.ac.il/login/index.php");
  });
  //Student info button
  document.getElementById("studentInfoBtn").addEventListener("click", () => {
    openTab("https://www.ims.tau.ac.il/Tal");
  });
  //more Settings
  document
    .getElementById("moreSettings")
    .addEventListener("click", toggleShowSettings);

  chrome.storage.sync.get(function (result) {
    for (var k in result) {
      if (result.hasOwnProperty(k)) {
        if (k != "autologin") {
          document.getElementById(k).value = result[k];
        } else {
          document.getElementById(k).checked = result[k];
          render_page();
        }
      }
    }
  });
  chrome.storage.sync.get(function (result) {
    for (var k in result) {
      if (result[k] == "" && k != "autologin") {
        console.log("expand");
        document.getElementById("autologin").checked = false;
        saveData();
        showSettings();
      }
    }
  });

  document.getElementById("autologin").addEventListener("change", render_page);
  document.getElementById("autologin").addEventListener("change", saveData);
  document.getElementById("lusername").addEventListener("change", saveData);
  document.getElementById("lid").addEventListener("change", saveData);
  document.getElementById("lpassword").addEventListener("change", saveData);
};
