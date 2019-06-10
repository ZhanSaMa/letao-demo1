$(function() {
    //验证密码是否合格
    $('#password').on('blur', function () {
        var password = $('#password').val();
        var reg = /^[a-zA-Z0-9]{4,10}$/;
        if (!reg.test(password)) {
            mui.toast("密码不能含有非法字符，长度在4-10之间");
            return false;
        }
    });
    //确认密码
    $('#password2').on('blur', function () {
        var password = $('#password').val();
        var password2 = $('#password2').val();
        if (password != password2) {
            mui.toast("两次输入的密码不一致");
            return false;
        }
    });

    //获取验证码
    $('.getCode').on('click', function () {
        //发送ajax
        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function (response) {
                var vCode = mui.toast('本次验证码是' + response.vCode);
            }
        });
    });
    //修改密码添加绑定事件
    $('#modify-btn').on('tap', function () {
        //原密码
        var old_password = $('#old-password').val();
        var password = $('#password').val();
        var vCode = $.trim($('#code').val());
        if (!vCode) {
             mui.toast("请输入原密码");
             return false;
        }
        //发送请求
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: old_password,
                newPassword: password,
                vCode: vCode
            },
            // dataType: "json",
            success: function (response) {
                if(response.success) {
                    mui.toast('修改密码成功,请重新登陆');
                    setTimeout( function(){
                         location.href = 'login.html';
                    }, 2000);
                }  
            }
        });
    });
})