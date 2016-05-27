class SocketNotification {
  constructor() {
    this.socket = new WebSocket('ws://remark-api.alterego-labs.com/ws');
  }

  listen(onMessageFunc) {
    this.socket.onopen = function() {
      window.console.log('Opened!');
    }
    this.socket.onclose = function() {
      window.console.log('Closed!');
    }
    this.socket.onmessage = function(event) {
      window.console.log(event.data);
      onMessageFunc( JSON.parse(event.data) );
    }
    this.socket.onerror = function(error) {
      window.console.log('Error ' + error);
    }
  }

  close() {
    this.socket.close();
  }
}

export default SocketNotification;
