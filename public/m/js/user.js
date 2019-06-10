   
   var userInfo = null;
   //获取用户信息，处理用户未登录问题
    $.ajax({
        type: "get",
        async: false,
        url: "/user/queryUserMessage",
        success: function (response) {
            if (response.error && response.error == 400) {
                location.href = 'login.html';
            }
            userInfo = response;
           
        }
    });
$(function() {
    //退出登陆操作
    $('#logout').on('click', function () {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function (response) {
                if(response.success) {
                    mui.toast('登出成功');
                    setTimeout(function(){
                        location.href = "index.html";
                    }, 2000);
                } else {
                    mui.toast('登出失败');
                }
            }
        });
    });

    //渲染用户信息
    if(userInfo) {
         var html = template('user', userInfo);
         $('#user-content').html(html);
    }

   
})