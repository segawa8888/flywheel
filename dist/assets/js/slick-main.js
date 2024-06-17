$(function(){
    $('.p-people-message-slider').slick({
        fade: true, 
        dots: true,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>'
    });
  });


  $(function(){
    $('.p-office-slider').slick({
        dots: true,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        centerMode: true,
        centerPadding: "275px",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerPadding: "28px",
            }
          }
        ]
    });
  });


  function checkBreakPoint() {
    w = $(window).width();
    if (w <= 767) {
      // スマホ向け（767px以下のとき）
      $('.p-culture-slider').not('.slick-initialized').slick({
        //スライドさせる
        fade: true, 
        dots: true,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnFocus: false,
        pauseOnHover: false
      });
    } else {
      // PC向け
      $('.p-culture-slider.slick-initialized').slick('unslick');
    }
  }
  // ウインドウがリサイズする度にチェック
  $(window).resize(function(){
    checkBreakPoint();
  });
  // 初回チェック
  checkBreakPoint();

  $(function(){
    // #で始まるリンクをクリックした場合
    $('a[href^="#"]').click(function(){
      // 例えばヘッダーの高さを事前に取得
      var h = $('.l-header').outerHeight(); // 追加
      // adjust に代入するとヘッダーの高さを取得してズラせる。
      var adjust = h + -200; // 変更
      // スクロールの速度（ミリ秒）
      var speed = 400;
      // リンク先を取得してhrefという変数に代入
      var href= $(this).attr("href");
      // リンク先にidがある場合ターゲットとして値を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // ターゲットの位置を取得し、調整がある場合は位置の調整を行う
      var position = target.offset().top + adjust;
      // スクロール実行
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
    });
  });