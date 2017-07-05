chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({
    url: 'http://bit.ly/pb-backlog-2017'
  })
})

// chrome.storage.local.remove(["nextalarm"]);
// chrome.alarms.clearAll();

chrome.storage.local.get(['nextalarm'], function(result) {
  if (!result.nextalarm) {
    var today = new Date();
    var datecheck = new Date();
    datecheck.setHours(12);
    datecheck.setMinutes(10);
    datecheck.setSeconds(00)
    if (today.getTime() > datecheck.getTime()) {
      datecheck.setDate(today.getDate()+1);
      chrome.storage.local.set({nextalarm: datecheck.getTime()});
      chrome.alarms.create('pagebold_update_backlog', {
        when: datecheck.getTime()
      })
    } else {
      today.setHours(12);
      today.setMinutes(10);
      today.setSeconds(00);
      chrome.storage.local.set({nextalarm: today.getTime()});
      chrome.alarms.create('pagebold_update_backlog', {
        when: today.getTime()
      })
    }
  }
});

chrome.alarms.onAlarm.addListener(function(alarm){
  if (alarm.name == 'pagebold_update_backlog') {
    var nextalarm = new Date(alarm.scheduledTime);
    nextalarm.setDate(nextalarm.getDate()+1);
    chrome.alarms.create('pagebold_update_backlog', {
      when: nextalarm.getTime()
    })
    chrome.notifications.create('pagebold_update_backlog', {
      iconUrl: chrome.runtime.getURL('logo-150x150.png'),
      type: 'basic',
      title: 'PageBold',
      message: "Time to update the backlog"
    })
  }
})

chrome.notifications.onClicked.addListener(function(notificationId) {
  if (notificationId === 'pagebold_update_backlog') 
    chrome.tabs.create({
      url: 'http://bit.ly/pb-backlog-2017'
    });
  }
});