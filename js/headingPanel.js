/**
 * Created by xuds on 2015/7/11.
 */
/**
 * @summary 初始化隐藏标题栏,鼠标移入显示标题栏,延迟n秒后隐藏,移出时隐藏.
 */
var initPanelHeadingEvt =function(){
    var domNode=$(".cstm-video-pane,.cstm-chart-pane,.cstm-operate-pane");
    var outTimer;
    domNode.mousemove(function(){
        var headingPane=$(this.children[0]);
        headingPane.css("visibility","visible");
        clearTimeout(outTimer);
        outTimer= setTimeout(function(){
            headingPane.css("visibility","hidden");
        },2000);
    });
    domNode.mouseout(function(){
        $(this.children[0]).css("visibility","hidden");
    })
};
$(function(){
    /**
     * @summary 初始化标题事件
     */
    initPanelHeadingEvt();
});