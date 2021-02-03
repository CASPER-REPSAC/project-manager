/* data => req.session.user_theme */
const check = (data) => {
    let isCheck = true;

    if(!data || data == "dark"){
        data = "dark";
        isCheck = false;
    }

    return [data, isCheck];
}

exports.check = check;