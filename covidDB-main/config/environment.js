const path = require("path");
const fs = require("fs");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "../productionlogs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});
const development = {
  name: "development",
  dbName: process.env.coviDbName,
  dbPass: process.env.coviDbPass,
  infermeciaAPPID: process.env.infermeciaAPPID,
  infermeciaAppKey: process.env.infermeciaAppKey,
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  optsSecretKey: process.env.optsSecretKey,
  chatBotOrigin: "*",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  dbName: process.env.coviDbName,
  dbPass: process.env.coviDbPass,
  infermeciaAPPID: process.env.infermeciaAPPID,
  infermeciaAppKey: process.env.infermeciaAppKey,
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  optsSecretKey: process.env.optsSecretKey,
  chatBotOrigin: process.env.chatBotOrigin,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

// module.exports = development;

module.exports =
  eval(process.env.NODE_ENV) === undefined
    ? development
    : eval(process.env.NODE_ENV);
