var pdf_total_page;

function sendFileToServer(upload_file){
    fetch("/upload", {
        method : "POST",
        body : upload_file
    })
    .then(res => res.json())
    .then(async (res) => {
        alert(res.message);
        // pdf_total_page = await getTotalPage(res.path);
        // setTotalPage(pdf_total_page);
        $(".select-project-file").addClass("animate__animated animate__fadeOutDown");
        setTimeout(() => {
            $(".select-project-file").hide();
            
            $(".input-detail").show();
            $(".input-detail").addClass("animate__animated animate__fadeIn");

            initPDF(res.path);
        },1000);
    })
}