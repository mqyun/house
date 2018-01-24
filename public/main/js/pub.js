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

// 获取检索结果
$(document).on('click', '.btn-condition', function() {
  var type = $('input[name="zuORshou"]').val();
  var diduan = $('select[name="diduan"]').find('option:selected').text();
  diduan = diduan=='不限'?'':diduan;
  var huxing = $('select[name="huxing"]').find('option:selected').text();
  huxing = huxing=='不限'?'':huxing;
  var minprice = $('input[name="minprice"]').val();
  minprice = minprice.length==0?0:minprice;
  var maxprice = $('input[name="maxprice"]').val();
  maxprice = maxprice.length==0?100000000:maxprice;
  var zuzhutype = $('select[name="zuzhutype"]').find('option:selected').text();
  zuzhutype = zuzhutype=='不限'?'':zuzhutype;
  var chaoxiang = $('select[name="chaoxiang"]').find('option:selected').text();
  chaoxiang = chaoxiang=='不限'?'':chaoxiang;
  var minmianji = $('input[name="minmianji"]').val();
  minmianji = minmianji.length==0?0:minmianji;
  var maxmianji = $('input[name="maxmianji"]').val();
  maxmianji = maxmianji.length==0?100000000:maxmianji;
  var data = {
    'type': type,
    'diduan': diduan,
    'huxing': huxing,
    'minprice': minprice,
    'maxprice': maxprice,
    'zuzhutype': zuzhutype,
    'chaoxiang': chaoxiang,
    'minmianji': minmianji,
    'maxmianji': maxmianji
  }
  if (type == 1) {
    delete data.zuzhutype;
  }
  ajaxPost('/houselist', data, function(result) {
    if (result.success) {
      $('#scenic_list').html('');
      $('#scenic_list').append(result.view);
    }
  });
});

// 游客租赁或购买房源
$(document).on('click', '.btn-buyhouse', function() {
  var text = $(this).text().substr($(this).text().length - 2, 2);
  var houseid = $(this).data('id');
  var data = {
    'houseid': houseid
  }
  showBtnTips('success', text + '房源', '确定' + text + '房源吗？', '取消', '确定', function() {
    ajaxPost('/visitor/buyHouse', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', text + result.success);
        setTimeout(function() {
          location.reload();
        }, 1000);
      }
    });
  });
});
