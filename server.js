const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-cheekgbhp8ubgo1e84b0-a.oregon-postgres.render.com',
        port: 5432,
        user: 'daga',
        password: "0e4O3hmdwZ7RcuJhk3ZFBgabvSP8zfMz",
        database: 'test_xtvz',
        ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.send('success')})
app.post("/signin", signin.handleSignin(db,bcrypt))
app.post("/register",register.handleRegister(db,bcrypt))
app.get("/profile/:id",profile.handleProfileGet(db))
app.put("/image",image.handleImage(db));
app.post("/imageurl", upload.single('imageData'), image.handleApiCall);

const PORT = process.env.PORT || 3001;
console.log("process.env.PORT", process.env.PORT)
app.listen(PORT, () => {console.log(`app is running port ${PORT},`)});
console.log("process.env.PORT", process.env.PORT)
