var serviceData;

getServiceFrom = (url) => {
  var parser;

  if (typeof URL === 'function') {
    parser = new URL(url);
  } else {
    parser = document.createElement('a');
    parser.href = url;
  }

  var host = parser.hostname.split('.');
  var result = host.sort( (a, b) => {
    return b.length - a.length;
  })[0];

  return result;
}

buildRequest = (name) => {
  return "http://localhost:5000/services/" + name
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    fetchDetails(tab.url, tab.id);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
  if(changeInfo.status !== 'complete') return;

  chrome.tabs.query({'active': true}, function (activeTabs) {
    var activeTab = activeTabs[0];

    if (activeTab.id == updatedTab.id) {
      fetchDetails(updatedTab.url, updatedTab.id);
    }
  });
});

function fetchDetails(url, tabId) {
  var service = getServiceFrom(url);
  var requestUrl = buildRequest(service);

  $.get(requestUrl)
    .done(function( data ) {
      if (!!data.error) return
      serviceData = data
      chrome.pageAction.show(tabId)
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse(serviceData)
});

