var SubscribePopup = function(element) {
  var _this = this;

  _this.$el = $(element);
  _this.$form = _this.$el.find('form');

  var settings = {
    cookieLifeTime: 365,
    openAfter: 10000,
    openOnce: true
  };

  var autoOpen = function() {
    if (settings.openAfter > 0) {
      setTimeout(_this.open, settings.openAfter);
    }
  };

  var notOpenedOnce = function() {
    return ! (settings.openOnce && $.cookie('sp'))
  };

  var canOpen = function() {
    return notOpenedOnce()
  };

  this.open = function() {
    if (canOpen()) {
      _this.$el.addClass('js-active');
    }
  };

  this.close = function() {
    _this.$el.removeClass('js-active');

    _this.setCookie(settings.cookieLifeTime);
  };

  this.setCookie = function(days) {
    $.cookie('sp', Math.random(), {expires: days, path: '/'});
  };

  var onSubscribePopupClick = function(e) {
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  };

  var onSubscribeFormSubmit = function(e) {
    e.preventDefault();

    var email = _this.$form.find('[name=email]').val();

    $.ajax({
      url: _this.$form.attr('action'),
      type: _this.$form.attr('method'),
      data: _this.$form.serialize()
    });

    _this.$form.html('<h1>Спасибо!</h1><p>На '+email+'<br>было отправлено письмо<br>подтверждения адреса.</p>');
  };

  var bindEvents = function() {
    $(document)
      .on('click', _this.$el, _this.close)
      .on('click', '.subscribe-popup', onSubscribePopupClick)
      .on('submit', _this.$form, onSubscribeFormSubmit);
  };

  autoOpen();
  bindEvents();
};

$.fn.subscribePopup = function() {
  return new SubscribePopup(this);
};

