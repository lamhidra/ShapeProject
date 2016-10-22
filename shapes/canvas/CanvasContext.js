var CanvasContext = function(contextMenus) {
  var canvas_context_menu = "canvas-context-menu";
  var canvas_context_menu_items = "canvas-context-menu__items";
  var canvas_context_menu_item = "canvas-context-menu__item";
  var canvas_context_menu_addCircle_link = "canvas-context-menu__link"

   contextMenus.innerHTML += '<nav id="' + canvas_context_menu + '" ' + 'class="' + canvas_context_menu + ' css-context-menu" >' +
      ' <ul class="' + canvas_context_menu_items  + ' css-context-menu__items"> ' +
        ' <li class="' + canvas_context_menu_item + ' css-context-menu__item"> ' +
          ' <a href="#" class="' + canvas_context_menu_addCircle_link + ' css-context-menu__link "'+  'data-action="addCircle"> ' +
            ' <i class="fa fa-eye"></i> Add circle ' +
          ' </a> ' +
        ' </li> ' +
       ' </ul> ' +
      ' </nav> ';

  var links = [canvas_context_menu_addCircle_link];


  this.canvas = document.getElementById('canvas');
  this.context = this.canvas.getContext('2d');

  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  var canvasClassName = 'canvas';


  var contextMenuActive = "css-context-menu--active";
  var menuState = 0;
  var shapeContexts = [];

  this.addNewContext = function(context) {
      shapeContexts.push(context);
  }

  this.actionClicked = function(e) {
    var link, i = 0;
    while ( i < links.length, link = links[i] ) {
      var clickeElIsLink = clickInsideElement( e, link );

      if ( clickeElIsLink ) {
          this.menuItemListener(clickeElIsLink, e);
        break;
      }
      i ++;
    }
    return i == links.length ? true: false
  }

  this.isOverlapping = function(e) {
      return clickInsideElement( e, canvasClassName );
  }

  this.toggleMenuOn = function(e, menu) {
        e.preventDefault();
        menu.classList.add("css-context-menu--active");
        console.log(menu);
       positionMenu(e, menu);
  }

 this.toggleMenuOff = function(menu) {
      menu.classList.remove(contextMenuActive);
 }

 this.menuItemListener = function( link, e ) {
      console.log("Task action - " + link.getAttribute("data-action"));
      if (link.getAttribute("data-action") === "addCircle") {
            shapeContexts[0].addNewShape(e.clientX, e.clientY, 50);
      }
  }
}
