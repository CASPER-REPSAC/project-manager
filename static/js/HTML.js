function writeFormContentHTML() {
    return `<div class="row">
                <div class="col-sm-3">
                    <input type="text" class="form-control write-form-input" value="Section {{section_number}}" readonly>
                </div>
                <div class="col-sm-9">
                    <textarea class="write-form-textarea"></textarea>
                    <div class="row">
                        <div class="col-sm-10">
                            Set range of page.&nbsp;
                            <input type="text" class="form-control write-form-input write-form-numbering" value="{{section}}" readonly>&nbsp;
                            <i class="fas fa-minus"></i>&nbsp;
                            <input type="number" class="form-control write-form-input write-form-numbering2" value="1">
                        </div>
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-success"><i class="fas fa-plus"></i></button>
                            <button type="button" class="btn btn-danger"><i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
}