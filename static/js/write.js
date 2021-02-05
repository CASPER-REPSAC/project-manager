$(document).on("click", "button.btn-section-add", (e) => {
    const section_field_count = getSectionFieldLength();
    const $parent_section_field = $(e.target.closest(".section-field"));
    
    removeBtn(e.target);
    addSectionField($parent_section_field, section_field_count);
})

$(document).on("click", "button.btn-section-remove", (e) => {
    const section_field_count = getSectionFieldLength();
    
    if(section_field_count == 1){
        alert('section 구역은 최소 1개는 있어야 합니다.');
        return;
    }

    const $parent_section_field = $(e.target.closest(".section-field"));
    removeSectionField($parent_section_field);
})


function getSectionFieldLength(){
    return $(".section-field").length;
}
function getCurrentSectionPage($section){
    return $section.find(".write-form-numbering2").val();
}


function addSectionField($secion_field, section_count){
    let template = writeFormContentHTML();
    const current_section_page = getCurrentSectionPage($secion_field);
    console.log(current_section_page);
    template = template.replace("{{section_number}}", section_count+1);
    template = template.replaceAll("{{section}}", current_section_page);

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