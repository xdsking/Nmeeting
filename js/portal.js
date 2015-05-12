/**
 * Created by xuds on 2015/3/20.
 */
$(function(){
    /*var marginTopValue=200,cstmContainer=$(".cstm-container");
    var bodyHeight=document.body.scrollHeight;
    cstmContainer.css("margin-top",(bodyHeight-marginTopValue)+"px");
    $(window).resize(function() {
        var bodyHeight=document.body.scrollHeight;
        cstmContainer.css("margin-top",(bodyHeight-marginTopValue)+"px");
    });*/
    var bodyWidth=document.body.scrollWidth,cstmContainer=$(".cstm-container");
    var cstmContainerWidth=cstmContainer.outerWidth();
    cstmContainer.css("left",(bodyWidth-cstmContainerWidth)/2+"px");
    $(window).resize(function() {
        var bodyWidth=document.body.scrollWidth;
        var cstmContainerWidth=cstmContainer.outerWidth();
        cstmContainer.css("left",(bodyWidth-cstmContainerWidth)/2+"px");
    });
});