$(function() {
    var isEdit = Number(getDataByUrl('isEdit'));
    if (isEdit == 1) {
        //编辑页面
        if (localStorage.getItem('editAddress')) {
            var datas = JSON.parse(localStorage.getItem('editAddress'));
            var html = template('change', datas);
            $('#message').html(html);
            $('.my-header h1').text("修改收货地址");
        }
    } else {
        // 添加操作
        var html = template('change', {});
        $('#message').html(html);
    }
    //创建一个picker选择器
    var picker = new mui.PopPicker({
        layer: 3
    });

    // 为picker选择器添加数据
    picker.setData(cityData);

    // 当用户敲击文本框的时候
    $('#selectCity').on('tap', function () {
        // 显示picker选择器
        picker.show(function (selectItems) {
            // 将用户选择的内容显示在文本框中
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });

    });
     //添加收货地址
     $('#address').on('tap', function () {
         var username = $.trim($('#username').val());
         var postCode = $('#postCode').val();
         var selectCity = $('#selectCity').val();
         var site = $('#site').val();
         var reg = /^\d+$|^\d+[.]?\d+$/;
         if (!username) {
            mui.toast('请输入收货人姓名');
            return;
         }
         if (!reg.test(postCode)) {
            mui.toast('请输入正确的邮政编码');
            return;
         }
         //判断是添加还是编辑请求
         var data = {
                address: selectCity,
                addressDetail: site,
                recipients: username,
                postcode: postCode
         }
         if(isEdit == 1) {
             //编辑
            var url = "/address/updateAddress";
            data.id = datas.id;
         } else {
             var url = "/address/addAddress";
         }
         //发送请求验证数据
         $.ajax({
             type: "post",
             url: url,
             data: data,
             dataType: "json",
             success: function (response) {
                if(response.success) {
                    if(isEdit) {
                        mui.toast('修改成功，秋得码黛(●ˇ∀ˇ●)');
                    } else {
                        mui.toast('添加成功，秋得码黛(●ˇ∀ˇ●)');
                    }
                    setTimeout(function(){
                        location.href = 'address.html';
                    }, 2000);
                }
             }
         });
     });

     
     
})