$(function() {
     var address = null;
    $.ajax({
        type: "get",
        url: "/address/queryAddress",
        success: function (response) {
                 address = response;
                var html = template('address', {response});
                $('#address-content').html(html);
        }
    });
    //删除按钮操作
    $('#address-content').on('tap', '#delete', function () {
        var id = this.getAttribute('data-id');
        var li = this.parentNode.parentNode;
        mui.confirm("确定要删除吗？(⊙_⊙)？",function(message) {
            if (message.index == 1) {
                //发送ajax得请求
                $.ajax({
                    type: "post",
                    url: "/address/deleteAddress",
                    data: {
                        id:id
                    },
                    dataType: "json",
                    success: function (response) {
                            //重新加载页面
                            location.reload();
                    }
                });
            } else {
                // 取消删除
                // 关闭列表滑出效果
                mui.swipeoutClose(li);
            }
        })
    });

    //编辑按钮操作
    $('#address-content').on('tap','#change', function () {
        //获取相应id
        var id = this.getAttribute('data-id');
        for(i = 0; i < address.length;i++) {
            if(address[i].id == id) {
                //先把这条数据转换成字符串，然后把信息储存到数据库
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                break;
            }
        }
        location.href = 'addaddress.html?isEdit=1';
    });
})