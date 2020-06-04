import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  // Render first part of html
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  // This will progressively render the app
  const stream = renderToNodeStream(reactMarkup);

  // Send all the markup but don't end when is done
  stream.pipe(res, { end: false });

  // When is finished write other part of the html and then cut the connection
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
