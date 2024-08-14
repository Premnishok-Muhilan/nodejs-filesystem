//Node JS Filesystem task

//import the express module
const express = require("express");

//import the fs module
const fs = require("fs");

//create an express application
const app = express();

//Define route handler
//Avoiding this would result in "Cannot GET /" error
app.get("/", (request, response) => {
  response.send("Hello using experss JS");
});

//Route handle for create file
app.get("/createFile", (request, response) => {
  const now = new Date();
  const readableTimestamp = now.toISOString();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const date = year + month + day;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = hours + minutes + seconds;

  const fileFormat = date + "-" + time;

  fs.writeFile(`./TextFiles/${fileFormat}.txt`, `${readableTimestamp}`, () => {
    response.send(
      `File created successfully with file name ${fileFormat} and file content ${readableTimestamp}`
    );
  });
});

//Route handle to get files
app.get("/getFiles", (request, response) => {
  const folderPath = "./TextFiles";
  const arr = fs.readdirSync(folderPath);

  // Convert array to a newline-separated string
  const arrString = arr.join("\n");

  response.send(`<pre>${arrString}</pre>`);
});

//start the server and listen on port
app.listen(3001, () => {
  console.log("Express server listening on port 3001");
});
