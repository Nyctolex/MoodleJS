function saveData() {
    var username = document.getElementById("lusername").value;
    var id = document.getElementById("lid").value;
    var password = document.getElementById("lpassword").value;
    var autologin_value = document.getElementById("autologin").checked;

    data = {
        lusername: username,
        lid: id,
        lpassword: password,
        autologin: autologin_value
    }
    chrome.storage.sync.set(data, function() { });
}


function showSettings() {
    settingTab = document.getElementById("settingsTab");
        settingTab.style.maxHeight = "400px";
        arrow= document.getElementById("moreSettings");
        arrow.style.transition = '.4s';
        document.getElementById('moreSettingText').style.visibility = "hidden";
        arrow.style.webkitTransform = 'rotate(180deg)';
 
}
function toggleShowSettings() {
    settingTab = document.getElementById("settingsTab");
    if(settingTab.style.maxHeight == '' || settingTab.style.maxHeight =='0px') {

        settingTab.style.maxHeight = "400px";
        arrow= document.getElementById("moreSettings");
        arrow.style.transition = '.4s';
        document.getElementById('moreSettingText').style.visibility = "hidden";
        arrow.style.webkitTransform = 'rotate(180deg)';
    }
    else {
        settingTab.style.maxHeight = "0";
        arrow= document.getElementById("moreSettings");
        arrow.style.transition = '.5s';
        arrow.style.webkitTransform = 'rotate(0deg)';
    }
}

window.onload = function() {
    document.getElementById('moodleBtn').addEventListener("click", ()=> {window.open("https://moodle.tau.ac.il/login/index.php"); });
    document.getElementById('studentInfoBtn').addEventListener("click", ()=> {window.open("https://www.ims.tau.ac.il/Tal"); });
    document.getElementById('moreSettings').addEventListener("click", toggleShowSettings);

    chrome.storage.sync.get(function (result) { for (var k in result) { if (result.hasOwnProperty(k)) { if (k != "autologin") { document.getElementById(k).value = result[k]; } else { document.getElementById(k).checked = result[k]; } } } });
    chrome.storage.sync.get(function(result) { for(var k in result) { 
        if(result[k] == "" && k!= "autologin") {  
        console.log("expand");    
        document.getElementById("autologin").checked = false;
        saveData();
        showSettings();
    }   } });
    document.getElementById("autologin").addEventListener('change', saveData);
    document.getElementById("lusername").addEventListener('change', saveData);
    document.getElementById("lid").addEventListener('change', saveData);
    document.getElementById("lpassword").addEventListener('change', saveData);

};

