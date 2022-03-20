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
    chrome.storage.sync.set(data, function () {
        console.log("Value is set to " + data);
    });
}


window.onload = function () {
    chrome.storage.sync.get(function (result) {
        for (var k in result) {
            if (result.hasOwnProperty(k)) {

                if (k != "autologin") {
                    document.getElementById(k).value = result[k];
                } else {
                    document.getElementById(k).checked = result[k];
                }

            }
        }
    });
    document.getElementById("autologin").addEventListener('change', saveData);
    document.getElementById("lusername").addEventListener('change', saveData);
    document.getElementById("lid").addEventListener('change', saveData);
    document.getElementById("lpassword").addEventListener('change', saveData);

};
