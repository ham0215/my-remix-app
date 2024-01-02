import fs from "node:fs";
import https from "node:https";

import { createRequestHandler } from "@remix-run/express";
import express from "express";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

const server = https.createServer(
  {
    key: fs.readFileSync("localhost-key.pem"),
    cert: fs.readFileSync("localhost.pem"),
  },
  app
);

server.listen(3000, () => {
  console.log("App listening on https://localhost:3000");
});