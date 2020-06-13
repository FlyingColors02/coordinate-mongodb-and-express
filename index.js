let express = require ("express");
let mongoose = require("mongoose");
let app = express();
let user = require("./routes/user");
app.use(express.json());
app.use("/api/users",user);
let port = process.env.PORT || 4500;

mongoose.connect("mongodb://localhost/CoordinateMongodb&Express", { useNewUrlParser: true , useUnifiedTopology: true})
        .then(()=>console.log("db connected"))
        .catch(error=>console.log("something went wrong",error.message));

app.listen(port,()=>console.log(`port is working on ${port}`));