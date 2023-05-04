
//fetch('https://momentjs.com/downloads/moment.min.js')

    

function generateGoogleCalendarLink(date, title, description) {
    const startDate = date.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(date.getTime() + (60 * 5 * 1000)).toISOString().replace(/-|:|\.\d+/g, ''); // add 1 hour to the date for the end time
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${startDate}/${endDate}&text=${title}&details=${description}`;
    return googleCalendarUrl;
  }
  
  function addLinkToHTML(htmlObject, link, name) {
    const aElement = document.createElement('a');
    aElement.href = link;
    aElement.textContent = name;
    htmlObject.appendChild(aElement);
  }

  
  function removeNumericValues(str) {
    const letterRegex = /[\u0590-\u05FFa-zA-Z\s]/g; // includes Hebrew letters, English letters, and spaces
    return str.match(letterRegex).join('');
  }
  


function get_submit_date(){
    const dateStringValue = task.getElementsByTagName('h6')[2].getElementsByTagName('div')[0].innerHTML
    const dateRegex = /\b\d{1,2}-\d{1,2}-\d{2}\b/g; // matches substrings in the format dd-mm-yy
    const timeRegex = /\b\d{1,2}:\d{2}\b/g; // matches substrings in the format hh:mm
    dateString = dateStringValue.match(dateRegex)[0]
    timeString = dateStringValue.match(timeRegex )[0]
    const [day, month, year] = dateString.split('-');
    const [hours, minutes] = timeString.split(':');
    const date = new Date(`20${year}`, parseInt(month) - 1, day, hours, minutes); // subtract 1 from month because months in Date object are 0-indexed
    return date


}


function add_calander(){

    tasks = document.getElementsByClassName("w-100 event-name-container text-truncate line-height-3")
    if (tasks.length === 0){
        return false
    }
    for (task of tasks){
        try{
            
            link = task.getElementsByTagName("a")[0].attributes["href"].value
            task_name = task.getElementsByTagName("a")[0].attributes["title"].value
            subject = removeNumericValues(task.getElementsByClassName('text-truncate mb-0 pt-1')[0].innerHTML)
            title = task_name + subject
            submitDate = get_submit_date()
            calanderLink = generateGoogleCalendarLink(submitDate, title, "")
            addLinkToHTML(task, calanderLink, "Add to calander")
        }
          catch(err) {
            // if any error, Code throws the error
            console.log(err)
          }
          finally {
            // Always run this code regardless of error or not
            //this block is optional
          }
    }
    return true
}


async function calander_delay(){
    while (!add_calander()) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 1 second before checking again
      }
}


window.onload = function () {
    calander_delay()
    chrome.storage.sync.get(function (result) {
        
        // add_calander(document)
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
                    // add_calander(document)
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
