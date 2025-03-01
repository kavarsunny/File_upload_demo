const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

// Ensure the uploads directory exists before configuring Multer
const uploadDir = path.resolve(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage setup with custom filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize Multer
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/upload", upload.single("profileimage"), (req, res) => {
    console.log("Form Data:", req.body);
    console.log("Uploaded File:", req.file);

    res.redirect("/");
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
