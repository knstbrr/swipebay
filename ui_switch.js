var time = 0; // Thats the delay for switch the uis
  
  function iconshow(){
    var element = document.getElementById("ui_four_page");
    element.style.pointerEvents = 'auto';
    setTimeout(function() {
      element.style.opacity = 1; // Übergang zur vollen Sichtbarkeit
    }, 10); // Kurzer Delay, um sicherzustellen, dass die Änderung von display aktiv wird
  }
  function iconhide(){
    var element = document.getElementById("ui_four_page");
    element.style.pointerEvents = 'none';
    element.style.opacity = 0;  // Setzt die Sichtbarkeit auf unsichtbar
    setTimeout(function() {
    }, 200); // 200 Millisekunden = 0.2 Sekunden
  }



  function navigatoroff(){
    var element = document.getElementById("navigation");
    element.style.pointerEvents = 'none';
    element.style.opacity = 0;  // Setzt die Sichtbarkeit auf unsichtbar
    setTimeout(function() {
    }, 200); // 200 Millisekunden = 0.2 Sekunden
  }
  function navigationon(){
    var element = document.getElementById("navigation");
    element.style.pointerEvents = 'auto';
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
    }, 10); // Kurzer Delay, um sicherzustellen dass die Änderung von display aktiv wird
  }

  // die Icons und das hide_other_menu werden von swipe.js ausgeblendet, da es beim start von index.html ein Trigger gibt! Es verhindert das Rendern der Icons

  
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
  