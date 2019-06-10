$(function() {
    $('#username').on('blur', function () {
        var username = $('#username').val();
        var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        if (!reg.test(username)) {
            mui.toast("用户名由英文字母和数字组成的4-16位字符，以字母开头");
            return false;
        }
    });
    $('#password').on('blur', function () {
        var password = $('#password').val();
        var reg = /^[a-zA-Z0-9]{4,10}$/;
        if (!reg.test(password)) {
            mui.toast("密码不能含有非法字符，长度在4-10之间");
            return false;
        }
    });
    $('#register').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        //发送请求
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function (response) {
                if(response.success) {
                    mui.toast('登陆成功');
                   setTimeout(function(){
                       location.href = 'user.html';
                   }, 2000);
                }
            }
        });
    });
})