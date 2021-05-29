let api = require("../utils/api").api;
let axios = require("axios");
let inferciaKey = require("./infermedica").getInferMecdicaKey();
let appId = inferciaKey["APP-ID"];
let appKey = inferciaKey["App-Key"];
let env = require("./environment");
class ChatBot {
  constructor(chatRoom) {
    this.question = {};
    this.chatRoom = chatRoom;
    this.urls = api().diagnosis;
    this.evidence = [];
    this.stop;
    this.triage;
    this.age;
    this.gender;
    this.headers = {
      "content-type": "application/json",
      "APP-ID": appId,
      "App-Key": appKey,
    };
  }

  fetchDataForBot(evidence) {
    let newAge = parseInt(this.age);
    let newData = { sex: this.gender, age: newAge, evidence: evidence };
    return axios.post(this.urls, newData, {
      headers: this.headers,
    });
  }
  handleStop() {
    let newAge = parseInt(this.age);
    let newData = { sex: this.gender, age: newAge, evidence: this.evidence };
    return axios
      .post(api().triage, newData, {
        headers: this.headers,
      })
      .then((data) => {
        {
          this.triage = data.data;
        }
      });
  }
  handleGroupMultiple(data) {
    this.question.text = data.text;
    this.question.type = data.type;
    this.question.items = [];
    data.items.forEach((item) => {
      let newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      this.question.items.push(newItem);
    });
  }
  handleSingle(question) {
    this.question.text = question.text;
    this.question.type = question.type;
    this.question.items = [];
    question.items.forEach((item) => {
      let newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      this.question.items.push(newItem);
    });
  }
  async transformDataToQuestion(data, type) {
    this.stop = data.should_stop;
    if (!this.stop) {
      if (type == "group_multiple") this.handleGroupMultiple(data.question);
      if (type == "single") this.handleSingle(data.question);
      if (type == "group_single") this.handleSingle(data.question);
    } else {
      await this.handleStop();
    }
  }
  matchChoiceToValue(value) {
    if (value) return "present";
    else return "absent";
  }
  handleEvidence(data) {
    this.evidence = [];
    data.forEach((element) => {
      let choice_id = this.matchChoiceToValue(element.value);
      this.evidence.push({ id: element.id, choice_id: choice_id });
    });

    if (!this.stop) {
      return this.fetchDataForBot(this.evidence).then(async (res) => {
        if (res.data.question)
          this.transformDataToQuestion(res.data, res.data.question.type);
        else await this.transformDataToQuestion(res.data);
      });
    }
  }
  proccessData(data) {
    return this.handleEvidence(data.data);
  }
}

class ChatEngine {
  beginInitialRounds() {
    let self = this.chatBot;
    return this.chatBot.fetchDataForBot([]).then((data) => {
      self.transformDataToQuestion(data.data, data.data.question.type);
    });
  }

  connectionHandler = (socketServer) => {
    this.io = require("socket.io")(socketServer, {
      cors: {
        origin: env.chatBotOrigin,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    let self = this;

    this.io.sockets.on("connection", function (socket) {
      socket.on("disconnect", function () {
        console.log("disconnected");
      });
      // socket.on("persistingConnection", function (data) {});

      socket.on("joinChat", function (data) {
        socket.join(data.chatRoom);
        self.chatRoom = data.chatRoom;
        self.chatBot = new ChatBot(self.chatRoom);
        self.chatBot.gender = data.gender;
        self.chatBot.age = data.age;
        self.beginInitialRounds().then((data) => {
          self.io.in(self.chatRoom).emit("chatBotActivated", {
            data: self.chatBot.question,
            type: self.chatBot.question.type,
          });
        });
      });
      socket.on("sendAns", function (data) {
        self.chatBot.proccessData(data).then(() => {
          if (!self.chatBot.triage) {
            self.io.in(self.chatRoom).emit("setQuestion", {
              data: self.chatBot.question,
              type: self.chatBot.question.type,
            });
          } else {
            self.io.in(self.chatRoom).emit("triage", {
              data: self.chatBot.triage,
              type: "triage",
            });
          }
        });
      });
    });
  };
}

module.exports.chatSockets = function (socketServer) {
  let newChatEngine = new ChatEngine();
  newChatEngine.connectionHandler(socketServer);
};
