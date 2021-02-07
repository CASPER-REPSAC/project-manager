$(".btn-comment").click(() => {
    const comment_content = $(".input-comment-content").val();
    const post_idx = $("input[name='post-idx']").val();

    if(comment_content.length == 0) { alert('댓글 내용을 입력 해주세요.'); return; }

    writeComment(post_idx, comment_content);
})