document.addEventListener('DOMContentLoaded', function () {
    let swipeContainer = document.getElementById('swipe-container');
    let cards = Array.from(swipeContainer.getElementsByClassName('card'));
    let startX = 0;
    let currentCardIndex = getCurrentCardIndexFromCookie(); 
    let swipedCards = getSwipedCardsFromCookie(); 

    // Debugging: Überprüfe die geladenen Karten
    console.log('Alle Karten:', cards);
    console.log('Bereits geswipte Karten:', swipedCards);

    // Nur Karten anzeigen, die noch nicht geswiped wurden
    cards = cards.filter(card => !swipedCards.includes(card.dataset.id));

    // Debugging: Überprüfe die gefilterten Karten
    console.log('Anzuzeigende Karten:', cards);

    // Stelle sicher, dass wir innerhalb der Kartenanzahl bleiben
    if (cards.length > 0 && currentCardIndex < cards.length) {
        showCard(cards[currentCardIndex]);
    } else {
        console.log('Keine Karten mehr oder ungültiger Index.');
    }

    swipeContainer.addEventListener('touchstart', handleTouchStart);
    swipeContainer.addEventListener('touchmove', handleTouchMove);
    swipeContainer.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (currentCardIndex < cards.length) {
            let currentCard = cards[currentCardIndex];
            let endX = event.touches[0].clientX;
            let deltaX = endX - startX;

            currentCard.style.transform = `translateX(${deltaX}px)`;
        }
    }

    function handleTouchEnd(event) {
        let endX = event.changedTouches[0].clientX;
        let deltaX = endX - startX;

        if (deltaX < -100) { // Links wischen (Ablehnen)
            swipeLeft();
        } else if (deltaX > 100) { // Rechts wischen (Akzeptieren)
            swipeRight();
        } else {
            if (currentCardIndex < cards.length) {
                resetCard(cards[currentCardIndex]);
            }
        }
    }

    function swipeLeft() {
        if (currentCardIndex < cards.length - 1) {
            let cardId = cards[currentCardIndex].dataset.id;
            saveSwipedCard(cardId); // Karte als geswiped speichern
            currentCardIndex++;
            setCookie('cardIndex', currentCardIndex, 7); // Nächsten Index speichern
            showCard(cards[currentCardIndex]); // Nächste Karte anzeigen
        } else {
            console.log("Das war die letzte Karte.");
            // Zeige die letzte Karte, wenn es keine weiteren mehr gibt
            showCard(cards[currentCardIndex]);
        }
    }

    function swipeRight() {
        if (currentCardIndex < cards.length - 1) {
            let cardId = cards[currentCardIndex].dataset.id;
            saveSwipedCard(cardId); // Karte als geswiped speichern
            currentCardIndex++;
            setCookie('cardIndex', currentCardIndex, 7); // Nächsten Index speichern
            showCard(cards[currentCardIndex]); // Nächste Karte anzeigen
        } else {
            console.log("Das war die letzte Karte.");
            // Zeige die letzte Karte, wenn es keine weiteren mehr gibt
            showCard(cards[currentCardIndex]);
        }
    }

    function resetCard(card) {
        card.style.transform = 'translateX(0)';
        card.style.opacity = 1;
    }

    function showCard(card) {
        card.classList.remove('hidden');
        card.style.transform = 'translateX(0)';
        card.style.opacity = 1;
    }

    // Hilfsfunktion zum Auslesen des aktuellen Karten-Index aus dem Cookie
    function getCurrentCardIndexFromCookie() {
        let cardIndex = getCookie('cardIndex');
        return cardIndex ? parseInt(cardIndex) : 0;
    }

    // Hilfsfunktion zum Setzen eines Cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Hilfsfunktion zum Auslesen eines Cookies
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Speichere die ID der geswipten Karten
    function saveSwipedCard(cardId) {
        let swipedCards = getSwipedCardsFromCookie();
        swipedCards.push(cardId);
        setCookie('swipedCards', JSON.stringify(swipedCards), 7);
    }

    // Lese die geswipten Karten us dem Cookie
    function getSwipedCardsFromCookie() {
        let swipedCards = getCookie('swipedCards');
        return swipedCards ? JSON.parse(swipedCards) : [];
    }

    // Button und Event-Listener zum Zurücksetzen der Cookies
    let resetButton = document.getElementById('reset-cookies');
    resetButton.addEventListener('click', function () {
        resetCookies();
    });

    // Funktion zum Zurücksetzen der Cookies
    function resetCookies() {
        // Setze die Cookies zurück, indem du sie mit einem abgelaufenen Datum setzt
        document.cookie = "cardIndex=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "swipedCards=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        // Optional: Seite neu laden, um von vorne zu beginnen
        location.reload();
    }
});
