chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'twitter.com', schemes: ['https'] },
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

var currentService, serviceData;

getServiceFrom = (url) => {
  var parser;

  if (typeof URL === 'function') {
    parser = new URL(url);
  } else {
    parser = document.createElement('a');
    parser.href = url;
  }

  return parser.hostname.replace(/\..*$/i,'')
}

buildRequest = (name) => {
  return "https://contract-reader.herokuapp.com/services/" + name
};

chrome.tabs.onUpdated.addListener(function(id, changed, tab) {
  if(changed.status !== 'complete') return;

  var url = tab.url;
  var service = getServiceFrom(url);
  var requestUrl = buildRequest(service);

  $.get(requestUrl)
    .done(function( data ) {
      if(currentService !== service) {
        currentService = service;
        serviceData = data
      }
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sendResponse(serviceData)
});
