window.onload = function () {
    chrome.storage.sync.get(function (result) {
        if (result.autologin) {
            url = document.URL
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            if (url.endsWith("moodle.tau.ac.il/my")) {
                if (document.getElementsByClassName("btn btn-info").length > 0) {
                    document.location.href = "https://moodle.tau.ac.il/login/index.php";
                }
            }
            if (url.endsWith("moodle.tau.ac.il")) {
                document.location.href = "https://moodle.tau.ac.il/login/index.php";
            } else {
                if (url.endsWith("ims.tau.ac.il/Tal")) {
                    const userBox = document.getElementsByName("txtUser")[0];
                    const idBox = document.getElementsByName("txtId")[0];
                    const passwordBox = document.getElementsByName("txtPass")[0];
                    const loginBtn = document.getElementsByName("enter")[0];
                    userBox.value = result.lusername;
                    idBox.value = result.lid;
                    passwordBox.value = result.lpassword;
                    loginBtn.click();
                } else {
                    const userBox = document.getElementById("Ecom_User_ID");
                    const idBox = document.getElementById("Ecom_User_Pid");
                    const passwordBox = document.getElementById("Ecom_Password");
                    const loginBtn = document.getElementById("loginButton2");

                    userBox.value = result.lusername;
                    idBox.value = result.lid;
                    passwordBox.value = result.lpassword;
                    loginBtn.click();
                }
            }
        }
    });
};
