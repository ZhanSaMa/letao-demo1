
 var keyword = getDataByUrl('keyword');
 var This = null;
 var page = 1; //当前页
 var priceSort = 1; //价格排序规则
$(function() {
  
//    console.log(keyword);
   //发送Ajax请求，根据用户输入的数据返回相应的数据
  
   //上拉加载
   mui.init({
       pullRefresh: {
           container: '#refreshContainer', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
           up: {
               height: 50, //可选.默认50.触发上拉加载拖动距离
               auto: true, //可选,默认false.自动上拉加载一次
               contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
               contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
               callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
           }
       }
   });

   //按照价格对商品进行排序
   //给价格按钮添加轻敲事件
   $('#priceSort').on('tap', function () {
       //重新赋值,升序降序来回切换
       priceSort = priceSort == 1 ? 2 : 1;
       //页面初始化
        $('.product').html("");
        page = 1;
        //重置下拉菜单
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
   });
   
})

    //获取url里面用户搜索的数据
    

    function getData() {
        if(!This) {
            This = this;
        };
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                price: priceSort,
                page: page++,
                pageSize: 4,
                proName: keyword
            },
            dataType: "json",
            success: function (response) {
                //    console.log(response);
                if(response.data.length > 0) {
                    var html = template("keyword", response);
                    $(html).appendTo('.product');
                    //上拉组件加载完毕
                    This.endPullupToRefresh(false);
                } else {
                    This.endPullupToRefresh(true);
                }
                
            }
        });

    }
     function getDataByUrl(name) {
         var datas = location.search.substr(location.search.indexOf('?') + 1);
         var data = datas.split("&");
         for (i = 0; i < data.length; i++) {
             var current = data[i].split('=');
             if (current[0] == name) {
                 return current[1];
             }
         }
         return null;
     }