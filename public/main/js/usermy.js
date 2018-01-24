var isFromUpLoadImg = getFromUrl('isFromUpLoadImg') || false;

$(function() {
  $('.smallnav-notzu').click();
  // if (isFromUpLoadImg) {
  //   setTimeout(function() {
  //     showTips('success', 'Success!', '上传图片成功！');
  //   }, 1000);
  // }
});

$(document).on('click', '#quick_nav a', function() {
  $('#quick_nav a').removeClass('active');
  $(this).addClass('active');
});

// 获取未出租房源
$(document).on('click', '.smallnav-notzu', function() {
  var data = {
    'type': 0
  }
  ajaxPost('/user/getHouseList', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 获取未出售房源
$(document).on('click', '.smallnav-notshou', function() {
  var data = {
    'type': 1
  }
  ajaxPost('/user/getHouseList', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 获取已出租房源
$(document).on('click', '.smallnav-yeszu', function() {
  var data = {
    'type': 0
  }
  ajaxPost('/user/getAlreadyHouseList', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 获取已出售房源
$(document).on('click', '.smallnav-yesshou', function() {
  var data = {
    'type': 1
  }
  ajaxPost('/user/getAlreadyHouseList', data, function(result) {
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
  var jieshao = $('input[name="jieshao"]').val();
  var diduan = $('select[name="diduan"]').find('option:selected').text();
  var huxing = $('select[name="huxing"]').find('option:selected').text();
  var zuzhutype = $('select[name="zuzhutype"]').find('option:selected').text();
  var price = $('input[name="price"]').val();
  var chaoxiang = $('select[name="chaoxiang"]').find('option:selected').text();
  var mianji = $('input[name="mianji"]').val();
  var data = {
    'type': type,
    'jieshao': jieshao,
    'diduan': diduan,
    'huxing': huxing,
    'zuzhutype': zuzhutype,
    'price': price,
    'chaoxiang': chaoxiang,
    'mianji': mianji
  }
  if (price.length == 0 || mianji.length == 0 || jieshao.length == 0) {
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

// 修改房屋信息
$(document).on('click', '.edit-houseinfo', function() {
  var houseid = $(this).data('houseid');
  var data = {
    'houseid': houseid
  }
  ajaxPost('/user/getEditHouseModal', data, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '修改房源信息',
        area: ['800px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['修改'],
        shadeClose: true,
        yes: function(index, layero) {
          var type = $('select[name="type"]').val();
          var jieshao = $('input[name="jieshao"]').val();
          var diduan = $('select[name="diduan"]').find('option:selected').text();
          var huxing = $('select[name="huxing"]').find('option:selected').text();
          var zuzhutype = $('select[name="zuzhutype"]').find('option:selected').text();
          var price = $('input[name="price"]').val();
          var chaoxiang = $('select[name="chaoxiang"]').find('option:selected').text();
          var mianji = $('input[name="mianji"]').val();
          var housedata = {
            'type': type,
            'jieshao': jieshao,
            'diduan': diduan,
            'huxing': huxing,
            'zuzhutype': zuzhutype,
            'price': price,
            'chaoxiang': chaoxiang,
            'mianji': mianji,
            'houseid': houseid
          }
          if (type == 1) {
            delete housedata.zuzhutype;
          }
          if (price.length == 0 || mianji.length == 0 || jieshao.length == 0) {
            showTips('warning', 'Warning!', '请检查您要修改的房源信息！');
          } else {
            ajaxPost('/user/updateHouse', housedata, function(result) {
              if (result.success) {
                showTips('success', 'Success!', result.success);
                $('#quick_nav .active').click();
              }
            });
          }
          layer.close(index);
        }
      });
    }
  });
});

// 删除房源
$(document).on('click', '.delete-house', function() {
  var houseid = $(this).data('houseid');
  var data = {
    'houseid': houseid
  }
  showBtnTips('success', '删除房源！', '确定删除该房源吗？', '取消', '确定', function() {
    ajaxPost('/user/deleteHouse', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        $('#quick_nav .active').click();
      }
    });
  });
});
