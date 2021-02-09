var pdf_total_page;

function sendFileToServer(upload_file){
    fetch("/upload", {
        method : "POST",
        body : upload_file
    })
    .then(res => res.json())
    .then(async (res) => {
        alert(res.message);
        pdf_total_page = await getTotalPage(res.path);
        setTotalPage(pdf_total_page);
    })
}