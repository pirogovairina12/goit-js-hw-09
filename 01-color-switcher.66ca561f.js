!function(){var t,e={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};e.start.addEventListener("click",(function(){t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.start.setAttribute("disabled","true"),!0})),e.stop.addEventListener("click",(function(){clearInterval(t),e.start.removeAttribute("disabled"),!1}))}();
//# sourceMappingURL=01-color-switcher.66ca561f.js.map
