
//fetch('https://momentjs.com/downloads/moment.min.js')

    
function generate_url(options){
    BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE'
    get_time = (date)=>{;
    MyDateString = date.getFullYear()+
                ('0' + date.getMonth()).slice(-2) + ''
             + ('0' + (date.getDate()+1)).slice(-2) + 'T'
             + ('0' + (date.getHours()+1)).slice(-2) + ''
             + ('0' + (date.getMinutes()+1)).slice(-2) + ''
             + ('0' + (date.getSeconds()+1)).slice(-2) + 'Z';
             console.log(date.toLocaleString())
             console.log(MyDateString)
        return MyDateString;
    }
    add_time = (sd, ed)=>{
        return get_time(sd)+'/'+get_time(ed)
    }
    //return '&dates=' + toIsoHour(options.start) + '/' + toIsoHour(options.end);
    add_parameter = (param, value) => {
        return '&'+encodeURIComponent(param)+'='+encodeURIComponent(value)

    }
    return BASE_URL 
    + add_parameter('text',options.title)
    + add_parameter('details',options.details)
    +add_parameter('dates',add_time(options.start, options.end))
}
function add_calander(document){

    task_region = document.getElementById("paged-content-container-1")

    task_nodes = task_region.children[0].childNodes[1].childNodes[1].childNodes
    console.log("adding calandar")
    console.log(task_nodes)
    dates = Array.from(task_nodes).filter(tag => tag.tagName == "H5")
    tasks_parent = Array.from(Array.from(task_nodes).filter(tag => tag.tagName == "DIV"))

    for (const parent of tasks_parent) {
        sub_tasks = Array.from(Array.from(parent.childNodes).filter(tag => tag.tagName == "DIV"))
        for (const i of sub_tasks){
            sub_task = Array.from(i.childNodes).filter(tag => tag.tagName == "DIV")[0].childNodes[3]
            task_text = sub_task.childNodes[1].textContent
            
            subject = sub_task.childNodes[3].textContent.replace(/[0-9,-]/g, '').trim()
            full_title = subject+" "+ task_text
            href = sub_task.childNodes[1].href
            date_str = sub_task.childNodes[5].textContent.trim().slice(3).trim()
            let [day, month, year] = date_str.split('-')
            year = "20"+year
            console.log(year+'-'+month+'-'+day )
            desiredLink = generate_url({title: full_title,
            details: full_title +" "+href,
            start: new Date(year+'-'+month+'-'+day + 'T22:00:00Z'),
            end: new Date(year+'-'+month+'-'+day + 'T22:00:00Z'),
            })
            var a = document.createElement('a');

    desiredText = "add to calander"
    a.setAttribute('href',desiredLink);
    a.innerHTML = desiredText;
    a.target = "_blank"
    i.insertBefore(a, i.childNodes[0])
    }
    }
}

// $(document).ready(function() {
//     add_calander(document)
// });
document.addEventListener("DOMContentLoaded", function(event){
    var delayInMilliseconds = 100000;
    setTimeout(function() {
        //your code to be executed after 1 second
        add_calander(document)
      }, 10000);
    
  });
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        add_calander(document)
    }
  }

window.onload = function () {
    chrome.storage.sync.get(function (result) {
        
        //add_calander(document)
        if (result.autologin) {
            url = document.URL
            if (url.endsWith('/')) {
                url = url.slice(0, -1);
            }
            if (url.includes("moodle.tau.ac.il")) {
                if (document.getElementsByClassName("btn btn-info").length > 0) {
                    document.location.href = "https://moodle.tau.ac.il/login/index.php";
                }
                else{
                    add_calander(document)
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
                    if (result.lusername!= "" && result.lid!= "" && result.lpassword!= "" ){
                        loginBtn.click();}
                } else {
                    const userBox = document.getElementById("Ecom_User_ID");
                    const idBox = document.getElementById("Ecom_User_Pid");
                    const passwordBox = document.getElementById("Ecom_Password");
                    const loginBtn = document.getElementById("loginButton2");

                    userBox.value = result.lusername;
                    idBox.value = result.lid;
                    passwordBox.value = result.lpassword;
                    if (result.lusername!= "" && result.lid!= "" && result.lpassword!= "" ){
                        loginBtn.click();}

                   
                }
                
            }
        }
    });
};
