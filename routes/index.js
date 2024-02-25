var express = require("express");
var router = express.Router();
const fs = require("fs");

const Media = require("../models/mediaModel");
var upload = require("./multer").single("avatar");

router.get("/", async function (req, res, next) {
    try {
        const medias = await Media.find();
        res.render("index", { medias: medias });
    } catch (error) {
        res.send(error);
    }
});

router.get("/delete/:id", async function (req, res, next) {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        fs.unlinkSync("./public/images/" + media.avatar);
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});
router.get("/update/:id", async function(req,res,next){
    try {
     const Elem = await Media.findByIdAndUpdate(req.params.id);
     res.render("update",{update:Elem})
    } catch (error) {
     res.send(error)
    }
   });

   router.get('/update/:id', (req, res) => {
    const index = { _id: req.params.id }; // Assuming you have 'index' defined somewhere
    res.render('update', { index: index }); // Passing 'index' to the 'update.ejs' view
  });
   
   router.post("/update/:id",async function(req,res,next){
   try {
     await Media.findByIdAndUpdate(req.params.id,req.body)
     res.redirect('/');
   } catch (error) {
     res.send(error.message)
   }
     
   });

router.post("/upload", function (req, res, next) {
    upload(req, res, async function (err) {
        if (err) throw err;
        try {
            const media = new Media({
                username: req.body.username,
                avatar: req.file.filename,
            });
            await media.save();
            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    });
});

module.exports = router;
