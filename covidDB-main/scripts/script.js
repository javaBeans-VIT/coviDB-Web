class testChatApp {
  constructor(email, chatAppId) {
    this.chatAppId = chatAppId;
    this.email = email;
    this.socket = io.connect("http://localhost:5000");
    if (this.email) {
      this.socket.on("connect", function () {
        console.log("established connection");
      });
    }
  }
}

new testChatApp("mad@123", "123");
