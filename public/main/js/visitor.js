$(function() {
  $('.tip-myzuhouse').click();
});

$(document).on('click', '#quick_nav a', function() {
  $('#quick_nav a').removeClass('active');
  $(this).addClass('active');
});

// 已租赁房源
$(document).on('click', '.tip-myzuhouse', function() {
  var data = {
    'type': 0
  }
  ajaxPost('/visitor/getHouse', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});

// 已购买房源
$(document).on('click', '.tip-mymaihouse', function() {
  var data = {
    'type': 1
  }
  ajaxPost('/visitor/getHouse', data, function(result) {
    if (result.success) {
      $('#usercon-box').html('');
      $('#usercon-box').append(result.view);
    }
  });
});
