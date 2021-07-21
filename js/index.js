
$(function(){
    var type = 'record' // 当前模块
    var page = 1, //分页码
        off_on = false, //分页开关(滚动加载方法 1 中用的)
        timers = null; //定时器(滚动加载方法 2 中用的)

//加载数据
    var LoadingDataFn = function() {
        var dom = '';
        for (var i = 0; i < 10; i++) {
            dom += '<div class="list-cell"><img class="list-head" src="img/03.jpg"><div class="list-center"><p class="list-name">笑笑</p><p class="list-archive">获得了3个环保证书</p></div><p class="list-right">98.7kg</p></div>';
        }
        $('.list-tab-' + type).append(dom);
        off_on = true; //[重要]这是使用了 {滚动加载方法1}  时 用到的 ！！！[如果用  滚动加载方法1 时：off_on 在这里不设 true的话， 下次就没法加载了哦！]
    };
    // tab 切换
    $('.tab-btn').click( function () {
        type = $(this).attr('data-key')
        $('.list-tab-' + type).show().siblings().hide()
        page = 1
        LoadingDataFn();
    })

//初始化， 第一次加载
    $(document).ready(function() {
        LoadingDataFn();
    });

//底部切换
    $(document.body).on('click', '#footer div', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

//滚动加载方法1
    $('.list-main').scroll(function() {
        //当时滚动条离底部60px时开始加载下一页的内容
        if (($(this)[0].scrollTop + $(this).height() + 60) >= $(this)[0].scrollHeight) {
            //这里用 [ off_on ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦）
            if (off_on) {
                //off_on = false;
                //page++;
                //console.log("第"+page+"页");
                //LoadingDataFn();  //调用执行上面的加载方法
            }
        }
    });

//滚动加载方法2
    $('.list-main').scroll(function() {
        //当时滚动条离底部60px时开始加载下一页的内容
        if (($(this)[0].scrollTop + $(this).height() + 60) >= $(this)[0].scrollHeight) {
            clearTimeout(timers);
            //这里还可以用 [ 延时执行 ] 来控制是否加载 （这样就解决了 当上页的条件满足时，一下子加载多次的问题啦）
            timers = setTimeout(function() {
                page++;
                console.log("第" + page + "页");
                LoadingDataFn(); //调用执行上面的加载方法
            }, 300);
        }
    });

//还可以基window窗口（body）来添加滚动事件, (因为布局不同,所以在这里没效果，因为[上面是基于body中的某个元素来添加滚动事的])
    $(window).scroll(function() {
        //当时滚动条离底部60px时开始加载下一页的内容
        if (($(window).height() + $(window).scrollTop() + 60) >= $(document).height()) {
            clearTimeout(timers);
            timers = setTimeout(function() {
                page++;
                console.log("第" + page + "页");
                LoadingDataFn();
            }, 300);
        }
    });

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
