function getSectionFieldLength(){
    return $(".section-field").length;
}
function getCurrentSectionPage($section){
    return $section.find(".write-form-numbering2").val();
}


function addSectionField($secion_field, section_count){
    let template = writeFormContentHTML();
    const current_section_page = getCurrentSectionPage($secion_field);

    template = template.replace("{{section_number}}", section_count+1);
    template = template.replaceAll("{{section}}", Number(current_section_page) + 1);

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