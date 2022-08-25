require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const {connect} = require("mongoose");
const app = express();
const auth = require("./src/routes/auth");

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(compression());

app.get("/", (req, res) => {
    res.send("Working backend app!\n Created by Azimjon Umarov \n Powered by Qwasar.io");
});

app.use("/api", require("./src/routes/auth"));
app.use("/api", require("./src/routes/user"));
app.use("/api", require("./src/routes/post"));
app.use("/api", require("./src/routes/comment"));
app.use("/api", require("./src/routes/chat"));
app.use("/api", require("./src/routes/message"));


connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err)
        return console.log("   !!! Error occurred !!!\n" + err["message"]);
    app.listen(process.env.PORT, () => {
        console.log(`   *** Listening on port ${process.env.PORT} ***\n     --- Mongodb connected ----`);
    });
});



