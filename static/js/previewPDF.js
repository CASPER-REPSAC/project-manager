const initPDF = async (path) => {
    try {
        _PDF_DOC = await pdfjsLib.getDocument({url: path});
    }
    catch(error) {
        alert(error.message);
    }

    _TOTAL_PAGES = _PDF_DOC.numPages;
    for(let i=1; i<_TOTAL_PAGES+1; i++){
        $(".pdf-preview").append(pdfPreviewHTML(230, i));
        showPage(i, $(".pdf-to-image-canvas")[i-1]);
        // $(".pdf-to-image-canvas").css("display", "");
    }
}