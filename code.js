$(document).ready(function() {
	$('#username').val('bluewave41');
	$('#password').val('password');
	$('#token').val('1');
    registerToLogin();
})

function loginToRegister() {
    $('#registerButton, #submitButton').off('click');
    $('#submitButton').click(function() {
        post('account.php', {type: 'register', username: $('#username').val(), password: $('#password').val(), token: $('#token').val()}, '#accountStatus');
    })
    $('#registerButton').click(function() {
        $('#registerButton').text('Register');
        registerToLogin();
    })
}

function registerToLogin() {
    $('#registerButton, #submitButton').off('click');
    $('#submitButton').click(function() {
        post('account.php', {type: 'login', username: $('#username').val(), password: $('#password').val(), token: $('#token').val()}, '#accountStatus', function(data) {
            if(data == 'Success') {
                $('.container').fadeOut('slow', function() {
                    getView('lobby.html');
                });
            }
        });
    })
    $('#registerButton').click(function() {
        $('#registerButton').text('Sign In');
        loginToRegister()
    })
}

function post(where, data, selector, callback) {
    $.ajax({
        type: "POST",
		url: 'http://127.0.0.1:8080/test%20game/php/'+where,
		data: data,
		success: function(data) {
            $(selector).html(data);
            callback(data);
		}
    });
}

function getView(view) {
    $.get('/Test%20Game/views/'+view).done(function(d) {
        console.log(d);
        $('.container').html(d).fadeIn('slow');
    })
}