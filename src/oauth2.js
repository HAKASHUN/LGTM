(function() {
  window.oauth2 = {

    access_token_url: "https://api.instagram.com/oauth/access_token",
    authorization_url: "https://api.instagram.com/oauth/authorize/",
    client_id: "4ebf7c4324c349ce9606a59606b7459b",
    client_secret: "46293b9e6a0845829ad2016e62e6871b",
    redirect_url: chrome.identity.getRedirectURL(),
    scopes: 'basic+comments+relationships+likes',

    key: "oauth2_token",

    /**
     * Starts the authorization process.
     */
    start: function() {
      window.close();
      var url = this.authorization_url + "?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_url + "&response_type=code" + "&scope=";
      for(var i in this.scopes) {
        url += this.scopes[i];
      }

      chrome.identity.launchWebAuthFlow({url: url, interactive: true},
        function(responseUrl) {
          console.log(responseUrl);
          var accessToken = responseUrl.substring(responseUrl.indexOf("=") + 1);
          console.log(accessToken);
          localStorage.setItem("access_token", accessToken);
        });

      //chrome.tabs.create({url: url, active: true});
    },

    /**
     * Finishes the oauth2 process by exchanging the given authorization code for an
     * authorization token. The authroiztion token is saved to the browsers local storage.
     * If the redirect page does not return an authorization code or an error occures when
     * exchanging the authorization code for an authorization token then the oauth2 process dies
     * and the authorization tab is closed.
     *
     * @param url The url of the redirect page specified in the authorization request.
     */
    finish: function(url) {

      function removeTab() {
        chrome.tabs.getCurrent(function(tab) {
          chrome.tabs.remove(tab.id);
        });
      };

      if(url.match(/\?error=(.+)/)) {
        removeTab();
      } else {
        var code = url.match(/\?code=([\w\/\-]+)/)[1];

        var that = this;
        var data = new FormData();
        data.append('client_id', this.client_id);
        data.append('client_secret', this.client_secret);
        data.append('code', code);

        // Send request for authorization token.
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function(event) {
          if(xhr.readyState == 4) {
            if(xhr.status == 200) {
              if(xhr.responseText.match(/error=/)) {
                removeTab();
              } else {
                var token = xhr.responseText.match(/access_token=([^&]*)/)[1];
                window.localStorage.setItem(that.key, token);
                removeTab();
              }
            } else {
              removeTab();
            }
          }
        });
        xhr.open('POST', this.access_token_url, true);
        xhr.send(data);
      }
    },

    /**
     * Retreives the authorization token from local storage.
     *
     * @return Authorization token if it exists, null if not.
     */
    getToken: function() {
      return window.localStorage.getItem(this.key);
    },

    /**
     * Clears the authorization token from the local storage.
     */
    clearToken: function() {
      delete window.localStorage.removeItem(this.key);
    }
  }
})();