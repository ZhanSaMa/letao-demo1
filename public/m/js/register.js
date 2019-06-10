
$(function() {
     //判断用户数据是否合法
     $('#username').on('blur', function () {
      var username = $('#username').val();
         var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
         if (!reg.test(username) ){
             mui.toast("用户名由英文字母和数字组成的4-16位字符，以字母开头");
             return false;
         }
     });
     $('#mobile').on('blur', function () {
      var mobile = $('#mobile').val();
         var reg = /^1\d{10}$/;
         if (!reg.test(mobile)) {
             mui.toast("手机号格式不正确");
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
            url: "/user/vCode",
            success: function (response) {
               mui.toast('本次验证码是'+response.vCode);
            //   vCode.fadeIn(3000);
            }
        });
    });
      //注册按钮添加点击事件
      $('#register').on('click', function () {
            var username = $('#username').val();
            var mobile = $('#mobile').val();
            var password = $('#password').val();
            var vCode = $('#code').val();
          //发送请求
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function (response) {
                // console.log(response);
                if (response.success) {
                    mui.toast('注册成功，正在跳转');
                    setTimeout(function(){
                        location.href = 'login.html';
                    },3000);
                }else {
                    mui.toast('注册失败');
                }
            }
        });
      });
})