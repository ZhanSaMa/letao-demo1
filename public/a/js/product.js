$(function() {
    var page = 1;
    var pageSize = 10;
    //商品信息
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page:page,
            pageSize:pageSize
        },
        success: function (response) {       
            var html = template('product',response);
            $('.product-items').html(html);
        }
    });
    //添加商品
    //获取二级分类里的品牌名称
     $.ajax({
         type: "get",
         url: "/category/querySecondCategoryPaging",
         data: {
             page: page,
             pageSize: 100
         },
         success: function (response) {
             var html = template('commodity', response);
             $('#items').html(html);
         }
     });
     //添加图片
     var photo = [];
      $('#fileUpload').fileupload({
          dataType: 'json',
          done: function (e, data) {
              photo.push(data.result); 
          }
      });
     //添加按钮绑定点击事件
    $('#addProduct').on('click', function () {
        var items = $('#items').val(); 
        var productName = $('#product-name').val();
        var productMessage = $('#product-message').val();
        var productNum = $('#product-num').val();
        var productSize = $('#product-size').val();
        var productPrice = $('#product-price').val();
        var productOldPrice = $('#product-oldPrice').val();
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: {
                proName: productName,
                oldPrice: productOldPrice,
                price: productPrice,
                proDesc:productMessage,
                size: productSize,
                num: productNum,
                statu:1,
                brandId: items,
                pic:photo
            },
            dataType: "json",
            success: function (response) {
                if(response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        });
    });

})