$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page:1,
            pageSize:10
        },
        success: function (response) {
            console.log(response);
            
            var html = template("user",response);
            $(".body").html(html);
        }
    });
    //获取操作按钮 禁用启用
    $(".body").on('click', '#button', function () {
        var id = $(this).attr('data-id');
        var isDelete = parseInt($(this).attr('data-isDelete'));
        //发送ajax
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id:id,
                isDelete:isDelete ? 0 :1
            },
            success: function (response) {
                if(response.success) {
                    location.reload();
                }
            }
        });
    });
})