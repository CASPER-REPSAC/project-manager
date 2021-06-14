const menu_list = {
    "Summary" : "summary",
    "All Projects" : "all_projects",
    "All Comments" : "all_comments",
    "Popular Projects" : "popular_projects"
}

$(document).ready(async () => {
    const writer = $("input[name='writer']").val();
    const result = await getData(writer, menu_list[Object.keys(menu_list)[0]]);
    showData(Object.values(menu_list), menu_list[Object.keys(menu_list)[0]], result);
})

$(document).on("click", ".nav-link", async (e) => {
    $(".menu-result-project").children().remove();
    $(".menu-result-comment").children().remove()

    const writer = $("input[name='writer']").val();
    const selected_menu = $(e.target).text();

    const result = await getData(writer, menu_list[selected_menu]);
    showData(Object.values(menu_list), menu_list[selected_menu], result);
})

const getData = async (writer, menu) => {
    return await(
        fetch(`/profile/${writer}`, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"option" : menu})
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
    );
}

const showData = (menu_list, menu, data) =>{
    if(menu == menu_list[0]){
        for(let i=0; i<data.posts.length; i++){
            data.posts[i].user_image = $("input[name='user_image']").val();
            $(".menu-result-project").append(projectBoxHTML(data.posts[i]));
        }
        for(let i=0; i<data.comments.length; i++){
            data.comments[i].user_image = $("input[name='user_image']").val();
            $(".menu-result-comment").append(commentBoxHTML(data.comments[i]));
        }
    }
    else if(menu == menu_list[1]){
        for(let i=0; i<data.posts.length; i++){
            data.posts[i].user_image = $("input[name='user_image']").val();
            $(".menu-result-project").append(projectBoxHTML(data.posts[i]));
        }
    }
    else if(menu == menu_list[2]){
        for(let i=0; i<data.comments.length; i++){
            data.comments[i].user_image = $("input[name='user_image']").val();
            $(".menu-result-comment").append(commentBoxHTML(data.comments[i]));
        }
    }
    else if(menu == menu_list[3]){
        for(let i=0; i<data.posts.length; i++){
            data.posts[i].user_image = $("input[name='user_image']").val();
            $(".menu-result-project").append(projectBoxHTML(data.posts[i]));
        }
    }
}