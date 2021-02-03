// initTheme();

// function initTheme() {
//     const userTheme = localStorage.getItem('web-theme');
//     console.log(userTheme);
//     if(userTheme == null || userTheme == "dark"){
//         $("html").attr("web-theme", "dark");
//         localStorage.setItem('web-theme', 'dark');
//         $(".dark-mode > label > input[type=checkbox]")[0].checked = false;
//     }
//     else{
//         $("html").attr("web-theme", userTheme);
//         $(".dark-mode > label > input[type=checkbox]")[0].checked = true;
//     }
// }



$(".dark-mode > label > input[type=checkbox]").click((e) => {
    // dark mode
    if(e.target.checked == false){
        $("html").attr("web-theme", "dark");
        localStorage.setItem('web-theme', 'dark');
    }
    // light mode
    else if(e.target.checked == true){
        $("html").attr("web-theme", "light");
        localStorage.setItem('web-theme', 'light');
    }
})