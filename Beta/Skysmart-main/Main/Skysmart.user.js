// ==UserScript==
  // @name Skysmart
  // @version 1.0
  
  // @match https://edu.skysmart.ru/*
  // @noframes
  // @run-at document-start
  
  // @grant none
// ==/UserScript==




(async () => {
  // let Main = await import('http://localhost/Apps/Skysmart/Main/Main.js');
  // let Main = await import('https://github-2021-07-12.github.io/Skysmart/Main/Main.js');
  
  Main.main();
})();
