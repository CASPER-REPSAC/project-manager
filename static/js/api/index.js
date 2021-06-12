let idx = 1;

$(document).ready(() => {
    getContent(1);
    idx++;
})

$(document).on("click", ".load-more-btn", () => {
    const html = $(".load-more-btn").html();
    $(".load-more-btn").text("Loading...");
    getContent(idx);
    idx++;
    $(".load-more-btn").html(html);
})

const getContent = (idx) => {
    fetch(`/api/index?idx=${idx}`)
    .then((res) => res.json())
    .then(data => {
        if(data.length == 0){
            const html = $(".load-more-btn").html();
            $(".load-more-btn").text("No Data...");
            setTimeout(() => {
                $(".load-more-btn").html(html);
            }, 1000);
            return;
        }
        data.forEach(d => {
            $(".project-list").append(projectBoxHTML(d));
        })
    })
}