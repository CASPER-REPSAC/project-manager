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

$(".btn-submit").click(() => {
    const data = getWriteData();
    
    if(data)
        sendToWrite(data);
})



// 프로젝트 유형 선택
$(document).on("click", ".select-type", (e) => {
    $(".select-type-value").val(e.target.value);
    $(".select-project-type").addClass("animate__animated animate__fadeOutDown");
    setTimeout(() => {
        $(".select-project-type").hide();
        $(".select-project-file").show();
        $(".select-project-file").addClass("animate__animated animate__fadeInDown");
    },1000);

})