var SubscribePopup = function(element, config){
  var _this = this;

  _this.$el = element;

  var defaults = {
    openAfter: 10000,
    openOnce: true
  };

  var mergeConfigs = function(){
    _this.settings = $.extend(defaults, config);
  };

  var createBackground = function(){
    var overlay = $('<div class="subscribe-popup-background" />').css(_this.settings.background);

    _this.$el.before(overlay);

    _this.$overlay = overlay;
  };

  var autoOpen = function(){
    if (_this.settings.openAfter > 0){
      setTimeout(_this.open, _this.settings.openAfter);
    }
  };

  var elemHeight = function(){
    return _this.$el.outerHeight(true);
  };

  var elemWidth = function(){
    return _this.$el.outerWidth(true);
  };

  var notOpenedOnce = function(){
    return ! (_this.settings.openOnce && $.cookie('sp'))
  };

  var canOpen = function(){
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    return notOpenedOnce() && elemHeight() < viewportHeight && elemWidth() < viewportWidth
  };

  var calculateMargins = function(){
    var top = - elemHeight();
    var left = - elemWidth();

    return {
      marginTop: top / 2,
      marginLeft: left / 2
    };
  };

  this.open = function(){
    if (canOpen()) {
      $.cookie('sp', '300', {expires: 365, path: '/'});

      var margins = calculateMargins();

      _this.$overlay.show();

      _this.$el
        .css(margins)
        .show();
    }
  };

  this.close = function(){
    _this.$overlay.hide();
    _this.$el.hide();
  };

  var onSubscribePopupClick = function(e){
    e.stopPropagation();
  };

  var bindEvents = function(){
    $(document)
      .on('click', _this.$overlay, _this.close)
      .on('click', '.subscribe-popup', onSubscribePopupClick)
      .on('click', '.subscribe-popup-close', _this.close);
  };

  mergeConfigs();
  createBackground();
  autoOpen();
  bindEvents();
};

$.fn.subscribePopup = function(config){
  return new SubscribePopup($(this), config);
};

