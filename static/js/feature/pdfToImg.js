var _PDF_DOC,
        _CURRENT_PAGE,
        _TOTAL_PAGES,
        _CANVAS = document.querySelector('#pdf-canvas');


async function showPDF(pdf_url) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
    try {
        _PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url }).promise;
    }
    catch(error) {
        alert(error.message);
    }

    _TOTAL_PAGES = _PDF_DOC.numPages;
    const html = `<canvas id="pdf-canvas" class="test" width="400"></canvas>`;
    const section_count = $(".section-range").length;

    for(let sec = 0; sec < section_count; sec++){
        let range = $(".section-range")[sec].value.split("~").map((i) => Number(i));

        for(let s = range[0]; s <= range[1]; s++){
            $($(".project-section-image")[sec]).children().children().append(pdfToImgModalHTML(s,400));
            showPage(s, $(".pdf-to-image-canvas")[s-1]);
            showPage(s, $(".pdf-to-image-canvas2")[s-1]);
        }
    }
}

// load and render specific page of the PDF
async function showPage(page_no, _CANVAS) {
    if(page_no > _TOTAL_PAGES || page_no < 1) {
        console.error(`Page number out of range ${page_no}/${_TOTAL_PAGES}`);
        return;
    }
    _PAGE_RENDERING_IN_PROGRESS = 5;
    _CURRENT_PAGE = page_no;
    try {
        var page = await _PDF_DOC.getPage(page_no);
    }
    catch(error) {
        console.log(error.message);
    }
    
    const outputScale = window.devicePixelRatio || 1;
    var pdf_original_width = page.getViewport({scale:1}).width;
    var scale_required = (_CANVAS.width / outputScale) / pdf_original_width;
    var viewport = page.getViewport({scale: scale_required * outputScale});
    
    _CANVAS.width = Math.floor(viewport.width * outputScale);
    _CANVAS.height = Math.floor(viewport.height * outputScale);
    _CANVAS.style.width = Math.floor(viewport.width) + 'px';
    _CANVAS.style.height = Math.floor(viewport.height) + 'px';
    
    var render_context = {
        canvasContext: _CANVAS.getContext('2d'),
        viewport: viewport,
        transform: [outputScale, 0, 0, outputScale, 0, 0]
    };
    
    try {
        await page.render(render_context);
    }
    catch(error) {
        console.log(error.message);
    }
}


async function getTotalPage(pdf_url){
    let pdf_info;

    try {
        pdf_info = await pdfjsLib.getDocument({ url: pdf_url }).promise;
    }
    catch(error) {
        console.log(error.message);
        return;
    }
    return pdf_info.numPages;
}