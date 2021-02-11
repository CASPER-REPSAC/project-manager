function writeReply(comment_idx, reply_content, post_idx){
    fetch("/reply", {
        method : "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            "comment_idx" : comment_idx,
            "reply_content" : reply_content,
            "post_idx" : post_idx
        })
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.result == "success") location.reload();
    })
}