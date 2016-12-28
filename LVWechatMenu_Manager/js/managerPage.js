/**
 * Created by liuwei on 16/12/27.
 */

//1.添加主菜单
function addMenuItemLiClick() {

    var menu = {
        "type": "click",
        "name": "菜单名称",
        "key": "V1001_TODAY_MUSIC",
        "sub_button": [ ]
    }

    appData.mainMenuList.push(menu)
    setTimeout(changeMenuWidth,0)
    resetPage()
    $(".portable_editor").css("visibility","visible")
    $(".saveAndPublishBtn").css("visibility","visible")
}

//2.切换焦点
function changeFocusClick(index) {
//        changeMenuWidth()
    $(".portable_editor").css("visibility","visible")
    $(".saveAndPublishBtn").css("visibility","visible")
    $(".menu_item_active").removeClass("menu_item_active")
    var a = $(".pre_menu_list").children("li")[index]
    $(a).addClass("menu_item_active")
    $(".perSub_menu_container").removeClass("subMenu_container_visible")
    var b = $(".allSub_menuitem_container").children("li")[index]
    $(b).addClass("subMenu_container_visible")

    var c = findCurrentMenu()
    appData.muneDetailInfo = appData.mainMenuList[c[0]]
}

//4.添加子菜单
function addSubMenuItemClick() {

    $(".portable_editor").css("visibility","hidden")
    $(".saveAndPublishBtn").css("visibility","hidden")
    //1.找出当前是在第几个主菜单下
    var a = findCurrentMenu()[0]

    //2.在主菜单下的sub_button数组属性下添加数据
    var subMenu = {
        "type": "view",
        "name": "子菜单名称",
        "url": "",
        "sub_button": []
    }

    if(appData.mainMenuList[a].sub_button.length >= 5){
        alert("子菜单最多添加5个")
    }else {
        appData.mainMenuList[a].sub_button.push(subMenu)
    }

    //3.去除原来菜单的选中状态
    $(".menu_item_active").removeClass("menu_item_active")

    //4.添加新添加的子菜单的选中状态(暂时没做)

    setTimeout(changeSubMenuPosition,0)
//        setTimeout(changeSubMenuStyleFunc(a),0)
    resetPage()
}
/*
 function changeSubMenuStyleFunc(a) {
 var b =  $(".allSub_menuitem_container").children("li")
 var c = $(b[a]).find("ul")
 var d = $(c).find("li")

 var count = d.length;

 if(count == 1){
 $(".sub_menu_item:eq(1)").addClass("menu_item_active")
 }else if(count == 2){
 $(".sub_menu_item:eq(2)").addClass("menu_item_active")
 }else if (count == 3){
 $(".sub_menu_item:eq(3)").addClass("menu_item_active")
 }else if(count == 4){
 $(".sub_menu_item:eq(4)").addClass("menu_item_active")
 }else if(count == 5){
 $(".sub_menu_item:eq(5)").addClass("menu_item_active")
 }
 }
 */
//5.切换焦点
function changeSubFocusClick(ind) {
    $(".portable_editor").css("visibility","visible")
    $(".saveAndPublishBtn").css("visibility","visible")
    var a = findCurrentMenu()[0]

    //2.所有的子菜单
    var b =  $(".allSub_menuitem_container").children("li")

    $(".menu_item_active").removeClass("menu_item_active")
    var c = $(b[a]).find("ul")
    var d = $(c).find("li")[ind]
    $(d).addClass("menu_item_active")
    appData.muneDetailInfo = appData.mainMenuList[a].sub_button[ind]
}

//6.资源选择点击了确定
function conformBtnClick() {
//        alert($("#removePostSelect").find("option:selected").text())
    $(".concreteInnerMessageContent").hide()
    $(".selectedPickerContentContiner").show()
    $(".selectedPickerContentInner").text($("#removePostSelect").find("option:selected").text())
    var c = findCurrentMenu();

    if (c[1] === 999){
        if(appData.muneDetailInfo.key != ""){
            appData.mainMenuList[c[0]].key = $("#removePostSelect").find("option:selected").text();
        }
    }else {
        if(appData.muneDetailInfo.key != ""){
            appData.mainMenuList[c[0]].sub_button[c[1]].key = $("#removePostSelect").find("option:selected").text();
        }
    }


    $("#backgroundDiv").hide()
}

//7.资源选择点击了取消
function cancleBtnClick() {

    $("#backgroundDiv").hide()
}

//8.资源选择了删除
function deletePickerContentBtnClick() {
    resetPage()
}

function resetPage() {
    var c = findCurrentMenu();

    if (c[1] === 999){
        if(appData.muneDetailInfo.key != ""){
            appData.mainMenuList[c[0]].key = "";
        }
    }else {
        if(appData.muneDetailInfo.key != ""){
            appData.mainMenuList[c[0]].sub_button[c[1]].key = "";
        }
    }

    $(".concreteInnerMessageContent").show()
    $(".selectedPickerContentContiner").hide()
    $(".selectedPickerContentInner").text("")
}

//找到当前选中的是第几个菜单
function findCurrentMenu() {
    //1.找出当前自菜单是在第几个主菜单下
    var a = 0;
    $( ".perSub_menu_container" ).each(function(index) {
        if ($(this).is($(".subMenu_container_visible"))){
            a = index
        }
    });

    //2.所有的子菜单
    var b =  $(".allSub_menuitem_container").children("li")
    var c = $(b[a]).find("ul")
    var d = $(c).find("li")

    var e = 999;
    for(var i = 0; i < d.length; i++){
        if ($(d[i]).is($(".menu_item_active"))){
            e = i;
        }
    }

    return [a,e]
}


//初始化menu样式
function initialMenu() {
    //计算当前主菜单有多少个li
    //注意:
    //1.只有1个li时,没有子菜单
    //2.有2个li时,有1个子菜单,宽度是2个主菜单时主菜单的宽度
    //3.有3个li时,有2个子菜单,宽度是3个主菜单时主菜单的宽度
    //4.有4个li时,有3个子菜单,宽度是3个主菜单时主菜单的宽度

    var listCount = $(".pre_menu_list").children("li").length
    var itemTotalWidth = $('.pre_menu_list').width()
    $(".pre_menu_list li:first").addClass("menu_item_active")
    $(".allSub_menuitem_container li:first").addClass("subMenu_container_visible")

    $(".portable_editor").css("visibility","visible")
    $(".saveAndPublishBtn").css("visibility","visible")

    if (listCount < 4){
        if (listCount == 1){
            $(".portable_editor").css("visibility","hidden")
            $(".saveAndPublishBtn").css("visibility","hidden")
            $(".perSub_menu_container").width(0)
        }
        $(".pre_menu_item").width((itemTotalWidth - (2 * listCount)) / listCount)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * listCount)) / listCount)

    }else if (listCount >= 4){
        $(".pre_menu_item").width((itemTotalWidth - (2 * 3)) / 3)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * 3)) / 3)
    }
    changeSubMenuPosition()
}

//调整子菜单的布局
function changeSubMenuPosition() {

    var itemTotalWidth = $('.pre_menu_list').width()
    var a =  $(".allSub_menuitem_container").children("li")

    for (var i =0;i<a.length;i++){

        $(a[i]).css("left",i * (itemTotalWidth/3)+"px")

        var b = $(a[i]).find('ul');
        var c = $(b).find("li");
        var d = $(".sub_menu_list")[i];
        $(d).height(c.length * 50);

        for (var j =0;j<c.length;j++){
            $(c[j]).css("bottom", (c.length - j - 1) * 50 + "px");
        }
    }
}

//添加menu调整menu的宽度
function changeMenuWidth() {
    //计算当前有多少个li
    var listCount = $(".pre_menu_list").children("li").length
    var itemTotalWidth = $('.pre_menu_list').width()

    if (listCount < 4){
        if(listCount == 1){
            $("#add_menu_item").addClass("menu_item_active")
        }else {

            $("#add_menu_item").removeClass("menu_item_active")
            if(listCount == 2){
                $(".pre_menu_list li:eq(0)").addClass("menu_item_active")

                var p = $(".allSub_menuitem_container").children("li")[0]
                $(p).addClass("subMenu_container_visible")


            }else if (listCount == 3){
                $(".pre_menu_list li:eq(0)").removeClass("menu_item_active")
                $(".pre_menu_list li:eq(1)").addClass("menu_item_active")

                var q = $(".allSub_menuitem_container").children("li")[0]
                $(q).removeClass("subMenu_container_visible")
                var r = $(".allSub_menuitem_container").children("li")[1]
                $(r).addClass("subMenu_container_visible")

            }
        }
        $(".pre_menu_item").width((itemTotalWidth - (2 * listCount)) / listCount)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * listCount)) / listCount)
    }else if (listCount >= 4){
        if (listCount == 4){
            $(".pre_menu_list li:eq(1)").removeClass("menu_item_active")
            $(".pre_menu_list li:eq(2)").addClass("menu_item_active")

            var s = $(".allSub_menuitem_container").children("li")[1]
            $(s).removeClass("subMenu_container_visible")
            var t = $(".allSub_menuitem_container").children("li")[2]
            $(t).addClass("subMenu_container_visible")
        }
        $(".pre_menu_item").width((itemTotalWidth - (2 * 3)) / 3)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * 3)) / 3)
    }

    changeSubMenuPosition()
}

//删除menu调整menu的宽度
function deleteMenuChangeMenuWidth() {
    //计算当前有多少个li
    var listCount = $(".pre_menu_list").children("li").length
    var itemTotalWidth = $('.pre_menu_list').width()

    if (listCount < 4){
        if(listCount == 1){
            $("#add_menu_item").addClass("menu_item_active")
            $(".perSub_menu_container").width(0)
        }
        $(".pre_menu_item").width((itemTotalWidth - (2 * listCount)) / listCount)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * listCount)) / listCount)
    }else if (listCount >= 4){
        $(".pre_menu_item").width((itemTotalWidth - (2 * 3)) / 3)
        $(".perSub_menu_container").width((itemTotalWidth - (2 * 3)) / 3)
    }

    changeSubMenuPosition()

}