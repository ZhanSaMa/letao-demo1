$(function(){
    //1.给搜索按钮添加点击事件
    $(".search-button").on("click",function() {
        //2.获取用户输入的内容
        var content = $('.search-content').val();
        // alert(content);
        //3.判断用户是否输入内容
        if (content == '') {
            $('.prompt').show();
            return;
        } else {
            arr.push(content);
            localStorage.setItem('arr', JSON.stringify(arr));
            location.href = 'search-result.html?keyword='+content;
            $('.prompt').hide();
        }
    });
    var arr = [];
    if(localStorage.getItem('arr')) {
        arr = JSON.parse(localStorage.getItem('arr'));
        var html = template("history-content",{res:arr});
        $("#history-box").html(html);
    }
    //点击清楚历史，删除localStorage的数据，清除li
    $(".clear").on('click', function () {
        $("ul").empty('li');
        arr.length = 0;
    });

    //点击搜索历史内容，把内容放到搜索框里
    $('#history-box').on('click', 'li', function () {
        var text = $(this).text();
        $('.search-content').val(text);
    });
})