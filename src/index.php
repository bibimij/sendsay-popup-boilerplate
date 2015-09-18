<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Sendsay popup</title>

  <link rel="stylesheet" href="css/subscribe-popup.css">

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</head>
<body>

  <? if(isset($_GET['popup'])): ?>
  <button class="subscribe-popup-wrapper">
    <div class="subscribe-popup">
      <div class="border"></div>
      <form action="subscribe/" method="post" id="subscribe-popup-form">
        <h1>Подпишись на рассылку</h1>
        <p>
          и получи бесплатный доступ к уроку по созданию трех незаменимых и стильных образов для мужского гардероба
        </p>
        <div class="line"></div>
        <div class="input-row">
          <label for="subscribe-name">Ваше имя</label>
          <input type="text" id="subscribe-name" name="name" required class="input-text" placeholder="Иван">
        </div>
        <div class="input-row">
          <label for="subscribe-name">Ваш e-mail</label>
          <input type="email" id="subscribe-email" name="email" required class="input-text" placeholder="ivan@mail.ru">
        </div>
        <div class="input-row">
          <input type="submit" value="Подписаться">
        </div>
      </form>
      <div class="border"></div>
    </div>
  </button>

  <script src="js/subscribe-popup.min.js"></script>
  <script>
    $('.subscribe-popup-wrapper').subscribePopup({openAfter: 1, openOnce: false});
    $('#subscribe-popup-form').on('submit', function(e){
      e.preventDefault();

      var $form = $(this);
      var email = $('[name=email]').val();

      $form.find(':submit').attr('disabled', true);

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $form.serialize(),
        dataType: 'text',
        success: function(response){
          $form.html('<h1>Спасибо!</h1><p>На '+email+'<br>было отправлено письмо<br>подтверждения адреса.</p>');
        }
      });
    });
  </script>
  <? endif; ?>

</body>
</html>
