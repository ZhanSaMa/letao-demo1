
//登陆拦截 
$.ajax({
	type: "get",
	async: false,
	url: "/employee/checkRootLogin",
	success: function (response) {
		if(response.error && response.error == 400) {
			location.href = 'index.html';
		}
	}
});
$(function(){
	//退出的代码
	$("#login-out").on("click", function () {
		if (confirm("确定要退出吗？？")) {
			$.ajax({
				type: "get",
				url: "/employee/employeeLogout",
				success: function (response) {
					if(response.success) {
						location.href = "index.html"
					} else {
						alert(response.message);
					}
				}
			});
		}
	});
	// end
	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

	
});
