
$(function() {
    var page = 1;
    var pageSize = 10;
    var currentPage = 0;
    function getData() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (response) {
                //总页数
                currentPage = Math.ceil(response.total / pageSize);
                var html = template('first', response);
                $('#first-category').html(html);
            }
        });
    }

    
    //获取一级分类的数据
    getData();
    //下一页
   $('#down').on('click', function () {
       page++;
       if (page > currentPage) {
        page = currentPage;
        alert('这已经是最后一页了');
        return;
       }
       getData()
   });
   //上一页
   $('#top').on('click', function () {
       page--;
       if (page < 1) {
           page = 1;
           return;
       }
       getData()
   });
   //添加一级分类
   $('#save').on('click', function () {
       var name = $.trim($('#first-name').val());
       if(!name) {
        alert(1)
       }
       $.ajax({
           type: "post",
           url: "/category/addTopCategory",
           data: {
               categoryName:name
           },
           success: function (response) {
               console.log(response);
               
               if(response.success) {
                     location.reload();
               }
           }
       });
   });
})
