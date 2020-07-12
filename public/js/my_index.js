//拿到用户名和头像，并上传服务器
var userName, avatar;

$('.avatar li').on('click', function () {
    $(this)
        .addClass('now')
        .siblings()
        .removeClass('now')

})
$(function () {
    var socket = io();
    $('#loginBtn').on('click', function () {
        userName = $('#username').val().trim()
        avatar = $('.avatar li.now img').attr('src')
        if(!userName) {
            return window.alert('请输入名字')
        }
        if(!avatar) {
            return window.alert('请选择头像')
        }

        socket.emit('login', {
            userName,
            avatar
        });
    })
    socket.on('login', (data) => {

        if(data.err_code === 1){
            window.alert(data.msg)
        }else {
            $('.login_box').fadeOut()
            $('.container').fadeIn()
            $('.avatar img.avatar_url').attr('src', avatar)
            $('.info .username').text(userName)


        }
    })
    socket.on('successLogin', (data) => {
        var html = `<div class="system">
            <p class="message_system">
              <span class="content">"${data.self.userName}"加入了群聊</span>
            </p>
          </div>`
        $('.box-bd').append(html)
        myScrollIntoView()
        $('#userCount').text(data.user_count)
        $('.user-list ul').html('')
        data.user.forEach(item => {
            if(item.userName !== userName){
                var user_item =
                 `<li>
                <div class="avatar">
                    <img class="img avatar_url" src="${item.avatar}" alt="" />
                </div>
                <div class="info">
                    <h3 class="username" id="self_name">${item.userName}</h3>
                </div>
                </li>`
                $('.user-list ul').append(user_item)
            }

        })

    })

    socket.on('logout', (data) => {
        var html = `<div class="system">
            <p class="message_system">
              <span class="content">"${data.self}"退出了群聊</span>
            </p>
          </div>`
        $('.box-bd').append(html)
        $('#userCount').text(data.user_count)
        $('.user-list ul').html('')
        data.user.forEach(item => {
            if(item.userName !== userName){
                var user_item =
                    `<li>
                <div class="avatar">
                    <img class="img avatar_url" src="${item.avatar}" alt="" />
                </div>
                <div class="info">
                    <h3 class="username" id="self_name">${item.userName}</h3>
                </div>
                </li>
                `
                $('.user-list ul').append(user_item)
            }
            myScrollIntoView()

        })

    })
    $('#btn-send').on('click', function () {
        var content = $('#content').html()
        socket.emit('sendMsg', content)
        $('#content').html('')
    })
    socket.on('sendMsg', (data) => {
        if(data.self === userName){
            var html = `<div class="message-box">
            <div class="my message">
              <img class="avatar" src="${avatar}" alt="" />
              <div class="content">
                <div class="bubble">
                  <div class="bubble_cont">${data.msg}</div>
                </div>
              </div>
            </div>
          </div>`
            $('.box-bd').append(html)
        }else{
            var html = `<div class="message-box">
            <div class="other message">
              <img class="avatar" src=${data.avatar} alt="" />
              <div class="content">
                <div class="nickname">${data.self}</div>
                <div class="bubble">
                  <div class="bubble_cont">${data.msg}</div>
                </div>
              </div>
            </div>
          </div>`
            $('.box-bd').append(html)
        }
        myScrollIntoView()
    })
    function myScrollIntoView() {
        $('.box-bd').children(':last')
            .get(0)
            .scrollIntoView({
                block: "end",
                behavior: "smooth"
            });
    }
    $('.face').on('click', function () {
        $("#content").emoji({
            button: ".face",
            showTab: false,
            animation: 'fade',
            position: 'topRight',
            icons: [{
                name: "贴吧表情",
                path: "/public/lib/jquery-emoji/img/tieba/",
                maxNum: 50,
                file: ".jpg",
                placeholder: ":{alias}:",
                alias: {
                    1: "hehe",
                    2: "haha",
                    3: "tushe",
                    4: "a",
                    5: "ku",
                    6: "lu",
                    7: "kaixin",
                    8: "han",
                    9: "lei",
                    10: "heixian",
                    11: "bishi",
                    12: "bugaoxing",
                    13: "zhenbang",
                    14: "qian",
                    15: "yiwen",
                    16: "yinxian",
                    17: "tu",
                    18: "yi",
                    19: "weiqu",
                    20: "huaxin",
                    21: "hu",
                    22: "xiaonian",
                    23: "neng",
                    24: "taikaixin",
                    25: "huaji",
                    26: "mianqiang",
                    27: "kuanghan",
                    28: "guai",
                    29: "shuijiao",
                    30: "jinku",
                    31: "shengqi",
                    32: "jinya",
                    33: "pen",
                    34: "aixin",
                    35: "xinsui",
                    36: "meigui",
                    37: "liwu",
                    38: "caihong",
                    39: "xxyl",
                    40: "taiyang",
                    41: "qianbi",
                    42: "dnegpao",
                    43: "chabei",
                    44: "dangao",
                    45: "yinyue",
                    46: "haha2",
                    47: "shenli",
                    48: "damuzhi",
                    49: "ruo",
                    50: "OK"
                },
                title: {
                    1: "呵呵",
                    2: "哈哈",
                    3: "吐舌",
                    4: "啊",
                    5: "酷",
                    6: "怒",
                    7: "开心",
                    8: "汗",
                    9: "泪",
                    10: "黑线",
                    11: "鄙视",
                    12: "不高兴",
                    13: "真棒",
                    14: "钱",
                    15: "疑问",
                    16: "阴脸",
                    17: "吐",
                    18: "咦",
                    19: "委屈",
                    20: "花心",
                    21: "呼~",
                    22: "笑脸",
                    23: "冷",
                    24: "太开心",
                    25: "滑稽",
                    26: "勉强",
                    27: "狂汗",
                    28: "乖",
                    29: "睡觉",
                    30: "惊哭",
                    31: "生气",
                    32: "惊讶",
                    33: "喷",
                    34: "爱心",
                    35: "心碎",
                    36: "玫瑰",
                    37: "礼物",
                    38: "彩虹",
                    39: "星星月亮",
                    40: "太阳",
                    41: "钱币",
                    42: "灯泡",
                    43: "茶杯",
                    44: "蛋糕",
                    45: "音乐",
                    46: "haha",
                    47: "胜利",
                    48: "大拇指",
                    49: "弱",
                    50: "OK"
                }
            }, {
                name: "QQ高清",
                path: "/public/lib/jquery-emoji/img/qq/",
                maxNum: 91,
                excludeNums: [41, 45, 54],
                file: ".gif",
                placeholder: "#qq_{alias}#"
            }, {
                name: "emoji高清",
                path: "/public/lib/jquery-emoji/img/emoji/",
                maxNum: 84,
                file: ".png",
                placeholder: "#emoji_{alias}#"
            }]
        });
    })
    $('#file').on('change', function () {
        var reader = new FileReader();
        //该函数没有返回值，读取结果存放于reader.result
        reader.readAsDataURL($(this).get(0).files[0]);
        //读取文件是异步操作，需要事件监听才能查看
        reader.onload = function() {
            //文件已读取完毕 将结果赋值给src元素

            socket.emit('sendImage', reader.result)
            // showBox.querySelector('img').src = reader.result;
        }
    })
    socket.on('sendImage', (data) => {
        if(data.self === userName){
            var html = `<div class="message-box">
            <div class="my message">
              <img class="avatar" src="${avatar}" alt="" />
              <div class="content">
                <div class="bubble">
                  <div class="bubble_cont">
                        <img src="${data.image}" alt="" />
                    </div>
                </div>
              </div>
            </div>
          </div>`
            $('.box-bd').append(html)
        }else{
            var html = `<div class="message-box">
            <div class="other message">
              <img class="avatar" src=${data.avatar} alt="" />
              <div class="content">
                <div class="nickname">${data.self}</div>
                <div class="bubble">
                    <div class="bubble_cont">
                        <img  src="${data.image}" alt="" />
                    </div>
                </div>
              </div>
            </div>
          </div>`
            $('.box-bd').append(html)
        }
        //添加放大功能
        $('.content .bubble_cont img').on('click', function () {
            console.log(this)
            // $('.container').fadeOut()
            var src = $(this).attr('src')

            $('.show-image img').attr('src', src)
            $('.show-image').fadeIn()

        })
    })
    //最后一个图片加载完毕，再滚动
    $('.box-bd img:last-child').on('load', () => {
        myScrollIntoView()
    })


});
