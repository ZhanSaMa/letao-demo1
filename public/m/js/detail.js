$(function() {
    //获取商品的id
   var id = getDataByUrl('id');
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {id:id},
        success: function (response) {
            var html = template('detail', response);
            $('#product').html(html);
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();

        }
    });
    //尺码选中效果
    var size = null;
    $("#product").on("tap", '.size span', function () {
        $(this).addClass('active').siblings('span').removeClass('active');
        //用户选中的尺码
        size = $(this).html();
    });
    //商品数量加减效果
    var num = parseInt($('#product-num').val());
    var inventory = parseInt($('.inventory').html());
    $(".top").on('click', function () {  
        num++; 
        if (num > inventory) {
            num = inventory;
        }
        $('#product-num').val(num);
    });
    $(".down").on('click', function () {  
        num--;  
        if (num < 1) {
            num = 1;
        }
        $('#product-num').val(num);
    });
    //商品添加到购物车
    $(".join-cart").on('tap', function () {
        if(!size) {
            alert('请选择尺码');
            return
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: id,
                size:size,
                num:num
            },
            success: function (response) {
                if(response.success) {
                    mui.confirm('添加商品成功，去购物车看看？',function (message) {  
                        if(message.index == 1) {
                            location.href = 'cart.html';
                        } 
                    })
                }
            }
        });
    });
})