$(function(){
  function buildHTML(message){
    if( message.image ){
      let html =
        `<div class="MessageBox">
          <div class="MessageInfo">
            <div class="Name">
              ${message.user_name}
            </div>
            <div class="DateTime">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;  
    }
    else {
      let html =
        `<div class="MessageBox">
          <div class="MessageInfo">
            <div class="Name">
              ${message.user_name}
            </div>
            <div class="DateTime">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;  
    };
  }
  $(".Form").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageLists').append(html);
      $('.MessageLists').animate({ scrollTop: $('.MessageLists')[0].scrollHeight});
      $('form')[0].reset();
      $('.SendBtn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});