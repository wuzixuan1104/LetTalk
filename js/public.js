/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2018, OAF2E
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */
 
$(function () {
  $('#chat-boxes').scrollTop($(document).height());

  $('button.send').click(function() {
    var html = $('#chat-boxes').children().first().clone();
    // console.error($('#chat-boxes').height());
    $('#chat-boxes').append(html).animate({scrollTop:$('#chat-boxes').height()}, 'slow');
  });

  $('#burger').click(function() {
    $('#sidemenu').toggleClass('show');
    
    $('#sidemenu').click(function() {
      console.log('test');
      $(this).toggleClass('show');
    });
  });


})