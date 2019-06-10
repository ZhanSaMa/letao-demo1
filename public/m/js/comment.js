$(function () {

    //恢复页面之间的跳转
    $('body').on('tap','a', function () {
        mui.openWindow({
            url:$(this).attr('href')
        });
    });
})

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