function CircleShape(canvas, context, circles) {
    this.circles = circles;
    this.radius = 50;

    this.id = circles.length;
    this.context = context;
    this.canvas = canvas;

    this.initialize = function() {
      var i = 0, circle;

      while (i < circles.length, circle = circles[i]) {
          this.addCircleToCanvas(circle.x, circle.y, circle.radius);
          i ++;
      }
    }

    this.addNewShape = function(x, y) {
        this.circles.push({
            id: this.id,    // some ID
            x: x,
            y: y,
            radius: this.radius
        });

        this.addCircleToStorage();
        this.id ++;
        this.addCircleToCanvas(x, y, this.radius);
    }


    this.updateShapePosition = function(x, y, selectedItemIndex) {
        this.removeCircleFromCanvas(
          this.circles[selectedItemIndex].x,
          this.circles[selectedItemIndex].y,
          this.circles[selectedItemIndex].radius
        );
       this.updateCirclePosition(x, y, selectedItemIndex);
       this.addCircleToCanvas(x, y, this.circles[selectedItemIndex].radius);
       this.UpdateCircleInStorage();
    }

    this.removeShape = function(x, y, radius, selectedItemIndex) {
        this.removeCircleFromCanvas(x, y, radius);
        this.removeCircleFromArray(selectedItemIndex);
        this.UpdateCircleInStorage();
    }

    this.isOverlapping = function (e) {
        var rect = this.canvas.getBoundingClientRect(),  // make x/y relative to canvas
          x = e.clientX - rect.left,
          y = e.clientY - rect.top,
          index = 0, circle;

        // check which circle:
        if (this.circles.length > 0) {
          while(circle = this.circles[index]) {
              this.context.beginPath();  // we build a path to check with, but not to draw
              this.context.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
              if (this.context.isPointInPath(x, y)) {
                    return index;
              }
              index ++;
          }
        }
        return -1;
    }

    this.editShape = function (radius, index) {
        this.removeCircleFromCanvas(this.circles[index].x, this.circles[index].y, this.circles[index].radius);
        this.addCircleToCanvas(this.circles[index].x, this.circles[index].y, radius);
        this.circles[index].radius = radius;

        this.UpdateCircleInStorage();
    }

    this.addCircleToCanvas = function(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    this.addCircleToStorage = function() {
        //this.removeCircleFromStorage(this.circles);
        localStorage.setObject('circles', this.circles);
    }

    this.UpdateCircleInStorage = function() {
        localStorage.setObject('circles', this.circles);
    }

    this.removeCircleFromCanvas = function(x, y, radius) {
      this.context.beginPath();
      this.context.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
      this.context.closePath();
    }

    this.removeCircleFromArray = function(selectedItemIndex) {
      if (selectedItemIndex > -1) {
        circles.splice(selectedItemIndex, 1);
      }
    }

    this.updateCirclePosition = function(x, y, selectedItemIndex) {
      circles[selectedItemIndex].x = x;
      circles[selectedItemIndex].y = y;
    }
}
