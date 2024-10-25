let ui_mode = 1;

class Card {
  constructor({
    imageUrl,
    onDismiss,
    onLike,
    onDislike
  }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.#init();
  }

  // private properties
  #startPoint;
  #offsetX;
  #offsetY;

  #isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  // card element erstellen und initialisieren
  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    this.element = card;
    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }
  }

  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  }

  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
  }

  // Mouse Move Event Handler
  #handleMouseMove = (e) => {
    if (ui_mode == 1) {
      ui_1 ();
    }
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    if (ui_mode == 1) {
      ui_0 ();
    }
    this.#handleRelease();
    document.removeEventListener('mousemove', this.#handleMouseMove);
  }

  // Touch Move Event Handler
  #handleTouchMove = (e) => {
    if (ui_mode == 1) {
      ui_1 ();
    }
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    if (ui_mode == 1) {
      ui_0 ();
    }
    this.#handleRelease();
    document.removeEventListener('touchmove', this.#handleTouchMove);
  }

  // Freigabelogik für Thresholds oben und unten
  #handleRelease = () => {
    const horizontalThreshold = this.element.clientWidth * 0.3;
    const verticalThreshold = this.element.clientHeight * 0.3;

    if (ui_mode === 1) {
      if (this.#offsetY > verticalThreshold) {
        // Karte nach unten gezogen, führe Animation aus und lade Link
        this.#dismissWithAnimation();
        window.location.href = "messages.html";
        return;
      }
      if (this.#offsetY < -verticalThreshold) {
        // Karte nach oben gezogen, zurücksetzen
        this.element.style.transform = '';
        this.#startPoint = null;
        return;
      }
    }

    if (Math.abs(this.#offsetX) > horizontalThreshold) {
      // Nach links oder rechts gezogen, Aktion basierend auf Richtung
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    } else {
      // Karte zurücksetzen, wenn nicht stark genug gezogen
      this.element.style.transform = '';
      this.#startPoint = null;
    }
  }

  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 0.35s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${75 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 350);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      this.onLike();
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      this.onDislike();
    }
  }

  #dismissWithAnimation = () => {
    this.element.style.transition = 'transform 0.5s ease-in-out';
    this.element.style.transform = 'translateY(100vh) scale(0.9)';
    setTimeout(() => {
      this.element.remove();
    }, 500);
  }
}
