var main = function(canvasContext, shapes) {
      var selectedItemIndex = -1;
      var selectedContextMenuIndex = -1;

      var selectedShape, dragSelectedShape;
      var menu = document.querySelector("#canvas-context-menu");

      var canvas = canvasContext;

      var insideShape = false;
      var shapes = shapes;
      function init() {
          contextMenuListener();
          clickListener();
          keyupListener();
          dragListener();
      }

      function dragListener() {
        document.addEventListener("mousedown", function(e) {

          if (e.button == 0) {
                var i = 0, shape;
                while (i < shapes.length, shape = shapes[i]) {
                  var index  = shape.isOverlapping(e)
                  if ( index != -1 ) {
                      dragSelectedShape = shape;
                      insideShape = true;
                      selectedItemIndex = index;
                      break;
                  }
                  i ++;
                }
          }
        });

        document.addEventListener("mousemove", drag);
        document.addEventListener('mouseup', disengage);
      }

      function drag(e) {
        if (insideShape == true) {
          dragSelectedShape.updateShapePosition(e.clientX, e.clientY, selectedItemIndex);
        }
      }

      var disengage = function() {
        insideShape = false;
        dragSelectedShape = null;
        selectedItemIndex = -1;
      }

      function contextMenuListener() {
        document.addEventListener("contextmenu", function (e) {
            if (selectedShape)
              selectedShape.toggleMenuOff();

            var i = 0, shape, index = -1;

            while (i < shapes.length, shape = shapes[i]) {
              var index  = shape.isOverlapping(e)
              console.log(index)
              if (index > -1) {
                  selectedShape = shape;
                  canvas.toggleMenuOff(menu);
                  selectedContextMenuIndex = index;
                  selectedShape.toggleMenuOn(e);
              }
              i ++;
            }
            if (index == -1) {
              if ( canvas.isOverlapping(e) ) {
                  canvas.toggleMenuOn(e, menu);
              }
            }

        });
      }


      function clickListener() {
        document.addEventListener( "click", function(e) {
            if (selectedShape) {
              selectedShape.actionClicked(e, selectedContextMenuIndex);
              selectedShape.toggleMenuOff();

              selectedShape = null;
            } else if (!canvas.actionClicked(e)) { canvas.toggleMenuOff(menu);}
            else{
              var button = e.which || e.button;
                if ( button === 1 ) {
                  canvas.toggleMenuOff(menu);
                }
            }
        });
      }

      function keyupListener() {
        window.onkeyup = function(e) {
          if ( e.keyCode === 27 ) {
            canvas.toggleMenuOff(menu);
          }
        }
      }

      init();
}
