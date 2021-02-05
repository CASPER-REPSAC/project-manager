function writeFormContentHTML() {
    return  `<div class="row section-field">
                <div class="col-sm-3">
                    <h5><i class="fas fa-stream"></i> Section {{section_number}}</h5>
                </div>
                <div class="col-sm-9">
                    <textarea class="write-form-textarea" placeholder="Input the section information." name="section_content"></textarea>
                    <div class="row">
                        <div class="col-sm-10">
                            Set range of page.&nbsp;
                            <input type="text" class="form-control write-form-input write-form-numbering" value="{{section}}" readonly>&nbsp;
                            <i class="fas fa-minus"></i>&nbsp;
                            <input type="number" class="form-control write-form-input write-form-numbering2" value="{{section}}">
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