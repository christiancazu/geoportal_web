var s = window.location.search,
      q = s.match(/locale=([^&]*)/i);
    var locale = (q && q.length > 0) ? q[1] : null;
    window.dojoConfig = {
      locale: locale,
      async: true
};