$(document).on("click", ".nav-link", async (e) => {
    const selected_menu = $(e.target).text();
    const menu_list = {
        "Summary" : "summary",
        "All Projects" : "all_projects",
        "All Comments" : "all_comments",
        "Popular Projects" : "popular_projects"
    }

    await getData(menu_list[selected_menu]);
})

const getData = async (menu) => {
    
}