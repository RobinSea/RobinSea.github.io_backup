//获得当前时间

$(function() {

    //代码高亮自定义

    $("code").each(function() {

        $(this).html("<ul><li>" + $(this).html().replace(/\n/g, "\n</li><li>") + "\n</li></ul>");

        //alert(  $(this).html());

    });

    $(".content em").each(function() {

        var rgb = $(this).css('background-color');

        var rgb = rgb.replace(')', ' ,.7)');

        var rgb = rgb.replace('rgb', 'rgba');

        //alert( rgb );

        $(this).css({

            'background': rgb,

            'padding': '0 2px 0 2px',

            'overflow': 'hidden',

            'border-radius': '3px',

            'font-style': 'normal',

        });

    });

});
