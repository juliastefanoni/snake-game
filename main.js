(function(){
  let canvas = document.querySelector('[data-js="snake"]');
  let context = canvas.getContext("2d");
  let box = 32;

  function criarBackground(){
    context.fillStyle = "#322E87";
    context.fillRect(0, 0, 16 * box, 16 * box);
  }

  criarBackground();

})();