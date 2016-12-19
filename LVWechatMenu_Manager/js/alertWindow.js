/**
 * Created by liuwei on 16/12/8.
 */

var myAlertWindow = {
    initial:initModalAlertWindow,
    conformBtnClick:{},
    cancleBtnClick:{}
}

function initModalAlertWindow(title,content) {

    if($("#backdropDiv").length > 0) {
        showAlertWindow()
        return
    }

    var backdrop = '<div id="backdropDiv" style="text-align: center;height: 100%;width: 100%;background: rgba(52, 52, 52, 0.3);position: absolute;top: 0;left: 0;z-index: 100000">' +
        '<div class="alertContainer" style="background-color:white;width: 65%; border-radius: 10px;position: absolute;top: 35%;left: 17%">' +
        '<div class="alertHeader" style="text-align: center;font-size: 18px;font-weight: bold;margin-top: 10px">'+title+'</div>'+
        '<div class="alertBody" style="text-align: center;margin-top: 10px;padding: 0px 8px;color: gray;font-size: 14px">'+content+'</div>'+
        '<div class="separateLine" style="width: 100%;height: 0.5px;background-color: lightgray;margin-top: 15px;margin-bottom: 10px"></div>'+
        '<div class="alertFooter" style="text-align: center;margin-top: 15px;margin-bottom: 15px">' +
        '<div id="conformBtn" style="display: inline-block;background-color: lightgray;font-size: 15px;color: blue;padding: 8px 15px;border-radius: 4px;margin-right: 40px;width: 20%">确认</div>'+
        '<div id="cancleBtn" style="display: inline-block;background-color: red;font-size: 15px;color: white;padding: 8px 15px;border-radius: 4px;width: 20%">取消</div>'+
        '</div>'+
        '</div>' +
        '</div>'
    $("body").append(backdrop)
    $("#backdropDiv").bind("click",function () {
        $("#backdropDiv").fadeOut("slow")
    })
    $("#cancleBtnClick").bind("click",function () {
        $("#backdropDiv").fadeOut("slow")
    })

    myAlertWindow.conformBtnClick = function(f){
        $("#conformBtn").bind("click",function () {
            f()
            $("#backdropDiv").fadeOut("slow")
        })
    }


}


//弹出alert
function showAlertWindow() {
    $("#backdropDiv").fadeIn("slow");
}
// //隐藏alert
// function hidenAlertWindow() {
//     $("#backdropDiv").fadeOut("slow")
// }
// //点击确认按钮
// function conformBtnClick(f) {
//     f();
//     $("#backdropDiv").fadeOut("slow")
// }
// //点击取消按钮
// function cancleBtnClick() {
//     $("#backdropDiv").fadeOut("slow")
// }

