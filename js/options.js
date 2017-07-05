chrome.alarms.get('pagebold_update_backlog', function(result) {
  if (!result.scheduledTime) return;
  var field = document.getElementById('next_notification');
  if (field) {
    field.appendChild(document.createTextNode(new Date(result.scheduledTime)));
  }
})