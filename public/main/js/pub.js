$(function() {

});

// 游客用户注册切换
$(document).on('click', '.btn-regtip', function() {
  var tipcon = $(this).text();
  if (tipcon.indexOf('用户') != -1) {
    $(this).text('切换至游客注册 >>>');
    $('.top-tit').text('用户注册');
  } else {
    $(this).text('切换至用户注册 >>>');
    $('.top-tit').text('游客注册');
  }
});

// 游客用户登录切换
$(document).on('click', '.btn-logintip', function() {
  var tipcon = $(this).text();
  if (tipcon.indexOf('用户') != -1) {
    $(this).text('切换至游客登录 >>>');
    $('.top-tit').text('用户登录');
  } else {
    $(this).text('切换至用户登录 >>>');
    $('.top-tit').text('游客登录');
  }
});

// 注册
$(document).on('click', '.btn-reg', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var repassword = $('input[name="repassword"]').val();
  var name = $('input[name="name"]').val();
  var phone = $('input[name="phone"]').val();
  var url;
  var data = {
    'account': account,
    'password': password,
    'name': name,
    'phone': phone
  }
  if ($('.top-tit').text().indexOf('游客') != -1) {
    url = '/visitor/reg';
  } else {
    url = '/user/reg';
  }
  if (account.length == 0 || password.length == 0 || (repassword != password) || name.length == 0 || phone.length == 0) {
    showTips('warning', 'Warning!', '请检查您的注册信息！');
  } else {
    ajaxPost(url, data, function(result) {
      if (result.success) {
        showTips('success', '', result.success + '，两秒钟之后返回登录界面~');
        setTimeout(function() {
          location = '/login';
        }, 2000);
      }
    });
  }
});

// 登录
$(document).on('click', '.btn-login', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var url;
  var data = {
    'account': account,
    'password': password
  }
  if ($('.top-tit').text().indexOf('游客') != -1) {
    url = '/visitor/login';
  } else {
    url = '/user/login';
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查您的登录信息！');
  } else {
    ajaxPost(url, data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success + '，两秒钟之后跳转至首页~');
        setTimeout(function() {
          location = '/';
        }, 2000);
      }
    });
  }
});
