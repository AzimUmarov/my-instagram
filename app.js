require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const {connect} = require("mongoose");
const app = express();


app.use(express.json());
app.use(cors({
    origin : "https://qwasar-instagram.netlify.app",
    credentials:true
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());



app.get("/", (req, res) => {
    res.send("<h2 style='color: red;' >Working backend app!\n Created by Azimjon Umarov \n Powered by Qwasar.io </h2>");
});

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/user", require("./src/routes/user"));
app.use("/api/post", require("./src/routes/post"));
app.use("/api/comment", require("./src/routes/comment"));
app.use("/api/chat", require("./src/routes/chat"));
app.use("/api/message", require("./src/routes/message"));
app.use("/api/hashtag", require("./src/routes/hashtag"));

connect("mongodb+srv://my-basecamp:WORI7eC1hn4i2lI8@cluster0.vpypr.mongodb.net/my-instagram?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err)
        return console.log("   !!! Error occurred !!!\n" + err["message"]);
    app.listen(process.env.PORT || 5000, () => {
        console.log(`   *** Listening on port ${process.env.PORT || 5000} ***\n     --- Mongodb connected ----`);
    });
});
