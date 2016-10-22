var CircleContext = function(contextMenus, canvas, context, circles) {

  var circle_context_menu = "circle-context-menu";
  var circle_context_menu_items = "circle-context-menu__items";
  var circle_context_menu_item = "circle-context-menu__item";
  var circle_context_menu_delete_link = "circle-context-menu-delete__link";
  var circle_context_menu_edit_link = "circle-context-menu-edit__link";

  contextMenus.innerHTML +=  '<nav id="' + circle_context_menu + '" ' + 'class="' + circle_context_menu + ' css-context-menu" >' +
     ' <ul class="' + circle_context_menu_items  + ' css-context-menu__items"> ' +
       ' <li class="' + circle_context_menu_item + ' css-context-menu__item"> ' +
         ' <a href="#" class="' + circle_context_menu_delete_link + ' css-context-menu__link "'+  'data-action="deleteCircle"> ' +
           ' <i class="fa fa-eye"></i> Delete circle ' +
         ' </a> '+
       ' </li> ' +
       ' <li class="' + circle_context_menu_item + ' css-context-menu__item"> ' +
           ' <a href="#" class="' + circle_context_menu_edit_link + ' css-context-menu__link "'+  'data-action="editCircle"> ' +
            ' <i class="fa fa-eye"></i> Edit circle ' +
           ' </a> ' +
       ' </li> ' +
      ' </ul> ' +
     ' </nav> ';

  var links = ["circle-context-menu-delete__link", "circle-context-menu-edit__link"];

  var circleMenu = document.querySelector("#circle-context-menu");;

  var circleShape = new CircleShape(canvas, context, circles);
  var circles = circleShape.circles;

  this.initialize = function() {
    circleShape.initialize();
  }

  this.addNewShape = function(x, y) {
      circleShape.addNewShape(x, y);
  }

  this.updateShapePosition = function(x, y, selectedItemIndex) {
      circleShape.updateShapePosition(x, y, selectedItemIndex);
  }

  this.isOverlapping = function (e) {
      return circleShape.isOverlapping(e);
  }

  this.editShape = function (radius, index) {
      circleShape.editShape(radius, index);
  }

  this.removeShape = function(x, y, radius, selectedItemIndex) {
      circleShape.removeShape(x, y, radius, selectedItemIndex);
  }

  this.toggleMenuOn = function(e) {
      e.preventDefault();
      circleMenu.classList.add("css-context-menu--active");
      positionMenu(e, circleMenu);
  }

  this.toggleMenuOff = function() {
      circleMenu.classList.remove("css-context-menu--active");
  }

  this.actionClicked = function(e, index) {
    var link, i = 0;
    while ( link = links[i] ) {
      var clickeElIsLink = clickInsideElement( e, link );

      if ( clickeElIsLink ) {
          this.menuItemListener(clickeElIsLink, e, index);
        break;
      }
      i ++;
    }
  }

  this.menuItemListener = function( link, e, index) {
      //console.log("Task action - " + link.getAttribute("data-action"));
      if ( link.getAttribute("data-action") == "deleteCircle" ) {
            this.removeShape(
              circles[index].x,
              circles[index].y,
              circles[index].radius,
              index
            );
      } else if ( link.getAttribute("data-action") == "editCircle" ) {
          var radius = prompt("Enter new radius", "50");
          if (radius) this.editShape(radius, index);
      }
  }
}
