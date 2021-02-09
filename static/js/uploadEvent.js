$("input[type='file']").on("change", () => {
    const file = $("input[type='file']")[0].files[0];
    const file_ext = getFileExt(file.name);

    if(!fileExtCheck(file_ext)){
        alert("pdf 파일만 허용 됩니다.");
        return;
    }

    const upload_file = new FormData();
    
    upload_file.append("file", file);
    sendFileToServer(upload_file);
})

function getFileExt(file){
    return file.substring(file.lastIndexOf(".") + 1, file.length).toLowerCase();
}

function fileExtCheck(file_ext){
    if(file_ext != "pdf")
        return false;
    return true;
}