const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

const port = 3000;
// const users = require("./MOCK_DATA.json");

//connect to database mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/aayush")
  .then(() => {
    console.log("database connected succesfully ");
  })
  .catch((err) => {
    console.log(err);
  });

//schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

//model create
const User = mongoose.model("user", userSchema);

//ROUTES

//middelware -plugin
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  //   return res.json(users);
  const alldbUsers = await User.find({});

  const html = `
<ul>
<li> ${alldbUsers
    .map((user) => `<li>${user.firstName} : ${user.email}</li>`)
    .join(" ")}</li>
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

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "user not found" });
  // const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", async (req, res) => {
  // creare a new user and add them
  const body = req.body;
  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  console.log(result);
  return res.status(201).json({ message: "create a new user" });
  /*************using mongoose we can add things ******************** */

  // users.push({...body,id:users.length+1});
  // fs.writeFile('./Mock_data.json', JSON.stringify(users), (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else{
  //     return res.json({ message: "create a new user" });
  //   }
  // });
});

app.patch("/api/users/:id", async (req, res) => {
  // creare a new user and add them
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ message: "update a user" });
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "delete a user" });
});

app.listen(port, () => {
  console.log("server has running on port : " + port);
});
