$(function() {
    //查询购物车，动态渲染界面
    $.ajax({
        type: "get",
        url: "/cart/queryCartPaging",
        data: {
            page:1,
            pageSize:10
        },
        success: function (response) {
            console.log(response);
            var html = template('cart',response);
            $('.items-cart').html(html);
        }
    });
    //删除
    
    $('#items').on('tap','#delete', function () {
        var id = [];
        id.push($(this).attr('data-id'));
        var li = this.parentNode.parentNode;
        mui.confirm("确定要删除吗？(⊙_⊙)？", function (message) {
            if (message.index == 1) {
                //发送ajax得请求
                $.ajax({
                    type: "get",
                    url: " /cart/deleteCart",
                    data: {
                        id: id
                    },
                    datatype: "json",
                    success: function (response) {
                        $(this).remove(li);
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
})


