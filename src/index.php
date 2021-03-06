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

  <script src="js/subscribe-popup.js"></script>
  <script>
    $('.subscribe-popup-wrapper').subscribePopup();
  </script>
  <? endif; ?>

</body>
</html>
