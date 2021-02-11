$(document).on("click", ".comment-reply", (e) => {
    const $target = $(e.target);

    if($target.closest(".col-sm-11").find(".input-comment-box").length){
        return;
    }
    const comment_idx = $target.find("input[name='comment-idx']").val();
    const user_image = $("input[name='user-image']").val();

    $target.closest(".col-sm-11").append(replyInputFormHTML(user_image, comment_idx));
})

$(document).on("click", ".btn-reply", (e) => {
    const $target = $(e.target);
    const comment_idx = $target.val();
    const reply_content = $target.closest(".input-reply-box").find(".input-reply-content").val();
    const post_idx = $("input[name='post-idx']").val();

    console.log(reply_content);

    if(comment_idx.length == 0 || reply_content.length == 0) { alert("답글 내용을 입력해 주세요."); return; }

    writeReply(comment_idx, reply_content, post_idx);
})