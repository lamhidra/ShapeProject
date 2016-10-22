function messageHandler(e) {
  var args = e.data;

  if (args.Command === "setObject") {
      args.localStorage.setObject(args.Type, args.Array);
  } else if (args.Command === "getObject") {
      postMessage(args.localStorage.getObject(args.Type));
  } else if (args.Command === "removeObject") {
      args.localStorage.removeObject(args.Type);
  }
}


addEventListener("message", messageHandler, true);
