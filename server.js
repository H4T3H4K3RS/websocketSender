import { WebSocketServer as Server } from 'ws';

class WebSocketServer {
  constructor () {
    this.wss = new Server ({ port: 8080 });
    this.initialize ();
  }

  initialize () {
    this.wss.on ('connection', this.handleConnection.bind (this));
    this.wss.on ('error', this.handleError.bind (this));
  }

  handleConnection (ws) {
    ws.on ('message', this.handleMessage.bind (this, ws));
  }

  handleMessage (ws, message) {
    console.log (`Received message: ${message}`)
    const letters = [ ...message ];
    const sendLetter = (index) => {
      if (index < letters.length) {
        setTimeout (() => {
          const letter = String.fromCharCode (letters[index]);
          console.log (`Sending letter: ${letter}`);
          ws.send (letter, (error) => {
            if (error) {
              console.error (`Failed to send letter: ${error}`);
            } else {
              sendLetter (index + 1);
            }
          });
        }, 100);
      }
    };

    sendLetter (0);
  }

  handleError (error) {
    console.error (`WebSocket server error: ${error}`);
  }
}

export default WebSocketServer;
