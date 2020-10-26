$(function () {
    // let backMusic = $("<audio src='../music/background.mp3' autoplay id='hint'/>");//加背景音乐
    // backMusic.appendTo("body");
    /*自动播放 */
    let index = 0;//当前按钮的位置
    let next = 0;
    let per = 0;
    let btnT = false;//判断是否能继续点击
    let backMusic = document.getElementsByClassName("backMusic")[0];
    $("body").on("click",function(){
        backMusic.play();//继续背景音乐
    })
    //点击按钮播放视频
    $(".playBtn").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".videos").css({ "left": "50%" });
        $(".videos video").trigger("load");//重新加载视频
        $(".videos video").trigger("play");//播放视频
        backMusic.pause();//暂停背景音乐
    })
    //点击X按钮关闭视频
    $(".close").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".videos").css({ "left": "500%" });
        $(".videos video").trigger("pause");//暂停视频
        backMusic.play();//继续背景音乐
    })

    let srcArr = [{ src1: "../image/提示框/star2.png", src2: "../image/提示框/star1.png" },
    { src1: "../image/提示框/ruleGame2.png", src2: "../image/提示框/ruleGame1.png" },

    { src1: "../image/提示框/setGame2.png", src2: "../image/提示框/setGame1.png" },
    { src1: "../image/提示框/exitGame2.png", src2: "../image/提示框/exitGame1.png" }]
    for (let i = 0; i < $(".lunbo").length; i++) {
        //鼠标放在标签上改变图片
        $(".lunbo").eq(i).mouseover(function () {
            $(".lunbo:eq(" + i + ") img").attr({ src: srcArr[i].src1 })
        });
        //鼠标移开标签上改变图片
        $(".lunbo").eq(i).mouseout(function () {
            $(".lunbo:eq(" + i + ") img").attr({ src: srcArr[i].src2 })
        });
    }
    //鼠标放在按钮上变化颜色
    $(".no").mouseover(function () {
        $(".no img").attr({ src: "../image/提示框/noW2.png" })
    })
    $(".no").mouseout(function () {
        $(".no img").attr({ src: "../image/提示框/noW1.png" })
    })
    $(".no").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".exitW").css({ "display": "none" })
    })

    $(".ok").mouseover(function () {
        $(".ok img").attr({ src: "../image/提示框/okW2.png" })
    })
    $(".ok").mouseout(function () {
        $(".ok img").attr({ src: "../image/提示框/okW1.png" })
    })

    $(".ok").on("click", function () {
        showSound("../music/clickOn.mp3");
        window.close();
    })
    //点击左边按钮左移
    $(".left").on("click", function () {
        showSound("../music/clickOn.mp3");
        //判断是否继续执行
        if (btnT == true) {
            return;
        }
        btnT = true;
        for (let i = 0; i < $(".lunboContent .lunbo").length; i++) {
            if (i > index) {
                $(".lunboContent .lunbo").eq(i).css({ "left": "100%" })

            }
            if (i < index) {
                $(".lunboContent .lunbo").eq(i).css({ "left": "-70%" })
            }
            if (index == 3) {
                $(".lunboContent .lunbo").eq(0).css({ "left": "100%" })
            }
        }
        next = index + 1;
        if (next == 4) {
            next = 0
        }
        $(".lunboContent .lunbo").eq(next).addClass("lunbo1");
        $(".lunboContent .lunbo").eq(next).animate({ "left": "15%" }, 1000)
        $(".lunboContent .lunbo").eq(index).animate({ "left": "-70%" }, 1000, function () {
            $(".lunboContent .lunbo").eq(index).removeClass("lunbo1");
            index++;
            if (index == 4) {
                index = 0;
            }
            btnT = false;
        });

    })
    //点击右边按钮左移
    $(".right").on("click", function () {
        showSound("../music/clickOn.mp3");
        //判断是否继续执行
        if (btnT == true) {
            return;
        }
        btnT = true;
        for (let i = 0; i < $(".lunboContent .lunbo").length; i++) {
            if (i > index) {
                $(".lunboContent .lunbo").eq(i).css({ "left": "100%" })
            }
            if (i < index) {
                $(".lunboContent .lunbo").eq(i).css({ "left": "-70%" })
            }
            if (index == 0) {
                $(".lunboContent .lunbo").eq(3).css({ "left": "-70%" })
            }
        }
        per = index - 1;
        if (per == -1) {
            per = 3;
        }
        $(".lunboContent .lunbo").eq(per).addClass("lunbo1");
        $(".lunboContent .lunbo").eq(per).animate({ "left": "15%" }, 1000)
        $(".lunboContent .lunbo").eq(index).animate({ "left": "100%" }, 1000, function () {
            $(".lunboContent .lunbo").eq(index).removeClass("lunbo1");
            index--;
            if (index == -1) {
                index = 3;
            }
            btnT = false;
        });
    })
    $(".exit").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".exitW").css({ "display": "block" })
    })
    /**
        * 产生音效
        * @param audioSrc ：音频路径
        */
    function showSound(audioSrc) {
        $("#hint").remove();/**因为音效元素是追加的，所以每次生成之前，将原来的删除掉*/
        var audioJQ = $("<audio src='" + audioSrc + "' autoplay id='hint'/>");
        audioJQ.appendTo("body");/**创建 audio 标签的 Jquery 对象，然后追加到 body 进行播放*/
    }
    /*滚动滚轮事件,通过滑动滚轮实现按钮上下移动 */
    $(".lunboContent").on("mousewheel DOMMouseScroll", function (e) {
        let delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));//获得当前对象的位置
        if (delta > 0) {//判断滚轮是向上滚动还是向下滚动
           $(".right").click();
        } if (delta < 0) {
            $(".left").click();
        }
 
    });

})
