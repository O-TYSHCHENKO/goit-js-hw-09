!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.disabled=!0;var n,o=!1;function a(n){t.disabled=n,e.disabled=!n}t.addEventListener("click",(function(){a(o=!0),n=setTimeout((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){o&&(o=!1,clearInterval(n),a(o))}))}();
//# sourceMappingURL=01-color-switcher.858e3237.js.map
