var SubscribePopup = function(element, config){
  var _this = this;

  _this.$el = element;

  var defaults = {
    cookieLifeTime: 365,
    openAfter: 10000,
    openOnce: true
  };

  var mergeConfigs = function(){
    _this.settings = $.extend(defaults, config);
  };

  var autoOpen = function(){
    if (_this.settings.openAfter > 0){
      setTimeout(_this.open, _this.settings.openAfter);
    }
  };

  var notOpenedOnce = function(){
    return ! (_this.settings.openOnce && $.cookie('sp'))
  };

  var canOpen = function(){
    return notOpenedOnce()
  };

  this.open = function(){
    if (canOpen()) {
      _this.$el.addClass('js-active');
    }
  };

  this.close = function(){
    _this.$el.removeClass('js-active');

    _this.setCookie(_this.settings.cookieLifeTime);
  };

  this.setCookie = function(days){
    $.cookie('sp', Math.random(), {expires: days, path: '/'});
  };

  var onSubscribePopupClick = function(e){
    if (e.target !== e.currentTarget) {
      e.stopPropagation();
    }
  };

  var bindEvents = function(){
    $(document)
      .on('click', _this.$el, _this.close)
      .on('click', '.subscribe-popup', onSubscribePopupClick);
  };

  mergeConfigs();
  autoOpen();
  bindEvents();
};

$.fn.subscribePopup = function(config){
  return new SubscribePopup($(this), config);
};

