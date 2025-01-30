class Accordion {
  constructor(element, options = {}) {
    this.version = "1.0.1";
    this.accordion = element;
    this._config = {
      multiple: options.multiple || false,
      defaultOpen: options.defaultOpen || [],
      animationDuration: options.animationDuration || 300,
      onToggle: options.onToggle || null,
    };

    // Injecter les styles par défaut
    if (!document.querySelector("#accordion-default-styles")) {
      this._injectDefaultStyles();
    }

    this._init();
  }

  _injectDefaultStyles() {
    const styles = `
    :root {
      /* Palette de base */
      --color-white: #ffffff;
      --color-black: #000000;
      --color-dark-purple: #1a1425;
      --color-light-pink: #fdf2f8;
      --color-pink-200: #fce7f3;
      --color-pink-300: #fbcfe8;
      --color-dark-base: #1e1520;
      
      /* Accents */
      --color-accent-500: #831843;
      --color-accent-400: #9d174d;
      --color-accent-300: #db2777;
      --color-accent-200: #f9a8d4;
      --color-accent-100: #fda4af;
      
      /* Textes */
      --color-text-light: var(--color-accent-400);
      --color-text-dark: var(--color-pink-200);
      
      /* Bordures */
      --color-border-light-rgb: 251, 207, 232;
      --color-border-dark-rgb: 219, 39, 119;
      --color-border-alpha-light: 0.9;
      --color-border-alpha-dark: 0.2;
      --color-border-light: rgba(var(--color-border-light-rgb), var(--color-border-alpha-light));
      --color-border-dark: rgba(var(--color-border-dark-rgb), var(--color-border-alpha-dark));
      --color-border-active: transparent;
      
      /* Ombres */
      --color-shadow-alpha-light: 0.03;
      --color-shadow-alpha-dark: 0.2;
      --color-shadow-light: rgba(var(--color-border-dark-rgb), var(--color-shadow-alpha-light));
      --color-shadow-dark: rgba(var(--color-black), var(--color-shadow-alpha-dark));
      --color-shadow-white-alpha: 0.6;
      --color-inset-shadow-light: rgba(var(--color-border-dark-rgb), 0.02);
      
      /* Icônes */
      --color-icon-background-alpha-light: 0.4;
      --color-icon-hover-alpha-light: 0.1;
      --color-icon-active-alpha-light: 0.15;
      --color-icon-background-alpha-dark: 0.15;
      --color-icon-hover-alpha-dark: 0.25;
      --color-icon-active-alpha-dark: 0.3;
      
      /* Dégradés */
      --color-gradient-start-light: var(--color-white);
      --color-gradient-end-light: var(--color-light-pink);
      --color-gradient-start-dark: var(--color-dark-base);
      --color-gradient-end-dark: var(--color-dark-purple);
      --color-gradient-button-light: linear-gradient(135deg, var(--color-gradient-start-light) 0%, var(--color-gradient-end-light) 100%);
      --color-gradient-button-dark: linear-gradient(135deg, var(--color-gradient-start-dark) 0%, var(--color-gradient-end-dark) 100%);
      --color-gradient-content-light: linear-gradient(180deg, var(--color-gradient-start-light) 0%, var(--color-gradient-end-light) 100%);
      --color-gradient-content-dark: linear-gradient(180deg, var(--color-gradient-start-dark) 0%, var(--color-gradient-end-dark) 100%);
      --color-gradient-border-light: linear-gradient(135deg, rgba(var(--color-border-light-rgb), 0.125), rgba(var(--color-border-dark-rgb), 0.125));
      --color-gradient-border-dark: linear-gradient(135deg, rgba(251, 113, 133, 0.188), rgba(225, 17, 120, 0.188));
      
      /* Effets */
      --color-focus-ring: var(--color-accent-200);
    }

    .accordion-wrapper {
      max-width: 1200px;
      margin: 2.5rem auto;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      padding: 0 2rem;
      perspective: 1000px;
    }

    .accordion-item {
      margin-bottom: 1.25rem;
      transform-origin: top center;
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .accordion-item:hover {
      transform: scale(1.01);
    }

    .accordion-button {
      width: 100%;
      background-color: var(--color-light-pink);
      background: var(--color-gradient-button-light);
      color: var(--color-accent-500);
      padding: 1.25rem;
      border: 1px solid var(--color-border-light);
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 0.925rem;
      letter-spacing: -0.01em;
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      position: relative;
      outline: none;
      box-shadow:
        0 4px 6px -1px var(--color-shadow-light),
        0 2px 4px -1px var(--color-shadow-light),
        0 1px 0 rgba(var(--color-white), var(--color-shadow-white-alpha)) inset;
    }

    .accordion-button::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 12px;
      padding: 2px;
      background: var(--color-gradient-border-light);
      -webkit-mask: 
        linear-gradient(var(--color-white) 0 0) content-box, 
        linear-gradient(var(--color-white) 0 0);
      mask: 
        linear-gradient(var(--color-white) 0 0) content-box, 
        linear-gradient(var(--color-white) 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .accordion-button:hover {
      background: linear-gradient(135deg, var(--color-gradient-start-light) 0%, var(--color-pink-200) 100%);
      transform: translateY(-1px);
      box-shadow:
        0 8px 16px -4px var(--color-shadow-light),
        0 4px 6px -2px var(--color-shadow-light),
        0 1px 0 rgba(var(--color-white), var(--color-shadow-white-alpha)) inset;
    }

    .accordion-button:hover::before {
      opacity: 1;
    }

    .accordion-button:focus-visible {
      box-shadow:
        0 0 0 2px var(--color-white),
        0 0 0 4px var(--color-focus-ring);
    }

    .accordion-button.active {
      background: linear-gradient(135deg, var(--color-light-pink) 0%, var(--color-pink-200) 100%);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-color: var(--color-border-active);
    }

    .accordion-icon {
      color: var(--color-accent-500);
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      font-size: 1rem;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: rgba(var(--color-border-light-rgb), var(--color-icon-background-alpha-light));
    }

    .accordion-button:hover .accordion-icon {
      background-color: rgba(var(--color-border-dark-rgb), var(--color-icon-hover-alpha-light));
      transform: scale(1.05);
    }

    .accordion-button.active .accordion-icon {
      transform: rotate(90deg) scale(1.05);
      background-color: rgba(var(--color-border-dark-rgb), var(--color-icon-active-alpha-light));
      color: var(--color-text-light);
    }

    .accordion-content {
      background-color: var(--color-light-pink);
      background: var(--color-gradient-content-light);
      border: 1px solid var(--color-border-light);
      border-top: none;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      transform: translateY(-8px);
      transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .accordion-content.active {
      opacity: 1;
      transform: translateY(0);
      box-shadow:
        inset 0 2px 4px var(--color-inset-shadow-light),
        0 4px 6px var(--color-inset-shadow-light);
    }

    .accordion-body {
      color: var(--color-text-light);
      line-height: 1.6;
      padding: 1.25rem;
      font-size: 0.875rem;
    }

    @media (prefers-color-scheme: dark) {
      .accordion-button {
        background: var(--color-gradient-button-dark);
        color: var(--color-text-dark);
        border-color: var(--color-border-dark);
        box-shadow:
          0 4px 6px -1px var(--color-shadow-dark),
          0 2px 4px -1px var(--color-shadow-dark);
      }

      .accordion-button::before {
        background: var(--color-gradient-border-dark);
      }

      .accordion-button:hover {
        background: linear-gradient(135deg, var(--color-gradient-start-dark) 0%, var(--color-gradient-end-dark) 100%);
      }

      .accordion-content {
        background: var(--color-gradient-content-dark);
        border-color: var(--color-border-dark);
      }

      .accordion-body {
        color: var(--color-text-dark);
      }

      .accordion-icon {
        background-color: rgba(var(--color-border-dark-rgb), var(--color-icon-background-alpha-dark));
        color: var(--color-accent-100);
      }

      .accordion-button:hover .accordion-icon {
        background-color: rgba(var(--color-border-dark-rgb), var(--color-icon-hover-alpha-dark));
      }

      .accordion-button.active .accordion-icon {
        background-color: rgba(var(--color-border-dark-rgb), var(--color-icon-active-alpha-dark));
      }
    }
  `;

    // *** Blue ***
    // const styles = `
    //   :root {
    //     /* Palette bleu ciel */
    //     --color-accent-50: #f0f9ff;
    //     --color-accent-100: #e0f2fe;
    //     --color-accent-200: #bae6fd;
    //     --color-accent-300: #7dd3fc;
    //     --color-accent-400: #38bdf8;
    //     --color-accent-500: #0ea5e9;
    //     --color-accent-600: #0284c7;
    //     --color-accent-700: #0369a1;

    //     /* Textes */
    //     --color-text-primary: #0369a1;
    //     --color-text-secondary: #0284c7;
    //     --color-text-light: var(--color-accent-100);
    //     --color-text-dark: var(--color-accent-700);

    //     /* Arrière-plans */
    //     --color-bg-gradient-start: #ffffff;
    //     --color-bg-gradient-end: #f0f9ff;
    //     --color-bg-dark: var(--color-accent-700);

    //     /* Icônes */
    //     --color-icon-bg-rgb: 186, 230, 253;
    //     --color-icon-bg: rgba(var(--color-icon-bg-rgb), 0.4);
    //     --color-icon-hover: rgba(var(--color-icon-bg-rgb), 0.6);
    //     --color-icon-active: rgba(var(--color-icon-bg-rgb), 0.8);

    //     /* Bordures */
    //     --color-border-rgb: 186, 230, 253;
    //     --color-border-alpha-light: 0.9;
    //     --color-border-light: rgba(var(--color-border-rgb), var(--color-border-alpha-light));
    //     --color-border-dark: rgba(3, 105, 161, 0.3);

    //     /* Ombres */
    //     --color-shadow-rgb: 186, 230, 253;
    //     --color-shadow-light: rgba(var(--color-shadow-rgb), 0.15);
    //     --color-shadow-dark: rgba(2, 132, 199, 0.2);

    //     /* Dégradés */
    //     --color-gradient-button-light: linear-gradient(135deg, var(--color-bg-gradient-start) 0%, var(--color-bg-gradient-end) 100%);
    //     --color-gradient-button-dark: linear-gradient(135deg, var(--color-accent-700) 0%, var(--color-accent-600) 100%);
    //     --color-gradient-content-light: linear-gradient(180deg, var(--color-bg-gradient-start) 0%, var(--color-bg-gradient-end) 100%);
    //     --color-gradient-overlay: linear-gradient(135deg, rgba(var(--color-border-rgb), 0.1), rgba(2, 132, 199, 0.1));
    //   }

    //   .accordion-wrapper {
    //     max-width: 1200px;
    //     margin: 2.5rem auto;
    //     font-family: 'Inter', system-ui, -apple-system, sans-serif;
    //     padding: 0 2rem;
    //     perspective: 1000px;
    //   }

    //   .accordion-item {
    //     margin-bottom: 1.25rem;
    //     transform-origin: top center;
    //     transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    //   }

    //   .accordion-item:hover {
    //     transform: scale(1.01);
    //   }

    //   .accordion-button {
    //     width: 100%;
    //     background: var(--color-gradient-button-light);
    //     color: var(--color-text-primary);
    //     padding: 1.25rem;
    //     border: 1px solid var(--color-border-light);
    //     border-radius: 12px;
    //     cursor: pointer;
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //     font-weight: 600;
    //     font-size: 0.925rem;
    //     letter-spacing: -0.01em;
    //     transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    //     position: relative;
    //     outline: none;
    //     box-shadow:
    //       0 4px 6px -1px var(--color-shadow-light),
    //       0 2px 4px -1px var(--color-shadow-light),
    //       0 1px 0 rgba(255, 255, 255, 0.6) inset;
    //   }

    //   .accordion-button::before {
    //     content: '';
    //     position: absolute;
    //     inset: 0;
    //     border-radius: 12px;
    //     padding: 2px;
    //     background: var(--color-gradient-overlay);
    //     -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    //     mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    //     -webkit-mask-composite: xor;
    //     mask-composite: exclude;
    //     opacity: 0;
    //     transition: opacity 0.4s ease;
    //   }

    //   .accordion-button:hover {
    //     background: linear-gradient(135deg, var(--color-bg-gradient-start) 0%, var(--color-accent-100) 100%);
    //     transform: translateY(-1px);
    //     box-shadow:
    //       0 8px 16px -4px var(--color-shadow-light),
    //       0 4px 6px -2px var(--color-shadow-light),
    //       0 1px 0 rgba(255, 255, 255, 0.6) inset;
    //   }

    //   .accordion-button:hover::before {
    //     opacity: 1;
    //   }

    //   .accordion-button:focus-visible {
    //     box-shadow:
    //       0 0 0 2px #ffffff,
    //       0 0 0 4px var(--color-accent-300);
    //   }

    //   .accordion-button.active {
    //     background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
    //     border-bottom-left-radius: 0;
    //     border-bottom-right-radius: 0;
    //     border-bottom-color: transparent;
    //   }

    //   .accordion-icon {
    //     color: var(--color-text-secondary);
    //     transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    //     font-size: 1rem;
    //     width: 28px;
    //     height: 28px;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     border-radius: 6px;
    //     background-color: var(--color-icon-bg);
    //   }

    //   .accordion-button:hover .accordion-icon {
    //     background-color: var(--color-icon-hover);
    //     transform: scale(1.05);
    //   }

    //   .accordion-button.active .accordion-icon {
    //     transform: rotate(90deg) scale(1.05);
    //     background-color: var(--color-icon-active);
    //     color: var(--color-text-primary);
    //   }

    //   .accordion-content {
    //     background: var(--color-gradient-content-light);
    //     border: 1px solid var(--color-border-light);
    //     border-top: none;
    //     border-bottom-left-radius: 12px;
    //     border-bottom-right-radius: 12px;
    //     overflow: hidden;
    //     max-height: 0;
    //     opacity: 0;
    //     transform: translateY(-8px);
    //     transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    //   }

    //   .accordion-content.active {
    //     opacity: 1;
    //     transform: translateY(0);
    //     box-shadow:
    //       inset 0 2px 4px rgba(var(--color-shadow-rgb), 0.05),
    //       0 4px 6px rgba(var(--color-shadow-rgb), 0.05);
    //   }

    //   .accordion-body {
    //     color: var(--color-text-primary);
    //     line-height: 1.6;
    //     padding: 1.25rem;
    //     font-size: 0.875rem;
    //   }

    //   @media (prefers-color-scheme: dark) {
    //     .accordion-button {
    //       background: var(--color-gradient-button-dark);
    //       color: var(--color-text-light);
    //       border-color: var(--color-border-dark);
    //       box-shadow:
    //         0 4px 6px -1px var(--color-shadow-dark),
    //         0 2px 4px -1px var(--color-shadow-dark);
    //     }

    //     .accordion-button::before {
    //       background: linear-gradient(135deg, rgba(3, 105, 161, 0.15), rgba(2, 132, 199, 0.15));
    //     }

    //     .accordion-button:hover {
    //       background: linear-gradient(135deg, var(--color-accent-700) 0%, var(--color-accent-600) 100%);
    //     }

    //     .accordion-content {
    //       background: var(--color-accent-700);
    //       border-color: var(--color-border-dark);
    //     }

    //     .accordion-body {
    //       color: var(--color-text-light);
    //     }

    //     .accordion-icon {
    //       background-color: rgba(2, 132, 199, 0.2);
    //       color: var(--color-accent-300);
    //     }

    //     .accordion-button:hover .accordion-icon {
    //       background-color: rgba(2, 132, 199, 0.3);
    //     }

    //     .accordion-button.active .accordion-icon {
    //       background-color: rgba(2, 132, 199, 0.4);
    //     }
    //   }
    // `;

    const styleSheet = document.createElement("style");
    styleSheet.id = "accordion-default-styles";
    styleSheet.type = "text/css";
    styleSheet.innerHTML = styles;
    document.head.appendChild(styleSheet);
  }

  _init() {
    this.buttons = this.accordion.querySelectorAll(".accordion-button");
    this.panels = this.accordion.querySelectorAll(".accordion-content");

    this._setupAccordion();
    this._config.defaultOpen.forEach((index) => {
      if (this.buttons[index]) {
        this._open(this.buttons[index]);
      }
    });
  }

  _setupAccordion() {
    this.buttons.forEach((button, index) => {
      const panelId = `accordion-panel-${index}`;
      button.setAttribute("aria-controls", panelId);
      button.setAttribute("id", `accordion-button-${index}`);

      const panel = button.nextElementSibling;
      panel.setAttribute("id", panelId);
      panel.setAttribute("role", "region");
      panel.setAttribute("aria-labelledby", `accordion-button-${index}`);

      button.addEventListener("click", (e) => this._togglePanel(e));
      button.addEventListener("keydown", (e) => this._handleKeydown(e));
    });
  }

  _togglePanel(event) {
    const button = event.currentTarget;
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    if (!this._config.multiple) {
      this.closeAll();
    }

    if (isExpanded) {
      this._close(button);
    } else {
      this._open(button);
    }

    if (this._config.onToggle) {
      this._config.onToggle(button, !isExpanded);
    }
  }

  _open(button) {
    const panel = button.nextElementSibling;
    const panelBody = panel.querySelector(".accordion-body");

    button.classList.add("active");
    button.setAttribute("aria-expanded", "true");
    panel.classList.add("active");
    panel.style.maxHeight = `${panelBody.offsetHeight}px`;
  }

  _close(button) {
    const panel = button.nextElementSibling;

    button.classList.remove("active");
    button.setAttribute("aria-expanded", "false");
    panel.classList.remove("active");
    panel.style.maxHeight = "0";
  }

  _handleKeydown(event) {
    const button = event.target;
    const index = Array.from(this.buttons).indexOf(button);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (index < this.buttons.length - 1) {
          this.buttons[index + 1].focus();
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index > 0) {
          this.buttons[index - 1].focus();
        }
        break;
      case "Home":
        event.preventDefault();
        this.buttons[0].focus();
        break;
      case "End":
        event.preventDefault();
        this.buttons[this.buttons.length - 1].focus();
        break;
    }
  }

  closeAll() {
    this.buttons.forEach((button) => {
      if (button.getAttribute("aria-expanded") === "true") {
        this._close(button);
      }
    });
  }

  updateColors(newColors) {
    const root = document.documentElement;
    // Applique les nouvelles couleurs aux variables CSS :root
    for (const [key, value] of Object.entries(newColors)) {
      root.style.setProperty(key, value);
    }
  }
}
