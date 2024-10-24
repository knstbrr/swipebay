var time = 0; // Thats the delay for switch the uis

function dislike_0() {
    var element = document.getElementById("dislike");
    element.classList.add("mystyle");
  }
  function dislike_1() {
    var element = document.getElementById("dislike");
    element.classList.remove("mystyle");
  } 
  
  function like_0() {
    var element = document.getElementById("like");
    element.classList.add("mystyle");
  } 
  function like_1() {
    var element = document.getElementById("like");
    element.classList.remove("mystyle");
  } 
  
  function iconshow(){
    dislike_1();
    like_1();
  }
  function iconhide(){
    dislike_0();
    like_0();
  }
  function navigatoroff(){
    var element = document.getElementById("navigation");
    element.style.opacity = 0;  // Setzt die Sichtbarkeit auf unsichtbar
    setTimeout(function() {
    }, 200); // 200 Millisekunden = 0.2 Sekunden
  }
  function navigationon(){
    var element = document.getElementById("navigation");
    setTimeout(function() {
      element.style.opacity = 1; // Übergang zur vollen Sichtbarkeit
    }, 10); // Kurzer Delay, um sicherzustellen, dass die Änderung von display aktiv wird
  }

  function searchoff() {
    var element = document.getElementById("suche");
    element.style.opacity = 0;  // Setzt die Sichtbarkeit auf unsichtbar
    setTimeout(function() {
    }, 200); // 200 Millisekunden = 0.2 Sekunden
  }
  
  function searchon() {
    var element = document.getElementById("suche");
    setTimeout(function() {
      element.style.opacity = 1; // Übergang zur vollen Sichtbarkeit
    }, 10); // Kurzer Delay, um sicherzustellen, dass die Änderung von display aktiv wird
  }
  



  
  let searchTimeout;

  function ui_0() {
      // Wenn der Timeout läuft, wird er zurückgesetzt
      clearTimeout(searchTimeout);
  
      // Ein neues Timeout von 1 Sekunde wird gestartet
      searchTimeout = setTimeout(() => {
          searchon();
          navigationon();
          iconhide();
      }, 1000);
  }
  
  function ui_1(){
    clearTimeout(searchTimeout);
    searchoff();
    navigatoroff();
    iconshow();
  }
  