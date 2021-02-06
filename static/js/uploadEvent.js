$("input[type='file']").on("change", () => {
    const upload_file = new FormData();
    
    upload_file.append("file", $("input[type='file']")[0].files[0]);
    sendFileToServer(upload_file);
})