// =========
//  JS
// =========
$( () => {
// ============
// ナビバー透明化
// ============
const targetHeight = $('.js-float-menu-target').height(); //ヒーローバナーの高さ

$(window).on('scroll', function(){
  $('.js-float-menu').toggleClass('p-header__float-active', $(this).scrollTop() > targetHeight );
  }
);

// ======================================
// ハンバーガーメニューを押すとメニューが出てくる
// ======================================
$('.js-toggle-sp-menu').on('click', function(){
  $(this).toggleClass('active');
  $('.js-toggle-sp-menu-target').toggleClass('p-nav-menu__active');
});


// ===================
// ナビバースクロール
// ===================
$('a[href^="#"]').click(function(){
  const scrollSpd = 300;
  const href = $(this).attr("href");
  const target = $(href == "#" || href == "" ? 'html' : href);
  const navbarHeight = $('#l-header').height();
  const position = target.offset().top;

  $("html, body").animate({scrollTop:position - navbarHeight}, scrollSpd, "swing");
  $('.js-toggle-sp-menu').removeClass('active');
  $('.js-toggle-sp-menu-target').removeClass('p-nav-menu__active');
  return false;
});
// ===========
// モーダル
// ===========
$('.js-show-modal').on('click', function() {
  // let windowWidth = $(window).width(); // ウインドウの横幅
  // let modalWidth = $('.js-show-modal-target').width();  // モーダルの横幅
  // console.log(modalWidth);
  // const spaceleft =  (windowWidth - modalWidth) / 2;
  // console.log(marginleft);

  // $(this).parent().next().children('div').attr('style', 'left: '+ spaceleft + 'px');

  $(this).parent().next().show(100);
  $('.js-show-modal-cover').show(100);
});
$('.js-hide-modal').on('click', function(){
  $('.js-show-modal-target').parent().hide(100);
  $('.js-show-modal-cover').hide(100);
});
// ===============
// イメージスライダー
// ===============
const slider = (function(){
  let currentItemNum = 1;
  const $slideContainer = $('.js-imageslide');
  const $slideItem = $('.p-imageslide__item');
  const slideItemCount = $slideItem.length; // p-imageslide__itemの個数

  const DURATION = 500;
  const INTERVAL = 5000;

  return {
    slidePrev: () => {
      if(!$slideItem.is(':animated')){
        if(currentItemNum > 1){
          $slideItem.eq(currentItemNum - 1).toggleClass('p-imageslide__active');
          $slideItem.eq(currentItemNum - 2).toggleClass('p-imageslide__active');
          currentItemNum -= 1;
        }else{
          $slideItem.eq(currentItemNum - 1).toggleClass('p-imageslide__active');
          $slideItem.eq(slideItemCount - 1).toggleClass('p-imageslide__active');
          currentItemNum = slideItemCount;
        }

      }
    },
    slideNext: () => {
      if(!$slideItem.is(':animated')){
        // console.log(currentItemNum);
        if(currentItemNum < slideItemCount){
          $slideItem.eq(currentItemNum - 1).toggleClass('p-imageslide__active');
          $slideItem.eq(currentItemNum).toggleClass('p-imageslide__active');
          currentItemNum += 1;
        }else{
          $slideItem.eq(currentItemNum - 1).toggleClass('p-imageslide__active');
          $slideItem.eq(0).toggleClass('p-imageslide__active');
          currentItemNum = 1;
        }
      }
    },init: function() {
      const that = this;
      setInterval(that.slideNext, INTERVAL);

      $('.js-slide-prev').on('click', function(){
        that.slidePrev();
      });
      $('.js-slide-next').on('click', function(){
        that.slideNext();
      });
    }
  };
})();
slider.init();

// ============================
// お問い合わせフォームの活性、非活性
// ============================
const formValid = (function(){
  const jsvalidName =  $('.js-valid-name');
  const jsvalidMail =  $('.js-valid-mail');
  const jsvalidContact =  $('.js-valid-contact');
  const formInputCount = $('.js-form-input').length;
  let validCheck = 0;

  const regexMail = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  return {
    validCheck: function(){
      if(jsvalidName.val()){
        validCheck += 1;
      }
      // メールアドレス形式をチェック
      if(jsvalidMail.val() && regexMail.test(jsvalidMail.val())){
        validCheck += 1;
      }
      if(jsvalidContact.val()){
        validCheck += 1;
      }
    },toggleDisable: function(){
      if(validCheck === formInputCount) {
        $('.js-form-valid-target').prop('disabled', false);
      }else{
        $('.js-form-valid-target').prop('disabled', true);
      }
      validCheck = 0;
    },init: function(){
      const that = this;
      $('.js-form-input').on('keyup', function(){
        that.validCheck();
        that.toggleDisable();
      });
    }
  };
})();
formValid.init();

});
