const express = require("express");
const path = require("path");
const port = 9898;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); //Middelware to read send data
app.use(express.static("assets"));

// MiddleWare 1
app.use(function (req, res, next) {
  req.MyName = "rohit";
  console.log("Inside Middleware 1");
  next();
});

// middleware 2
app.use(function (req, res, next) {
  console.log("Inside Middleware 2");
  console.log("My used in middle ware 2 :", req.MyName);
  next();
});

var contactList = [
  {
    name: "Rohit",
    phone: "8700437957",
  },
  {
    name: "Deepak",
    phone: "9582399500",
  },
  {
    name: "Aniket",
    phone: "9350608900",
  },
];

app.get("/", function (req, res) {
  console.log("My used in / controller :", req.MyName);
  // console.log(req.body)

  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("there is a error in fetching db");
      return;
    } else {
      return res.render("index", {
        title: "Contacts List",
        contact_list: contacts,
      });
    }
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "Practice Page",
  });
});

app.post("/create_contact", function (req, res) {
  // console.log(req.body)

  // contactList.push({
  //     name:name,
  //     phone:phone
  // })

  // contactList.push(req.body)

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact");
        return;
      } else {
        console.log("**********", newContact);
        return res.redirect("back");
      }
    }
  );

  //   return res.redirect("/practice");
});

app.get("/delete_contact", function (req, res) {
  // String Param
  // console.log(req.params);
  // let phone = req.params.phone;

  // Query params
  // console.log(req.query)
  let id = req.query.id

  Contact.findByIdAndDelete(id,function(err){
    if(err){
      console.log('Error in deleteing an ubject from db')
      return
    }else{
      return res.redirect('back')
    }
  })

});

app.listen(port, function (error) {
  if (error) {
    console.log("this is the error", error);
  } else {
    console.log("server is up and running on port ", port);
  }
});
