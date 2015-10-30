import fetch from 'isomorphic-fetch';

const env = {
  access_token_url: "https://api.instagram.com/oauth/access_token",
  authorization_url: "https://api.instagram.com/oauth/authorize/",
  client_id: "4ebf7c4324c349ce9606a59606b7459b",
  client_secret: "46293b9e6a0845829ad2016e62e6871b",
  redirect_url: chrome.identity.getRedirectURL('provider_cb'),
  scopes: 'basic+comments+relationships+likes'
};

export default function instagramLogin() {

  var chrome = window.chrome;
  var background = chrome.extension.getBackgroundPage();


  return new Promise(function(resolve, reject) {
    background.login(function(token) {
      resolve(token);
    });
    //chrome.identity.launchWebAuthFlow(options, function(redirectUrl) {
    //  if (chrome.runtime.lastError) {
    //    reject(new Error(chrome.runtime.lastError.message));
    //  } else if (redirectUrl) {
    //    var token = redirectUrl.split('=')[1];
    //    alert(token);
    //    // アイテムをセットしたらdispatchしなくてはならない
    //    localStorage.setItem('access_token', token);
    //    resolve(token);
    //  } else {
    //    reject(new Error("Unknown error in oauth2 web flow"));
    //  }
    //});
  });

}
