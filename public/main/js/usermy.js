$(function() {
  $('.smallnav-notzu').click();
});

$(document).on('click', '#quick_nav a', function() {
  $('#quick_nav a').removeClass('active');
  $(this).addClass('active');
});

// 获取未出租房源
$(document).on('click', '.smallnav-notzu', function() {
  ajaxPost('/user/getHouseList', {}, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 获取添加房源表单
$(document).on('click', '.smallnav-addhouse', function() {
  ajaxPost('/user/addHouseView', {}, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 添加房源
$(document).on('click', '.btn-nextstep', function() {
  var box = $(this).parents('.mqy-stepbox');
  var type = $('select[name="type"]').val();
  var diduan = $('select[name="diduan"]').find('option:selected').text();
  var huxing = $('select[name="huxing"]').find('option:selected').text();
  var zuzhutype = $('select[name="zuzhutype"]').find('option:selected').text();
  var price = $('input[name="price"]').val();
  var chaoxiang = $('select[name="chaoxiang"]').find('option:selected').text();
  var mianji = $('input[name="mianji"]').val();
  var data = {
    'type': type,
    'diduan': diduan,
    'huxing': huxing,
    'zuzhutype': zuzhutype,
    'price': price,
    'chaoxiang': chaoxiang,
    'mianji': mianji
  }
  if (price.length == 0 || price.mianji == 0) {
    showTips('warning', 'Warning!', '请检查您的房源信息！');
  } else {
    if (type == 1) {
      delete data.zuzhutype
    }
    ajaxPost('/user/addHouse', data, function(result) {
      if (result.success) {
        showTips('success', result.success, '现在请您上传房源图片！');
        box.find('.stepbox-body-con').eq(0).hide();
        box.find('.stepbox-body-con').eq(1).show();
        box.find('.stepbox-footer').eq(0).hide();
        box.find('.stepbox-footer').eq(1).show();
        box.find('.stepbox-tit').removeClass('active');
        box.find('.stepbox-tit').eq(1).addClass('active');
      }
    })
  }
});

// 上传图片.btn-addhouse
