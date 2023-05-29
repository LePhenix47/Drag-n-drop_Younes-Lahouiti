(()=>{"use strict";(()=>{const{log:n,error:e,table:r,time:t,timeEnd:a,timeStamp:o,timeLog:i,assert:l,clear:s,count:c,countReset:d,group:g,groupCollapsed:b,groupEnd:h,trace:p,profile:u,profileEnd:m,warn:v,debug:f,info:w,dir:y,dirxml:k}=console;function x(n,e){var r;if(!e)return document.querySelector(n);return(null===(r=null==e?void 0:e.tagName)||void 0===r?void 0:r.includes("-"))?e.shadowRoot.querySelector(n):e.querySelector(n)}function _(n,e,r){r.setAttribute(n,e.toString())}function C(n,e){return e.getAttribute(n)}const E=document.createElement("template");E.innerHTML='\n  <style>\n    \n/* \n    Hides the element and all its descendants from view\n */\n.hide {\n    display: none !important;\n}\n\n/* \n    Hides the element from view except for screen readers \n    \n    - Good for accessibilty and by consequence SEO\n*/\n.screen-readers-only {\n    /*    \n    Positions the element off the screen \n    */ \n    clip: rect(0 0 0 0);\n    clip-path: inset(50%);\n\n    /*    \n    Sets the dimensions of the element to 1×1 px \n    */ \n    height: 1px;\n    width: 1px;\n\n    /*    \n    Hides any content that overflows the element \n    */ \n    overflow: hidden;\n\n    /*    \n    Positions the element absolutely \n    */ \n    position: absolute;\n\n    /*    \n    Prevents line breaks in the element \n    */ \n    white-space: nowrap;\n}\n\n/* \n    Disables pointer (click on desktop and tap on mobile) events for the element and its descendants \n*/\n.no-pointer-events {\n    pointer-events: none;\n}\n\n\n    \n@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap);\n@media(prefers-reduced-motion:reduce) {\n    *, :after, :before {\n        animation: none !important;\n        transition: none !important\n    }\n}\n\n*, :after, :before {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0\n}\n\n::-moz-selection {\n    -webkit-text-stroke: transparent;\n    background-color: var(--selection-bg-color);\n    color: var(--selection-color)\n}\n\n::selection {\n    -webkit-text-stroke: transparent;\n    background-color: var(--selection-bg-color);\n    color: var(--selection-color)\n}\n\nhtml {\n    color-scheme: dark light;\n    scroll-behavior: smooth\n}\n\nbody {\n    background-color: var(--bg-primary);\n    color: var(--color-primary);\n    min-height: 100vh;\n    overflow-x: hidden;\n    transition: background-color .65s ease-in-out, color .35s ease-in-out\n}\n\n:is(ul, ol) {\n    list-style-type: none\n}\n\nbutton {\n    background-color: transparent;\n    border-color: transparent;\n    color: inherit;\n    font-family: inherit\n}\n\nbutton:hover {\n    cursor: pointer\n}\n\nbutton:hover:disabled {\n    cursor: not-allowed\n}\n\ninput {\n    border-color: transparent;\n    font-family: inherit;\n    outline-color: transparent\n}\n\ninput:hover {\n    cursor: pointer\n}\n\ninput:focus {\n    border-color: transparent;\n    outline: transparent\n}\n\ninput:disabled {\n    cursor: not-allowed\n}\n\ntextarea {\n    font-family: inherit\n}\n\ntextarea, textarea:focus {\n    border-color: transparent\n}\n\ntextarea:focus {\n    outline: transparent\n}\n\na {\n    color: inherit;\n    text-decoration: none\n}\n\na:visited {\n    color: currentColor\n}\n\nlabel:hover {\n    cursor: pointer\n}\n\nfieldset {\n    border-color: transparent\n}\n\nlegend {\n    position: static\n}\n\ndialog {\n    inset: 50%;\n    margin: 0;\n    padding: 0;\n    position: fixed;\n    translate: -50% -50%;\n    z-index: 0\n}\n\ndialog, select {\n    border: transparent\n}\n\nselect {\n    font-family: inherit\n}\n\nselect:hover {\n    cursor: pointer\n}\n\noption {\n    font-family: inherit\n}\n\n:is(p, h1, h2, h3, h4, h5, h6, span):empty {\n    display: none !important\n}\n\ninput[type=file] {\n    --file-selector-display: initial;\n    --file-selector-width: 80px;\n    --file-selector-height: 21px\n}\n\ninput[type=file]::file-selector-button {\n    display: var(--file-selector-display);\n    height: var(--file-selector-height);\n    width: var(--file-selector-width)\n}\n\ninput[type=color] {\n    --color-swatch-display: inline-block;\n    --color-swatch-height: 100%;\n    --color-swatch-border-width: 1px;\n    --color-swatch-border-color: currentColor;\n    background-color: transparent\n}\n\ninput[type=color]::-moz-color-swatch {\n    border: var(--color-swatch-border-width) solid var(--color-swatch-border-color);\n    display: var(--color-swatch-display);\n    height: var(--color-swatch-height)\n}\n\ninput[type=color]::-webkit-color-swatch {\n    border: var(--color-swatch-border-width) solid var(--color-swatch-border-color);\n    display: var(--color-swatch-display);\n    height: var(--color-swatch-height)\n}\n\ninput[type=search] {\n    --cancel-button-display: initial;\n    --results-button-display: initial\n}\n\ninput[type=search]::-webkit-search-cancel-button {\n    display: var(--cancel-button-display)\n}\n\ninput[type=search]::-webkit-search-results-button {\n    display: var(--results-button-display)\n}\n\ninput[type=number] {\n    --inner-spin-appearance: auto;\n    --outer-spin-appearance: auto;\n    --moz-appearance: initial;\n    -moz-appearance: var(--moz-appearance)\n}\n\ninput[type=number]::-webkit-inner-spin-button {\n    -webkit-appearance: var(--inner-spin-appearance);\n    appearance: var(--inner-spin-appearance)\n}\n\ninput[type=number]::-webkit-outer-spin-button {\n    -webkit-appearance: var(--outer-spin-appearance);\n    appearance: var(--outer-spin-appearance)\n}\n\ninput[type=range] {\n    --track-width: 160px;\n    --track-height: 20px;\n    --track-bg: #e9e9ed;\n    --track-appearance: none;\n    --thumb-appearance: none;\n    --thumb-bg: #484851;\n    --thumb-border-color: #fff;\n    --thumb-border-width: 0px;\n    --thumb-border-radius: 100vmax;\n    --thumb-width: 15px;\n    --thumb-height: 15px;\n    --inner-track-size: calc(var(--track-width));\n    --inner-track-offset: calc(var(--track-width)*-1 - var(--thumb-width)/2);\n    --inner-track-bg: #2374ff;\n    -webkit-appearance: var(--track-appearance);\n    -moz-appearance: var(--track-appearance);\n    appearance: var(--track-appearance);\n    background-color: var(--track-bg);\n    border-radius: var(--thumb-border-radius);\n    overflow: hidden\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n    background-color: var(--track-bg);\n    height: var(--track-bg);\n    width: var(--track-width)\n}\n\ninput[type=range]::-moz-range-track {\n    background-color: var(--track-bg);\n    height: var(--track-bg);\n    width: var(--track-width)\n}\n\ninput[type=range]::-webkit-slider-thumb {\n    appearance: var(--thumb-appearance);\n    -webkit-appearance: var(--thumb-appearance);\n    background-color: var(--thumb-bg);\n    border: var(--thumb-border-width) solid var(--thumb-border-color);\n    border-radius: var(--thumb-border-radius);\n    box-shadow: var(--inner-track-offset) 0 0 var(--inner-track-size) var(--inner-track-bg);\n    color: var(--thumb-bg);\n    height: var(--thumb-height);\n    width: var(--thumb-width)\n}\n\ninput[type=range]::-moz-range-thumb {\n    -moz-appearance: var(--thumb-appearance) !important;\n    appearance: var(--thumb-appearance) !important;\n    background-color: var(--thumb-bg);\n    border: var(--thumb-border-width) solid var(--thumb-border-color);\n    border-radius: var(--thumb-border-radius);\n    box-shadow: var(--inner-track-offset) 0 0 var(--inner-track-size) var(--inner-track-bg);\n    height: var(--thumb-height);\n    width: var(--thumb-width)\n}\n\n\n    \n:host {\n    --bg-primary: hwb(0 100% 0%);\n    --bg-secondary: #f0efef;\n    --bg-tertiary: #676767;\n\n    --bg-radio-button: #48c848;\n\n    --bg-canvas: white;\n\n    --color-primary: black;\n    --color-secondary: gray;\n\n    --scrollbar-track-bg-color: white;\n\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0;\n\n    --selection-bg-color: hwb(240 0% 0%);\n    --selection-color: white;\n}\n\n::backdrop {\n    --backdrop-bg-color: rgba(255, 255, 255, 0.5);\n\n    --scrollbar-track-bg-color: white;\n\n    --scrollbar-thumb-bg-color: #545454;\n    --scrollbar-thumb-bg-color--hover: #757575;\n    --scrollbar-thumb-bg-color--active: #b0b0b0;\n}\n\n    \n\n@media(prefers-color-scheme:dark) {\n\n    :host {\n        --bg-primary: black;\n        --bg-secondary: #232323;\n        --bg-tertiary: #7a7a7a;\n\n        --color-primary: white;\n\n        --scrollbar-track-bg-color: black;\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f;\n\n        --selection-bg: #838383;\n        --selection-color: white;\n\n        --selection-bg-color: orange;\n        --selection-color: black;\n    }\n\n\n    ::backdrop {\n        --backdrop-bg-color: rgba(0, 0, 0, 0.5);\n\n        --scrollbar-track-bg-color: black;\n\n        --scrollbar-thumb-bg-color: #ababab;\n        --scrollbar-thumb-bg-color--hover: #8a8a8a;\n        --scrollbar-thumb-bg-color--active: #4f4f4f;\n    }\n}\n\n\n    /* Actual CSS style for the web component*/\n    \n\n.draggable-element {\n    align-items: center;\n    background-color: var(--bg-primary);\n    border-radius: calc(var(--container-border-radius) - var(--padding-container));\n    display: flex;\n    height: 50px;\n    justify-content: space-between;\n    overflow: hidden;\n    width: 100%;\n    padding: 5px;\n}\n\n.draggable-element.dragging{\n  filter: invert(100%) hue-rotate(180deg);\n}\n\n.draggable-element__image {\n    aspect-ratio: 1/1;\n    border-radius: 50%;\n    height: 35px;\n    -o-object-fit: cover;\n    object-fit: cover;\n    -o-object-position: center;\n    object-position: center;\n}\n\n.draggable-element__icon-container {\n  background-color: var(--bg-primary);\n  border-radius: 8px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  filter: invert(100%) hue-rotate(180deg);\n  gap: 0;\n  height: 100%;\n  width: 15%;\n}\n\n.draggable-element__icon-container:hover {\n    cursor: grab;\n}\n\n.draggable-element__icon-container:active {\n    cursor: grabbing;\n}\n\n.draggable-element__icon {\n    scale: 250%;\n}\n\n.draggable-element__text-image-container {\n    align-items: center;\n    display: flex;\n    gap: 20px;\n    width: 75%;\n}\n\n.draggable-element__paragraph{\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n@media(prefers-color-scheme:dark){\n  .draggable-element__image{\n    filter: invert(100%) hue-rotate(180deg);\n  }\n}\n\n  </style>\n  \n  \n  <div class="draggable-element">\n      <div class="draggable-element__icon-container">\n          <svg class="draggable-element__icon no-pointer-events" xmlns="http://www.w3.org/2000/svg" width="16"\n              height="16" fill="var(--color-primary)">\n              <path\n                  d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z">\n              </path>\n          </svg>\n      </div>\n      <div class="draggable-element__text-image-container">\n          <img class="draggable-element__image" src=""  alt=""/>\n          <p class="draggable-element__paragraph">Name 1234</p>\n      </div>\n  </div>\n\n';class D extends HTMLElement{constructor(){super();const n=this.attachShadow({mode:"open"}),e=E.content.cloneNode(!0);n.appendChild(e),this.enableDragging=this.enableDragging.bind(this),this.disableDragging=this.disableDragging.bind(this),this.addDraggingClass=this.addDraggingClass.bind(this),this.removeDraggingClass=this.removeDraggingClass.bind(this)}get name(){return C("name",this)}set name(n){_("name",n,this)}get imageUrl(){return C("image-url",this)}set imageUrl(n){_("image-url",n,this)}static get observedAttributes(){return["name","image-url"]}enableDragging(n){_("draggable",!0,this)}disableDragging(n){_("draggable",!1,this)}addDraggingClass(n){var e;e="dragging",this.classList.add(e)}removeDraggingClass(n){var e;_("draggable",!1,this),e="dragging",this.classList.remove(e)}connectedCallback(){const r=x(".draggable-element__icon-container",this.shadowRoot);r.addEventListener("pointerdown",this.enableDragging),r.addEventListener("pointerup",this.disableDragging),this.addEventListener("dragstart",this.addDraggingClass),this.addEventListener("touchstart",this.addDraggingClass),this.addEventListener("dragend",this.removeDraggingClass),this.addEventListener("touchend",this.removeDraggingClass);const t=x(".draggable-element__image",this.shadowRoot);t.addEventListener("load",(e=>{n("Loaded image!",e,t)})),t.addEventListener("error",(n=>{e("Image has an error!",n,t)}))}disconnectedCallback(){const n=x(".draggable-element__icon-container",this.shadowRoot);n.removeEventListener("pointerdown",this.enableDragging),n.removeEventListener("pointerup",this.disableDragging),this.addEventListener("dragstart",this.addDraggingClass),this.addEventListener("touchstart",this.addDraggingClass),this.addEventListener("dragend",this.removeDraggingClass),this.addEventListener("touchend",this.removeDraggingClass);x(".draggable-element__image",this.shadowRoot)}attributeChangedCallback(e,r,t){switch(n(this),e){case"name":x(".draggable-element__paragraph",this.shadowRoot).textContent=t;break;case"image-url":{const e=x(".draggable-element__image",this.shadowRoot);""===t?(n("has no URL!"),e.src="./public/jpg/random-photo.jpg"):e.src=t,e.alt=this.name;break}}}}function L(n){n.preventDefault();const e=n.currentTarget,r="dragover"===n.type?n.clientY:n.touches[0].clientY,t=x(".dragging");if(!t)throw new Error("No draggable was found!");const a=function(n,e,r=!0){const t=function(n,e){return e?e.tagName.includes("-")?Array.from(e.shadowRoot.querySelectorAll(n)):Array.from(e.querySelectorAll(n)):Array.from(document.querySelectorAll(n))}(".index__draggable:not(.dragging)",n);let a=null,o=Number.NEGATIVE_INFINITY;for(const n of t){const t=n.getBoundingClientRect(),{top:i,height:l,left:s,width:c}=t,d=r?e-(i+l/2):e-(s+c/2);d<0&&d>o&&(o=d,a=n)}return a}(e,r);null===a?e.appendChild(t):e.insertBefore(t,a)}customElements.define("draggable-element",D),n("Hello world!"),function(){const n=(e="index__container",r?(null===(t=null==r?void 0:r.tagName)||void 0===t?void 0:t.includes("-"))?Array.from(r.shadowRoot.getElementsByClassName(e)):Array.from(r.getElementsByClassName(e)):Array.from(document.getElementsByClassName(e)));var e,r,t;for(const e of n)e.addEventListener("dragover",L),e.addEventListener("touchmove",L)}()})()})();