const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const users = require("./MOCK_DATA.json");

//ROUTES

//middelware -plugin
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  //   return res.json(users);

  const html = `
<ul>
<li> ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}</li>
</ul>
`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user1 = users.find((user) => user.id === id);

  const html = `<ul>
    <li>${user1.first_name}</li>
    <li>${user1.last_name}</li>
    <li>${user1.email}</li>
    <li>${user1.first_name}</li>
    <li>${user1.job_title}</li>
    <li>${user1.id}</li>
    </ul>`;

  res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
});

app.post("/api/users", (req, res) => {
  // creare a new user and add them
  const body =req.body;
  users.push({...body,id:users.length+1});
  fs.writeFile('./Mock_data.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
    }
    else{
      return res.json({ message: "create a new user" });
    }
  });
 
  res.json({ message: "create a new user" });
});

app.patch("/api/users/:id", (req, res) => {
  // creare a new user and add them
  res.json({ message: "update a user" });
});

app.delete("/api/users/:id", (req, res) => {
  // creare a new user and add them
  res.json({ message: "delete a user" });
});

app.listen(port, () => {
  console.log("server has running on port : " + port);
});
