;$(function () {

    window.onload = function () {
        var type = 'record' // 当前模块
        var page = 1, //分页码
            timers = null; //定时器(滚动加载方法 2 中用的)

//加载数据
        var LoadingDataFn = function () {
            var dom = '';
            for (var i = 0; i < 10; i++) {
                dom += '<div class="list-cell"><img class="list-head" src="img/03.jpg"><div class="list-center"><p class="list-name">笑笑</p><p class="list-archive">获得了3个环保证书</p></div><p class="list-right">98.7kg</p></div>';
            }
            $('.list-tab-' + type).append(dom);
        };
        // tab 切换
        $('.tab-btn').click(function () {
            type = $(this).attr('data-key')
            $('.list-tab-' + type + ' .list-cell').remove()
            $('.list-tab-' + type).show().siblings().hide()
            page = 1
            LoadingDataFn();
        })

//初始化， 第一次加载
        $(document).ready(function () {
            LoadingDataFn();
        });


//还可以基window窗口（body）来添加滚动事件, (因为布局不同,所以在这里没效果，因为[上面是基于body中的某个元素来添加滚动事的])
        $(window).scroll(function () {
            //当时滚动条离底部60px时开始加载下一页的内容
            if (($(window).height() + $(window).scrollTop() + 60) >= $(document).height()) {
                clearTimeout(timers);
                timers = setTimeout(function () {
                    page++;
                    console.log("第" + page + "页");
                    LoadingDataFn();
                }, 300);
            }
        });

        var _popWidth = document.documentElement.clientWidth
        var _popHeight = ($('.tab-bar').offset().top)
        var _centerPopSize = 200
        var bigPopTop = Math.round((_popWidth - _centerPopSize) / 2) + 50;
        var bigPopLeft = Math.round((_popHeight - _centerPopSize) / 2) - 50;
        function initPop() {
            var position = new Array();
            var bigPopHtml = `<div class="popBig" style="left: ${bigPopLeft}px; width: ${_centerPopSize - 20}px; height: ${_centerPopSize - 20}px; top: ${bigPopTop}px; animation: ani_circle 2.5s infinite;"><p>我的星币</p>$100<p class="btn">一键收取</p></div>`
            $('.content').append(bigPopHtml);
            //初始化布局数组
            for (var i = 0; i < 100; i++) {
                position[i] = new Array();
                for (var j = 0; j < 100; j++) {
                    position[i][j] = {radius: 0, isPlanted: 0};
                }
            }

            //随机种植树木
            var treeCount = 1000;
            //树木最大半径
            var treeRadiusMax = 3;
            for (var i = 0; i < treeCount; i++) {

                //随机选择一个位置来种植一棵树
                var treeX = Math.floor(Math.random() * (_popWidth / 10));
                var treeY = Math.floor(Math.random() * (_popHeight / 10));
                //不种植的区域排除掉
                var vacantStartX = Math.round((_popWidth - _centerPopSize) / 20);
                var vacantEndX = Math.round(((_popWidth - _centerPopSize) / 2 + _centerPopSize) / 10);
                var vacantStartY = Math.round((_popHeight - _centerPopSize) / 20);
                var vacantEndY = Math.round(((_popHeight - _centerPopSize) / 2 + _centerPopSize) / 10);


                if (treeX >= vacantStartX && treeX <= vacantEndX && treeY >= vacantStartY && treeY <= vacantEndY) {
                    //如果在不种植区则跳过后续操作
                    continue;
                }

                if (position[treeX][treeY].isPlanted == 1) {
                    //如果该位置已经植入树木则跳过后续操作
                    continue;
                }
                //树木直径随机
                var treeRadius = treeRadiusMax * Math.random();
                treeRadius = Math.max(2, treeRadius);

                //初始设定为可以种植
                position[treeX][treeY].radius = treeRadius;
                position[treeX][treeY].isPlanted = 1;

                //计算检测框范围
                checkStartX = Math.max(treeX - Math.ceil(treeRadius) - treeRadiusMax, 0);
                checkStartY = Math.max(treeY - Math.ceil(treeRadius) - treeRadiusMax, 0);
                checkEndX = Math.min(treeX + Math.ceil(treeRadius) + treeRadiusMax, 99);
                checkEndY = Math.min(treeY + Math.ceil(treeRadius) + treeRadiusMax, 99);
                for (var x = checkStartX; x <= checkEndX; x++) {
                    for (var y = checkStartY; y <= checkEndY; y++) {
                        //除了当前位置 和框定范围内已经植入的树木比较距离
                        if (!(treeX == x && treeY == y) && (position[x][y].isPlanted == 1)) {
                            //比较两点间距离和两点半径和的大小 判断是否重叠
                            var treeDistanceSquared = (treeX - x) * (treeX - x) + (treeY - y) * (treeY - y);
                            var radiusSumSquared = (position[x][y].radius + treeRadius) * (position[x][y].radius + treeRadius);

                            if (treeDistanceSquared < radiusSumSquared) {
                                //发生碰撞则标记不可种植
                                position[treeX][treeY].radius = 0;
                                position[treeX][treeY].isPlanted = 0;
                            }

                        }
                    }
                }

                if (position[treeX][treeY].isPlanted == 1) {

                    //显示结果图形
                    var factor = 10;
                    var elementSize = position[treeX][treeY].radius * factor * 2;
                    var elementRadius = position[treeX][treeY].radius * factor * 2;
                    var elementLeft = (treeX - position[treeX][treeY].radius) * factor;
                    var elementTop = (treeY - position[treeX][treeY].radius) * factor;
                    if(elementLeft>0 && elementTop>0 && (elementLeft+elementSize)<_popWidth){

                        showResult(i, elementSize, elementRadius, elementLeft, elementTop);
                    }

                }

            }//植树完毕

        }//初始化完毕
        function showResult(i, elementSize, elementRadius, elementLeft, elementTop) {
            var _speed = rndFixed2(2, 3)
            var _pop = `<div class="popSmall" style="left: ${elementLeft}px; width: ${elementSize}px; height: ${elementSize}px; line-height: ${elementSize}px; top: ${elementTop}px; animation: ani_circle ${_speed}s infinite;">$${_speed}</div>`
            $('.content').append(_pop);
        }

        function rndFixed2(n, m) {
            var random = Math.random();
            var random1 = (random * (m - n) + n).toFixed(2)
            return random1;
        }

        initPop();

        // 添加删除事件
        $(document).on("click", ".popSmall", function () {
            var _this = $(this);
            var _thisTop = _this.position().top;

            _this.delay(200).animate({
                opacity: 0,
                top: _thisTop - 40
            }, function () {
                _this.remove()
            })
        })
        // 添加删除事件
        $(document).on("click", ".popBig .btn", function () {
            var _popPosition = $('.popBig').position()
            var _popTop = _popPosition.top + 100
            var _popLeft = _popPosition.left + 100

            $(".popSmall").delay(200).animate({
                top: _popTop,
                left: _popLeft,
            },'slow', function () {
                $(".popSmall").remove()
            })
        })
    }
})
