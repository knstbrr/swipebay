// Ich habe es nicht hinbekommen, dass das swippen in mode 0 funktioniert.
let ui_mode = 0;

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

  // Initialize the card
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
    if (ui_mode === 1) {
      ui_1();
    }
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY };
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  }

  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      if (ui_mode === 1) {
        ui_1();
      }
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY };
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

  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  }

  #handleMoveUp = () => {
    if (ui_mode === 1) {
      ui_0();
    }
    const threshold = this.element.clientHeight * 0.3; // 30% of the card's height

    if (Math.abs(this.#offsetY) > threshold) {
      // Swipe up or down
      this.#dismiss(this.#offsetY > 0 ? -1 : 1);
    } else if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.3) {
      // Swipe left or right
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    } else {
      this.element.style.transform = '';
      this.#startPoint = null;
    }
    document.removeEventListener('mousemove', this.#handleMouseMove);
  }

  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  }

  #handleTouchEnd = () => {
    if (ui_mode === 1) {
      ui_0();
    }
    const threshold = this.element.clientHeight * 0.3; // 30% of the card's height

    if (Math.abs(this.#offsetY) > threshold) {
      // Swipe up or down
      this.#dismiss(this.#offsetY > 0 ? -1 : 1);
    } else if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.3) {
      // Swipe left or right
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    } else {
      this.element.style.transform = '';
      this.#startPoint = null;
    }
    document.removeEventListener('touchmove', this.#handleTouchMove);
  }

      #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener('mouseup', this.#handleMoveUp);
        document.removeEventListener('mousemove', this.#handleMouseMove);
        document.removeEventListener('touchend', this.#handleTouchEnd);
        document.removeEventListener('touchmove', this.#handleTouchMove);
        this.element.style.transition = 'transform 0.35s';

        // Handle swipe up or down
        if (Math.abs(this.#offsetY) > this.element.clientHeight * 0.3 && ui_mode == 1) {
            if (this.#offsetY > 0) {
                // Swipe down
                this.element.style.transform = `translate(0, ${window.innerHeight}px) rotate(75deg)`;
                setTimeout(() => {
                    window.location.href = 'messages.html'; // Navigate to messages.html
                }, 350);
            } else {
                // Swipe up
                this.element.style.transform = `translate(0, ${-window.innerHeight}px) rotate(-75deg)`;
                setTimeout(() => {
                    window.location.href = 'back.html'; // Navigate to back.html
                }, 350);
            }
        } else {
            // Handle left or right swipes
            this.element.style.transform = `translate(${direction * window.innerWidth}px, 0) rotate(${75 * direction}deg)`;
            if (typeof this.onDismiss === 'function') {
                this.onDismiss();
            }
            if (typeof this.onLike === 'function' && direction === 1) {
                this.onLike(); // Call onLike for right swipe
            }
            if (typeof this.onDislike === 'function' && direction === -1) {
                this.onDislike(); // Call onDislike for left swipe
            }
        }

        this.element.classList.add('dismissing');
        setTimeout(() => {
            this.element.remove();
        }, 350);
    }
}
