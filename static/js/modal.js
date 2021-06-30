
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

const changeModal = (modal_id) => {
    $(".close").click();
    $("#" + modal_id).modal("toggle");
}