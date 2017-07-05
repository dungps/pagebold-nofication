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
    datecheck.setHours(17);
    datecheck.setMinutes(00);
    datecheck.setSeconds(00)
    if (today.getTime() > datecheck.getTime()) {
      datecheck.setDate(today.getDate()+1);
      chrome.storage.local.set({nextalarm: datecheck.getTime()});
      chrome.alarms.create('pagebold_update_backlog', {
        when: datecheck.getTime()
      })
    } else {
      today.setHours(17);
      today.setMinutes(00);
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
    }, function() {
      var audio = new Audio();
      audio.src = chrome.runtime.getURL('notify.mp3');
      audio.play();
    })
  }
});

setInterval(function(){
  chrome.alarms.getAll(function(alarms) {
    alarms.forEach(function(i,k) {
      console.log(new Date(i.scheduledTime));
    })
  })
}, 36000000);

chrome.notifications.onClicked.addListener(function(notificationId) {
  if (notificationId === 'pagebold_update_backlog') {
    chrome.tabs.create({
      url: 'http://bit.ly/pb-backlog-2017'
    });
  }
});