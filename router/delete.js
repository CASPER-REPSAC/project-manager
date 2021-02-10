const express = require("express");
const router = express.Router();

const checkOwner = require("../feature/checkOwner");

router.delete("/post/:idx", async (req, res) => {
    const post_idx = req.params.idx;
    // 한글
    //if(await checkOwner.post(req.session))
})

module.exports = router;