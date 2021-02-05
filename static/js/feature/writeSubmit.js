function getWriteData() {
    const data = {
        "title" : $("input[name=title]").val(),
        "date" : $("input[name=date]").val(),
        "subtitle" : $("input[name=subtitle]").val(),
        "file" : '',
        "total_page" : $("input[name=total_page]").val(),
        "section" : [],
        "section_opinion" : $("textarea[name=section_opinion]").val(),
    }
    const section_count = $(".section-field").length;
    
    if(data.title.length == 0) { alert("제목을 입력해 주세요"); return; }
    if(data.date.length == 0) { alert("날짜를 입력해 주세요"); return; }
    if(data.section_opinion.length == 0) { alert("의견을 입력해 주세요"); return; }

    for(let i=0; i<section_count; i++){
        data.section.push({
            "section_content" : $($(".section-field")[i]).find("textarea[name=section_content]").val(),
            "range_start" : $($(".section-field")[i]).find(".write-form-numbering").val(),
            "range_end" : $($(".section-field")[i]).find(".write-form-numbering2").val(),
        });

        if(data.section[i].section_content.length == 0){ alert("섹션 설명을 입력해 주세요"); return; }
        if(data.section[i].range_start.length == 0){ alert("시작 범위를 입력해 주세요"); return; }
        if(data.section[i].range_end.length == 0){ alert("끝 범위를 입력해 주세요"); return; }
    }

    return data;
}

function sendToWrite(data){
    fetch("/write", {
        method : "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.result == "success")
            location.href = res.redirect;
    })
}