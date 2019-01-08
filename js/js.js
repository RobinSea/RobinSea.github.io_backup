// JavaScript Document





 

$(function(){ 





	

	$('.nav_b').remove(); 



	$('.logo,.contact li,.links li,.switch i,.lists li,.links li').hover(function(){

			$(this).addClass('hover');		

		},function(){

			$(this).removeClass('hover');	

		}

	);

	



            $(".switch i").click(function(){

                $("#"+this.id).addClass("cur").siblings().removeClass("cur"); //切换选中后的样式

                $("#style").attr("href","style/css/"+this.id+".css");//每次切换更换相对应的样式表

				$("#style_hover").attr("href","style/css/style_hover.css");//每次切换更换相对应的样式表

                $.cookie("cookie",//写入cookie

                        this.id,//需要cookie写入的业务

                        {

                        "path":"/", //cookie的默认属性

                        "expires":365 //有效天数

                })

            });

            var cookie=$.cookie("cookie"); //读取cookie

            if(cookie){

                    $("#"+cookie).addClass("cur").siblings().removeClass("cur");

                    $("#style").attr("href","style/css/"+cookie+".css");

                    $.cookie("cookie",cookie,{

                        "path":"/",

                        "expires":365

                    })

             }



}); 





	setTimeout(function () {

		var box_a_h = $('div.box_a').height();

		//var box_a_h = box_a_h + 80;



		//alert(box_a_h);



		$('.content_a').css({

		"min-height":box_a_h

		});

	},50);





$(function(){
	$(".content pre").each(function () {
		
		$(this).hover(function() {
   			$(this).prepend("<div class=\'ckym\'>全屏查看</div>");
			$(".ckym").click(function(){
				$(".ckym").css({"display":"none"});
				var pre = $(this).parent().html();
				$("body").addClass("pre_o");
				//alert(per);

					var pre1 = "<div class=\"pre_c\"><pre>"+ pre +"<\/pre><\/div>";
					$(".main").after(pre1);
					var p_h =$(".pre_c").height();
					var p_w =$(".pre_c").width();
					var p_h ='-'+p_h/2+'px';
					var p_w ='-'+p_w/2+'px';
					//alert(p_h);
					//alert(p_w);		
					$(".pre_c").css({'margin-left':p_w,'margin-top':p_h,});

			});

		},function(){
			$(".ckym").remove();
		});

		//alert(per);
	});
	$('pre>.ckym').hover(function() {
		$(this).addClass("hover");
	},function() {
		$(this).removeClass("hover");
	});

	$(".bg,.gbpre").click(function(){
		setTimeout(function() {
			$(".pre_c").remove();	
		},500);
		$("body").removeClass("pre_o");	

	});

	$(document).keyup(function(e){

		if (e.keyCode == 27) 
		{

			$(".pre_c").remove();	

			$("body").removeClass("pre_o");	 
		}

	});
});

