jQuery(document).ready(function($) {
	function getURLParameters(url)
{
  
    var result = {};
    var searchIndex = url.indexOf("?");
    if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {     
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

	$.ajax({async:false})
	$('head').load('tpl/head.html');
	$('head').append('<link rel="stylesheet" href="css/screen.css">')
	
	$('header').load('tpl/header.html');
	if($('.resume')){
		$('.resume').load("tpl/resume.html");
	}
	// $('footer').load('tpl/footer.html', function(){
	// 	var header_height = $("header").height()
	// 	var article_height = $("article").height()
	// 	var footer_height = $("footer").height()

	// 	$(".push").height( $(window).height() - header_height - article_height - footer_height )
	// 	$(window).resize(function(event) {
	// 		$(".push").height( $(window).height() - header_height - article_height - footer_height )
	// 	});
		
		
	// });

	$('body').show();


	if(location.pathname.slice(-8) == "web.html" || location.pathname.slice(-11) == "mobile.html"){
		$.getJSON('data/data.json', function(data) {
			web = data.web;
			mobile = data.mobile;

			$.each(web, function(index, site) {
				$("#web_json").append('<li><a href="project.html?id='+site.id+'"><img src="http://placehold.it/400x400"></a></li>')
			});
			$.each(mobile, function(index, site) {
				$("#mobile_json").append('<li><a href="project.html?id='+site.id+'"><img src="http://placehold.it/400x400"></a></li>')
			});
		});
	}

	if(location.pathname.slice(-12) == "project.html"){
		url_params = getURLParameters(document.URL)
		if (url_params.id){
			$.getJSON('data/data.json', function(data) {
				web = data.web;
				mobile = data.mobile;
				$.each(data, function(ind, cat) {
					$.each(cat, function(index, val) {

						 if(val.id == url_params.id){
						 	$("article").find('#title').html(val.title)
						 	$("article").find('#info').html(val.info)

						 	$.each(val.imgs, function(i, v) {
						 		$("article").find('#imageHolder').append('<img src="http://placehold.it/637x300&text='+ i +'"><br><br>')
						 	});
						 	

						 }
					});
				});

				
			});
		}else{
			window.location.href = "/project.html?id=1";
		}

	}











	function validate(form){

		var error_loger = "";
		form.find(':input').change(function(event) {
			$(this).removeClass('error')
		});
		form.find(':input').each(function(index, el) {

			var that = $(this)

			if (that.hasClass('require')){

				if (that.attr('type') == "text"){

					if (that.val() == undefined || $(this).val() == "") {
						error_loger += $(this).attr('placeholder') + " can't be blank <br>"
						$(this).addClass('error');

					}else if (that.val().length < 3) {
						error_loger += $(this).attr('placeholder') + " is not long enough <br>";
						$(this).addClass('error');
					};

				}
			
			}
		});

		if(error_loger != ""){
			$("#error_message").html(error_loger)
			$("#error_message").slideDown('fast');
			return false;
		}else{return true}
	};

	$("form").submit(function(e){
		$("#sliderVal").val($("#slider").slider( "value" ));
		return validate($("form"))
		
	});



});