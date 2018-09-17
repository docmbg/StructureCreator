let url = window.location.href;
        if (url.substring(url.length - 4, url.length) == 'aspx') {
          window.location.href = `${url}/home`
        }