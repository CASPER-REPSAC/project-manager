const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

const sendQuery = require("../feature/db");
const feature = require("../feature/check");
const requirement = require("../feature/requirement");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static/uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
}).single("file");

function checkFileType(file, cb){
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('pdf 파일만 허용 됩니다.');
    }
  }


router.post("/upload", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await feature.checkAuth(req, res, data))) return;

    upload(req, res, async (err) => {
        if(err){
            res.json({"result" : "error", "message" : err});
            return;
        }

        const file_path = "/uploads/" + req.file.filename;
        const user_id = req.session.passport.user.id;
        const row = await sendQuery(`SELECT user_id FROM tmp_post_attach WHERE user_id = ?`, [user_id]);

        if(row.length == 0)
            await sendQuery(`INSERT INTO tmp_post_attach (user_id, tmp_path) VALUES (?, ?)`, [user_id, file_path])
        else
            await sendQuery(`UPDATE tmp_post_attach SET tmp_path = ? WHERE user_id = ?`, [file_path, user_id])

        res.json({"result" : "success", "message" : "파일이 업로드 되었습니다.", "path" : file_path});
    })
})

module.exports = router;