var contextMenus = document.getElementById("context-menus");
var canvasContext = new CanvasContext(contextMenus);
var canvas = canvasContext.canvas;
var context = canvasContext.context;
var shapes = [];

var registerCircle = function(contextMenus, canvas, context, shapes, canvasContext) {
  var circles = localStorage.getObject('circles');

  if (circles == null) circles = [];

  circleContext = new CircleContext(contextMenus, canvas, context, circles);
  canvasContext.addNewContext(circleContext);
  circleContext.initialize();
  shapes.push(circleContext);
}

registerCircle(contextMenus, canvas, context, shapes, canvasContext);
main(canvasContext, shapes);
