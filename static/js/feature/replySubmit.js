function writeReply(comment_idx, reply_content){
    fetch("/reply", {
        method : "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            "comment_idx" : comment_idx,
            "reply_content" : reply_content
        })
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.result == "success") location.reload();
    })
}