function getCookie(cookieItem) {
    let arr;
    let cartCookie = document.cookie.split(";");
    for(cookie of cartCookie){
      const parts = cookie.split("=");
      if(parts[0].trim() == cookieItem.trim()) {
        if(!arr) {
          arr = parts[1];
        }
        else 
          arr += parts[1];
      }
    }
    arr = JSON.parse(arr);
    return(arr);
}