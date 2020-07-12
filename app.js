var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/public',express.static(__dirname + '/public'))
app.use('/node_modules',express.static(__dirname + '/node_modules'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var user = []

io.on('connection', (socket) => {

    socket.on('login', (data) => {

        var tar_user = user.find( item => {
            return item.userName === data.userName
        })

        if(tar_user){
            return socket.emit('login', {
              err_code: 1,
              msg: "用户名重复"
            })

        }else {
            user.push(data)

            socket.selfName = data.userName
            socket.avatar = data.avatar
            socket.emit('login', {
                err_code: 0,
                msg: "ok"
            })
            io.emit('successLogin', {
                self: data,
                user_count: user.length,
                user,
            })

        }
    })
    socket.on('sendMsg', (data) => {
        io.emit('sendMsg', {
            self: socket.selfName,
            avatar: socket.avatar,
            msg: data
        })
    })
    socket.on('sendImage', (image) => {
        io.emit('sendImage', {
            self: socket.selfName,
            avatar: socket.avatar,
            image
        })
    })
    socket.on('disconnect', () => {
        console.log('disconnect')

        user = user.filter(item => {
            return item.userName !== socket.selfName
        })

        io.emit('logout', {
            self: socket.selfName,
            user_count: user.length,
            user,
        })
    })
});

http.listen(8080, () => {
    console.log('listening on *:8080');
});