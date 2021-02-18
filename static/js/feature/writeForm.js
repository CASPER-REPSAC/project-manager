function getSectionFieldLength(){
    return $(".section-field").length;
}
function getCurrentSectionPage($section){
    return $section.find(".write-form-numbering2").val();
}

function getTotalSection(){
    return $("input[name='total_page']").val();
}

function addSectionField($secion_field, section_count){
    const current_section_page = getCurrentSectionPage($secion_field);
    const max_section = getTotalSection();
    let template = writeFormContentHTML(section_count+1, Number(current_section_page) + 1, max_section);

    $secion_field.after(template);
}

function removeSectionField($section_field){
    $section_field.remove();
    addBtn();
}


function removeBtn(target){
    const btn = target.closest(".col-sm-2").children;
    for(let i=0; i<2; i++){
        btn[0].remove();
    }
}
function addBtn(){
    const $selector = $($(".section-field")[$(".section-field").length-1].getElementsByClassName("col-sm-2"));
    const template = writeFormBtnsHTML();

    $selector.append(template);
}

function setTotalPage(page){
    $("input[name='total_page']").val(page);
    $(".write-form-numbering2").val(page);
    $(".write-form-numbering2").attr({"max" : page});
}