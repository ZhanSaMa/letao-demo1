$(function() {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    function getSecondId(id) {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType: "json",
            success: function (response) {
                // console.log(response); 
                var html = template("category-second", response);
                $(".brand-list").html(html);
            }
        });
    };
    //发送请求，请求一级分类
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        dataType: "json",
        success: function (response) {
            // console.log(response);
            var html = template("category",response);
            $(".links").html(html)
            //如果一级分类有数据
            if(response.rows.length) {
                //给第一个a按钮添加样式
                $('.links').find("a").eq(0).addClass("active");
                //获取第一个a的id,以便于展示数据
                var id = response.rows[0].id;
                getSecondId(id);
            }
        }
    });
    //点击一级分类，获取二级分类数据
    $(".links").on("click","a", function () {
        //1.获取当前点击的自定义的id
        var id = $(this).attr("data-id");
        //给当前点击的按钮添加一个样式，其余元素移除这个样式
        $(this).addClass("active").siblings().removeClass("active");
        //2.发送请求，获取二级分类的数据
            getSecondId(id);
    });
    //点击搜索按钮跳转界面
    $('#find').on('click', function () {
        location.href = 'search.html';
    });
})