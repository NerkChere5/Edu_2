// ==UserScript==
  // @name Skysmart
  // @version 1.0
  
  // @match https://edu.skysmart.ru/*
  // @noframes
  // @run-at document-start
  
  // @grant none
// ==/UserScript==




(async () => {
  let Main = await import(https://nerkchere5.github.io/Edu_2/Beta/Skysmart-main/Main/Main.js);
  
  Main.main();
})();
