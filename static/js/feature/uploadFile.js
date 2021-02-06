function sendFileToServer(upload_file){
    fetch("/upload", {
        method : "POST",
        body : upload_file
    })
}