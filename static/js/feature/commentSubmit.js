function writeComment(post_idx, comment_content){
    fetch("/comment", {
        method : "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            "post_idx" : post_idx,
            "comment_content" : comment_content
        })
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.result == "success") location.href = res.redirect;
    })
}