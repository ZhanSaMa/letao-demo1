//如果用户登陆过了，就自动跳转到user页面
$.ajax({
    type: "get",
    async: false,
    url: "/employee/checkRootLogin",
    success: function (response) {
        if (response.success) {
            location.href = 'user.html';
        }
    }
});

$(function() {
    //登陆验证
    $("#login-button").on('click', function () {
        var username = $.trim($("#username").val());
        var password = $.trim($("#password").val());
        if (!username) {
            alert("请输入用户名")
            return;
        }
        if (!password) {
            alert("请输密码")
            return;
        }
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: {
                username:username,
                password:password
            },
            success: function (response) {
                console.log(response);
                if(response.success) {
                    location.href = "user.html";
                } else {
                    alert(response.message);
                }
            }
        });
    });
})