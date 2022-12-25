$(function ()
{
    // Make connection
    var socket = io.connect('http://192.168.1.39:1212');

    // Socket event
    socket.on("send", function (data) {
        console.log(data);
        $("#content").append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    // Bắt sự kiện click gửi message
    $("#sendMessage").on('click', function () {
        var username = $('#username').val();
        var message = $('#message').val();

        if (username == '' || message == '') {
            alert('Please enter name and message!!');
        } else {
            //Gửi dữ liệu cho socket
            socket.emit('send', {username: username, message: message});
            $('#message').val('');
        }
    })
})