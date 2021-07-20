
$(function(){
    // tab 切换
    $('.tab-btn').click( function () {
        var key = $(this).attr('data-key')
        $('.list-tab-' + key).show().siblings().hide()
    })


    // var qiuList = [
    //     {
    //     num: 1,
    //     type: "type1"
    // }, {
    //     num: 34,
    //     type: "type2"
    // },{
    //     num: 100,
    //     type: "type1"
    // }, {
    //     num: 80,
    //     type: "type1"
    // },{
    //     num: 1,
    //     type: "type1"
    // }, {
    //     num: 34,
    //     type: "type1"
    // },{
    //     num: 100,
    //     type: "type1"
    // }, {
    //     num: 80,
    //     type: "type1"
    // }, {
    //     num: 34,
    //     type: "type1"
    // },{
    //     num: 100,
    //     type: "type1"
    // }, {
    //     num: 80,
    //     type: "type1"
    // }];
    // var str = '';
    // var x=0,y=0;
    // var arr=[0,0];
    // var circleList = [];
    // var distance = 100;
    // var fontSize = document.documentElement.clientWidth/375*100
    // var viewH = parseInt($(window).height() - $(".js_fix_tool").height() - 0.5*fontSize);
    //
    // //循环创建能量球
    // for(var j = 0; j < qiuList.length; j++) {
    //
    //     var pos = creatCircle(circleList);
    //     if(pos) {
    //         circleList.push(pos)
    //
    //         var speed = rndFixed1(2, 3);
    //         var _opa = rndFixed1(0.6, 1)
    //         var _top = pos.y;
    //         var _left = pos.x;
    //
    //         if(qiuList[j].type == "type2") {
    //             str += `<div class="ore2 js_ore" style="left: ${_left}px; top: ${_top}px; opacity:${_opa}; animation: ani_circle ${speed}s infinite;"></div>`
    //         } else {
    //             str += `<div class="ore1 js_ore" style="left: ${_left}px; top: ${_top}px; opacity:${_opa}; animation: ani_circle ${speed}s infinite;"></div>`
    //         }
    //     } else {
    //         j--
    //     }
    //
    // }
    // $(".ore-box").html(str)
    //
    // // 传参：arrList：已经创建好的圆的列表
    // function creatCircle(arrList) {
    //     var circle_pos = {
    //         x: rnd(parseInt(0.3*fontSize), parseInt(3.5*fontSize)),
    //         y: rnd(parseInt(0.3*fontSize), viewH)
    //     }
    //
    //     if(arrList.length) {
    //         var isFlag = true;
    //         var times = 0;
    //         for (var i=0; i< arrList.length; i++) {
    //             var isCover = getDistance(arrList[i], circle_pos, distance)
    //             if(!isCover) { //
    //                 isFlag = false;
    //                 times +=1;
    //                 if(times == 3 ) {
    //                     return circle_pos
    //                 }
    //                 creatCircle(circle_pos)
    //             }
    //         }
    //         if(isFlag) {
    //             return circle_pos
    //         }
    //     } else {
    //         return circle_pos
    //     }
    // }
    //
    //
    // // 判断两点之间距离是否大于两个圆的半径
    // function getDistance(p1, p2, distance) {
    //     var dx = Math.abs(p2.x - p1.x);
    //     var dy = Math.abs(p2.y - p1.y);
    //     var dis = parseInt(Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2)));
    //     return (dis > distance);
    // }
    //
    // // 获取随机数
    // function rnd(n, m) {
    //     var random = Math.floor(Math.random() * (m - n + 1) + n);
    //     return random;
    // }
    // function rndFixed2(n, m) {
    //     var random = Math.random();
    //     var random1 = (random * (m - n) + n).toFixed(2)
    //     return random1;
    // }
    // function rndFixed1(n, m) {
    //     var random = (Math.random() + n).toFixed(1);
    //     return random;
    // }
    //
    //
    // $(document).on("click", ".js_ore", function(){
    //     var _this = $(this);
    //     var _thisTop = _this.position().top;
    //
    //     _this.delay(200).animate({
    //         opacity: 0,
    //         top: _thisTop - 40
    //     }, function(){
    //         _this.remove()
    //     })
    // })
})
