import { readFileSync } from "fs"; 'fs';
import app from "./app";
import * as http from "http";
import * as https from "https";

if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
  process.env.NODE_ENV = "development";
} else {
  console.log("Running in production mode");
}

const option = process.env.NODE_ENV === "production" ? {
  key: readFileSync('./ssl/key.pem'),
  cert: readFileSync('./ssl/cert.pem')
} : undefined;

const port: number = Number(process.env.PORT) || 3000;

if (option) {
  https.createServer(option, app).listen(port, () => {
    console.log(`Server listening on the TCP port ${port}, https://localhost:${port}/`);
  });
} else {
  http.createServer(app).listen(port, () => {
    console.log(`Server listening on the TCP port ${port}, http://localhost:${port}`);
  });
}
