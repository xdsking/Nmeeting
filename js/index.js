/**
 * Created by xuds on 2015/3/14.
 */
var marginBottom=19;//面板距bottom 的距离//114
//PC端移动端判断
function IsPC() {
    var flag = true;
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
//根据不同的终端设定不同的样式
function addStyleForTerminal(mainPanelDom,colPaddingDom){
    var pcMainPanelCSS={
        "margin-left": "5px",
        "margin-right": "5px",
        "margin-top": "10px"
    };
    var mobileMainPanelCSS={
        "margin-left": "0",
        "margin-right": "0",
        "margin-top": "0"
    };
    var pccolPaddingCSS={
        "padding-left": "5px",
        "padding-right": "5px"
    };
    var mobilecolPaddingCSS={
        "padding-left": "0",
        "padding-right": "0"
    };
    if(IsPC()){
        mainPanelDom.css(pcMainPanelCSS);
        colPaddingDom.css(pccolPaddingCSS);
    }else{
        mainPanelDom.css(mobileMainPanelCSS);
        colPaddingDom.css(mobilecolPaddingCSS);
    }
}
//初始化视频播放窗口手势
function initVideoPanelPanelGesture(){
    var hammertime = new Hammer($(".cstm-video-pane")[0]);
    //向左滑动
    hammertime.on("swipeleft", function (e) {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeIn();
        }
    });
    //向右滑动
    hammertime.on("swiperight", function (e) {
        if (IsPC()) {
            $(".cstm-qunmumber-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeIn();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeOut();
        }
    });
}
//初始化与会人员窗口手势
function initQunmumberPanelPanelGesture(){
    var hammertime = new Hammer($(".cstm-qunmumber-pane")[0]);
    //向左滑动
    hammertime.on("swipeleft", function (e) {
        if (IsPC()) {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //向右滑动
    hammertime.on("swiperight", function (e) {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeIn();
        }
    });
}
//初始化聊天窗口手势
function initChartPanelPanelGesture(){
    var isPC=IsPC();
    var hammertime = new Hammer($(".cstm-chart-pane")[0]);
    //向左滑动
    hammertime.on("swipeleft", function (e) {
        if (isPC) {
            $(".cstm-qunmumber-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeIn();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //向右滑动
    hammertime.on("swiperight", function (e) {
        if (isPC) {
            $(".cstm-chart-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
            $(".cstm-chart-pane").fadeOut();
        }
    });
}
//初始化操作窗口手势
function initOperatePanelPanelGesture(){
    var hammertime = new Hammer($(".cstm-operate-pane")[0]);
    //向左滑动
    hammertime.on("swipeleft", function (e) {
        $(".cstm-operate-pane").fadeOut();
        if (IsPC()) {
            $(".cstm-qunmumber-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeIn();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //向右滑动
    /*hammertime.on("swiperight", function (e) {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
            $(".cstm-chart-pane").fadeOut();
        }
    });*/
}
function showOperatePanel(params){
    $(".cstm-qunmumber-pane").fadeOut();
    $(".cstm-video-pane").fadeOut();
    $(".cstm-chart-pane").fadeOut();
    $(".cstm-operate-pane").fadeIn();
    $("#operatePane1Title").text(params.title);
}
$(function () {
    var mainPanelDom=$(".cstm-main-panel"),colPaddingDom=$(".cstm-col-padding");
    addStyleForTerminal(mainPanelDom,colPaddingDom);
    if(!IsPC()){
        marginBottom=0;
        //初始化时隐藏panel-heading
        //TODO
        $(".panel-heading").css("display","none");
        $(".panel-body").click(function(){
            var curHeadingPanel=$(this).prev();
            if(curHeadingPanel.css("display")=="none"){
                curHeadingPanel.fadeIn();
            }else{
                curHeadingPanel.fadeOut();
            }
        });
    }
    var bodyHeight = (document.body.scrollHeight - marginBottom) + "px";
    $(".cstm-panel-body-height").css("height", bodyHeight);
    //横竖屏切换时,引起window窗口大小改变,重新绘制面板大小;
    $(window).resize(function(){
        var bodyHeight = (document.body.scrollHeight - marginBottom) + "px";
        $(".cstm-panel-body-height").css("height", bodyHeight);
    });
    //显示"用户列表"按钮事件
    $("#operateUserPane").click(function () {
        if (IsPC()) {
            $(".cstm-qunmumber-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeIn();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //显示"聊天窗口"按钮事件
    $("#operateChartPane").click(function () {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeIn();
        }
    });
    //隐藏"用户列表"按钮事件
    $("#hiddenUserPane").click(function () {
        if (IsPC()) {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //隐藏"聊天窗口"按钮事件
    $("#hiddenChartPane").click(function () {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeIn();
            $(".cstm-chart-pane").fadeOut();
        }
    });
    //显示"聊天窗口"按钮事件
    $("#operateBadgeChartPane").click(function () {
        if (IsPC()) {
            $(".cstm-chart-pane").fadeToggle();
        } else {
            $(".cstm-qunmumber-pane").fadeOut();
            $(".cstm-video-pane").fadeOut();
            $(".cstm-chart-pane").fadeIn();
        }
    });
    //隐藏操作窗口按钮
    $("#hiddenOperatePane1").click(function(){
        $(".cstm-qunmumber-pane").fadeIn();
        $(".cstm-operate-pane").fadeOut();
    });
    $(".cstm-user-panel-action").click(function () {
        var childrenNodes = $(".cstm-list-panel").children();
        childrenNodes.css("display", "none");
        $(".cstm-user-list-panel").slideDown();
    });
    $(".cstm-room-panel-action").click(function () {
        var childrenNodes = $(".cstm-list-panel").children();
        childrenNodes.css("display", "none");
        $(".cstm-room-list-panel").slideDown();
    });
    $(".cstm-tool-panel-action").click(function () {
        var childrenNodes = $(".cstm-list-panel").children();
        childrenNodes.css("display", "none");
        $(".cstm-tool-list-panel").slideDown();
    });
    $(".cstm-video-panel-action").click(function () {
        var childrenNodes = $(".cstm-list-panel").children();
        childrenNodes.css("display", "none");
        $(".cstm-video-list-panel").slideDown();
    });
    $(".toolBar-item>div").click(function(evt){
        evt.stopPropagation();//阻止事件冒泡
    });
    initVideoPanelPanelGesture();
    initQunmumberPanelPanelGesture();
    initChartPanelPanelGesture();
    initOperatePanelPanelGesture();
});