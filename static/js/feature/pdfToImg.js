var _PDF_DOC,
        _CURRENT_PAGE,
        _TOTAL_PAGES,
        _PAGE_RENDERING_IN_PROGRESS = 0,
        _CANVAS = document.querySelector('#pdf-canvas');


        // initialize and load the PDF
async function showPDF(pdf_url) {
    // get handle of pdf document
    try {
        _PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url });
    }
    catch(error) {
        alert(error.message);
    }

    // total pages in pdf
    _TOTAL_PAGES = _PDF_DOC.numPages;
    
    // Hide the pdf loader and show pdf container
    // document.querySelector("#pdf-contents").style.display = 'block';

    // show the first page
    const html = `<canvas id="pdf-canvas" class="test" width="400"></canvas>`;
    const section_count = $(".section-range").length;

    for(let sec = 0; sec < section_count; sec++){
        let range = $(".section-range")[sec].value.split("~").map((i) => Number(i));

        for(let s = range[0]; s <= range[1]; s++){
            $($(".project-section-image")[sec]).children().children().append(pdfToImgModalHTML(s,400));
            await showPage(s, $(".pdf-to-image-canvas")[s-1]);
            await showPage(s, $(".pdf-to-image-canvas2")[s-1]);
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

    // while page is being rendered hide the canvas and show a loading message
    document.querySelector("#pdf-canvas").style.display = 'none';
    
    // get handle of page
    try {
        var page = await _PDF_DOC.getPage(page_no);
    }
    catch(error) {
        console.log(error.message);
    }

    // original width of the pdf page at scale 1
    var pdf_original_width = page.getViewport(1).width;
    
    // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
    var scale_required = _CANVAS.width / pdf_original_width;

    // get viewport to render the page at required scale
    var viewport = page.getViewport(scale_required);

    // set canvas height same as viewport height
    _CANVAS.height = viewport.height;

    var render_context = {
        canvasContext: _CANVAS.getContext('2d'),
        viewport: viewport
    };
        
    // render the page contents in the canvas
    try {
        await page.render(render_context);
    }
    catch(error) {
        console.log(error.message);
    }

    _PAGE_RENDERING_IN_PROGRESS = 0;

    // show the canvas and hide the page loader
    document.querySelector("#pdf-canvas").style.display = 'block';
}

async function getTotalPage(pdf_url){
    let pdf_info;

    try {
        pdf_info = await pdfjsLib.getDocument({ url: pdf_url });
    }
    catch(error) {
        console.log(error.message);
        return;
    }
    return pdf_info.numPages;
}