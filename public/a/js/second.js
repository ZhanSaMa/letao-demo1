$(function() {
    //获取二级分类数据
    var page = 1;
    var pageSize = 10;
    var currentPage = 0;
    function getData() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (response) {
                currentPage = Math.ceil(response.total / pageSize);
                var html = template('second', response);
                $('#second-category').html(html);
            }
        });
    }
    getData();
    //下一页
    $('#next').on('click', function () {
        page++;
        if(page > currentPage) {
            page = currentPage;
            alert('已经是最后一页了');
            return
        }
        getData();
    });
    //上一页
    $('#top').on('click', function () {
        page--;
        if(page < 1) {
            page = 1;
            alert('已经是第一页了');
            return
        }
        getData();
    });
    //添加分类
    //商品分类
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page:1,
            pageSize:100
        },
        success: function (response) {
            var html = template('select',response);
            $('#items').html(html);
            
        }
    });
    //图片的上传
    //声明一个空变量，获取图片的信息储存，下面ajax要用
    var previewImg = "";
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // 上传图片预览
            $('#preview').attr('src',data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });
    //保存，校验数据
    $('#save').on('click', function () {
        var priceName = $('#price-name').val();
        var items = $('#items').val();
        console.log(items);
        
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: {
                brandName: priceName,
                brandLogo: previewImg,
                categoryId: items,
                hot:0
            },
            dataType: "json",
            success: function (response) {
                console.log(response);
                location.reload();
            }
        });
    });
})