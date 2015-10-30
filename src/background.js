/**
 *  create browserify
 */

var chrome = window.chrome;
var storage = chrome.storage.sync;
var env = {
  access_token_url: "https://api.instagram.com/oauth/access_token",
  authorization_url: "https://api.instagram.com/oauth/authorize/",
  client_id: "4ebf7c4324c349ce9606a59606b7459b",
  client_secret: "46293b9e6a0845829ad2016e62e6871b",
  redirect_url: chrome.identity.getRedirectURL('provider_cb'),
  scopes: 'basic+comments+relationships+likes'
};

var redirectRe = new RegExp(env.redirect_url + '[#\?](.*)');

/**
 * parse url fragment
 * @param fragment
 * @returns {{}}
 */
function parseRedirectFragment(fragment) {
  var pairs = fragment.split(/&/);
  var values = {};

  pairs.forEach(function(pair) {
    var nameval = pair.split(/=/);
    values[nameval[0]] = nameval[1];
  });

  return values;
}

/**
 * login instagram
 */
function login() {
  var url = [
    env.authorization_url,
    "?client_id=",
    env.client_id,
    "&redirect_uri=",
    encodeURIComponent(env.redirect_url),
    "&response_type=token",
    "&scope=",
    env.scopes
  ].join('');

  chrome.identity.launchWebAuthFlow({
      'url': url,
      'interactive': true
    },
    function (redirectUrl) {
      if (chrome.runtime.lastError) {
        openTab('error.html');
        return;
      }

      var matches = redirectUrl.match(redirectRe);
      if (matches && matches.length > 1) {
        handleProviderResponse(parseRedirectFragment(matches[1]));
      } else {
        openTab('error.html')
      }

    });
}

/**
 * リダイレクトされた値を処理する
 * @param values
 */
function handleProviderResponse(values) {
  if (values.hasOwnProperty('access_token')) {
    storage.set({
      'accessToken': values.access_token
    });
    openTab('welcome.html')
  } else {
    openTab('error.html')
  }
}

/**
 * openTab
 * @param {String} pageName pageFileName
 */
function openTab(pageName) {
  chrome.tabs.create({
    url: chrome.extension.getURL(pageName)
  });
}

/**
 * fetch User Token
 * @param {Function} callback
 */
function fetchUser (callback) {
  storage.get([
    'accessToken'
  ], function (data) {
    callback(data);
  });
}

