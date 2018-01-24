$(function() {
  $('.tip-daishenhe').click();
});

// 登录
$(document).on('click', '.btn-adminlogin', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
    'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查您的登录信息！');
  } else {
    ajaxPost('/admin/login', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success + '，两秒钟之后跳转至管理员界面~');
        setTimeout(function() {
          location = '/admin/managehouse';
        }, 2000);
      }
    });
  }
});

$(document).on('click', '#quick_nav a', function() {
  $('#quick_nav a').removeClass('active');
  $(this).addClass('active');
});

// 待审核房源
$(document).on('click', '.tip-daishenhe', function() {
  var data = {
    'shenhe': 0
  }
  ajaxPost('/admin/getDaiShenHeHouse', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 已审核房源
$(document).on('click', '.tip-shenhe', function() {
  var data = {
    'shenhe': 1
  }
  ajaxPost('/admin/getDaiShenHeHouse', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 审核通过房源
$(document).on('click', '.btn-shenhe', function() {
  var data = {
    'houseid': $(this).data('houseid'),
    'shenhe': 1
  }
  showBtnTips('success', '审核房源', '确定审核吗？', '取消', '确定', function() {
    ajaxPost('/admin/shenheHouse', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        $('#quick_nav .active').click();
      }
    });
  });
});

// 审核通过房源
$(document).on('click', '.btn-notshenhe', function() {
  var data = {
    'houseid': $(this).data('houseid'),
    'shenhe': 2
  }
  showBtnTips('success', '审核房源', '确定审核吗？', '取消', '确定', function() {
    ajaxPost('/admin/shenheHouse', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        $('#quick_nav .active').click();
      }
    });
  });
});
