
function generateGoogleCalendarLink(date, title, description) {
    const startDate = date.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(date.getTime() + (60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, ''); // add 1 hour to the date for the end time
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

window.onload = function() {
tasks = document.getElementsByClassName("w-100 event-name-container text-truncate line-height-3")
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
}
