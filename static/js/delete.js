$(".btn-delete-post").click(() => {
    const post_idx = $("input[name='post-idx']").val();
    deleteData(`/post/${post_idx}`)
})

function deleteData(url){
    fetch(url, {
        method : "delete"
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.result == "success") location.href = res.redirect;
    })
}