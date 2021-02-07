$(document).on("click", ".comment-reply", (e) => {
    const target = $(e.target);

    if(target.closest(".col-sm-11").find(".input-comment-box").length){
        return;
    }
    const comment_idx = target.find("input[name='comment-idx']").val();
    const user_image = $("input[name='user-image']").val();

    target.closest(".col-sm-11").append(replyInputFormHTML(user_image, comment_idx));
})