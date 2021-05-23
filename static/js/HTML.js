function writeFormContentHTML(section_number, next_section, max_section) {
    return  `<div class="row section-field">
                <div class="col-sm-3">
                    <h5><i class="fas fa-stream"></i> Section ${section_number}</h5>
                </div>
                <div class="col-sm-9">
                    <textarea class="write-form-textarea" placeholder="Input the section information." name="section_content"></textarea>
                    <div class="row">
                        <div class="col-sm-10">
                            Set range of page.&nbsp;
                            <input type="text" class="form-control write-form-input write-form-numbering" value="${next_section}" readonly>&nbsp;
                            <i class="fas fa-minus"></i>&nbsp;
                            <input type="number" class="form-control write-form-input write-form-numbering2" value="${next_section}" min='1' max="${max_section}">
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-success btn-plus btn-section-add"><i class="fas fa-plus"></i></button>
                            <button type="button" class="btn btn-danger btn-minus btn-section-remove"><i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
}

function writeFormBtnsHTML(){
    return `<button type="button" class="btn btn-success btn-section-add"><i class="fas fa-plus"></i></button>
            <button type="button" class="btn btn-danger btn-section-remove"><i class="fas fa-minus"></i></button>`;
}

function pdfToImgModalHTML(modal_number, width){
    return `<div id="pdf-main-container">
                <div id="pdf-contents">
                    <canvas id="pdf-canvas" class="pdf-to-image-canvas" width="${width}" data-toggle="modal" data-target="#exampleModal-${modal_number}"></canvas>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${modal_number}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">이미지 확대</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <canvas id="pdf-canvas" class="pdf-to-image-canvas2" width="1100"></canvas>
                        </div>
                    </div>
                </div>
            </div>`
}

function pdfPreviewHTML(width, page_no){
    return `<div id="pdf-main-container">
                <div id="pdf-contents">
                    <canvas id="pdf-canvas" class="pdf-to-image-canvas" width="${width}"></canvas><Br>
                    <center>${page_no}</center>
                </div>
            </div>`;
}

function replyInputFormHTML(user_image, comment_idx){
    return `<div class="input-reply-box row">
                <div class="col-sm-1">
                    <div class="comment-writer-image">
                        <img src="${user_image}">
                    </div>
                </div>
                <div class="col-sm-10">
                    <textarea class="write-form-textarea input-reply-content" placeholder="답글을 적어주세요."></textarea>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-success btn-reply" value="${comment_idx}">Submit</button>
                </div>
            </div>`;
}

const projectBoxHTML = (data) => {
    let badge = '';
    const badgeHTML = `<a href="#" class="badge badge-pill badge-secondary">{{badge}}</a> `;
    data["tag"].split(",").forEach(tag => {
        badge += badgeHTML.replace("{{badge}}", tag);
    })

    return `<div class="col-xl-4 col-lg-4 col-sm-6 project-box animate__animated animate__fadeInUp">
                    <a href="/post/${data["post_idx"]}"><img class="project-thumbnail" src="/image/header3.jpg"></a>
                    <div class="project-info">
                        <a href="#" class="badge badge-pill badge-warning">${data["type"]}</a>
                        ${badge}
                        <div class="project-title">
                            <a href="/post/${data["post_idx"]}">${data["title"]}</a>
                        </div>
                    </div>
                    <div class="project-info-bottom">
                        <span class="project-writer-image"><img src="${data["user_image"]}"></span>
                        <span class="project-writer-name">${data["writer"]}</span> · 
                        <span class="project-writer-date">${data["post_date"]}</span>
                    </div>
            </div>`;
}