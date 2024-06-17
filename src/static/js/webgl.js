const $wrapper = document.getElementById('webgl-container');
const artwork = new Artwork({
 $wrapper: $wrapper,
 page: 'index',
});

const controls = new Controls();

// 画面をロックする
var prototype = {
 locked: function () {
  this.setStyle();
  document.documentElement.classList.add('is-locked');
 },
 unlocked: function () {
  document.documentElement.classList.remove('is-locked');
 },
 setStyle: function () {
  var scrollY = window.scrollY;
  var styleTag = document.createElement('style');
  styleTag.innerText = `html.is-locked,html.is-locked body {height: calc(var(--window-inner-height) + ${scrollY}px);overflow: hidden;box-sizing: border-box;}`;
  document.getElementsByTagName('head')[0].insertAdjacentElement('beforeend', styleTag);
 },
 load: function () {
  window.addEventListener('load', () => {
   this.syncHeight();
  });
 },
 resize: function () {
  window.addEventListener('resize', () => {
   this.syncHeight();
  });
 },
 syncHeight: function () {
  document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
 },
};

$(function () {
 prototype.syncHeight();
 $('body, html').scrollTop(0);
 prototype.locked();
});

// スキップボタンを表示
artwork.on('SHOW_SKIP', () => {
 $('.c-skip-btn').show();
});

// スキップボタンクリック時
$('.c-skip-btn').on('click', function () {
 artwork.emit('DO_SKIP');
});

// スキップボタンを非表示にする
artwork.on('HIDE_SKIP', () => {
 $('.c-skip-btn').hide();
});

// KVのアニメーション後
artwork.on('ENABLE_SCROLL_KV', () => {
	$("[data-module=FadeInMV").each(function() {
		var delay = $(this).data("delay") ? $(this).data("delay"): 0;
		var speed = $(this).data("speed") ? $(this).data("speed"): 0.8;
		$(this).css('transition' ,`all ${speed}s ${delay}s`);
		$(this).addClass("fadeIn");
		
	});
 finishKVWebGl();
 setTimeout(function() {
	$("[data-module=FadeInMV").css("overflow", "inherit");
}, 1200);
});



var finishKvWebGl = false;
function finishKVWebGl() {
 $('.p-top-kv-contents').addClass('fade');
 $('.c-skip-btn').hide();
 prototype.unlocked();
 finishKvWebGl = true;
}

var webGL_status, scroll, blogPos,feature_section,featurePos,  blog_section, windowHeight, kv_section, kvPos, kvPos_bottom, kadaiPos, conataPos, kadaiPos_bottom, kadai_section, conata_section, showNum = 0, mission_section, missionPos;
window.addEventListener('scroll', () => {
 scroll = window.scrollY;
 webGL_status = 0;
 windowHeight = window.innerHeight;
 kadai_section = document.querySelector('.p-top-kvBottom');
 conata_section = document.querySelector('.p-top-catch');
 mission_section = document.querySelector('.p-top-mission');
 blog_section = document.querySelector('.p-top-blog');
 kv_section = document.querySelector('.p-top-kv');
feature_section = document.querySelector('.p-top-feature');
 featurePos = feature_section.getBoundingClientRect().top + scroll;
 missionPos = mission_section.getBoundingClientRect().top + scroll;
 kadaiPos = kadai_section.getBoundingClientRect().top + scroll;
 conataPos = conata_section.getBoundingClientRect().top + scroll;
 kvPos = kv_section.getBoundingClientRect().top + scroll;
 blogPos = blog_section.getBoundingClientRect().top + scroll;
 conataPos_bottom  = conata_section.getBoundingClientRect().top + conata_section.offsetHeight / 3 + scroll;
 kadaiPos_bottom = kadai_section.getBoundingClientRect().top + kadai_section.offsetHeight * 2/ 3+ scroll;
 kvPos_bottom = kv_section.getBoundingClientRect().top + kv_section.offsetHeight / 3 + scroll;
 missionPos_bottom = mission_section.getBoundingClientRect().top + mission_section.offsetHeight / 3 + scroll;

 if(scroll < kvPos_bottom) {
  if (webGL_status !== 3) {
		$(".p-top-kv-contents").removeClass("hideMVContents");
		artwork.emit('SHOW_GLOBE');
		webGL_status = 3;
  }
 }
 // こんなお悩みはありませんか？セクション
 else if (scroll >= kvPos_bottom && scroll < kadaiPos_bottom) {
	console.log("こんなお悩みはありませんか？セクション");
  if (webGL_status !== 1) {
	$(".p-top-kv-contents").addClass("hideMVContents");
   artwork.emit('BLUR_GLOBE');
   webGL_status = 1;
  }
  // データ活用プラットフォーム
 } else if (scroll >= kadaiPos_bottom && scroll < conataPos_bottom) {
  if (webGL_status !== 2) {
   artwork.emit('SPREAD_GLOBE');
   webGL_status = 2;
  }
	// ミッションセクション
	} else if (scroll > missionPos - windowHeight && scroll < missionPos_bottom + windowHeight) {
	if (webGL_status !== 5) {
		artwork.emit('SHOW_GLOBE');
		webGL_status = 5;
  }
 } else if (scroll > blogPos - windowHeight) {
	if (webGL_status !== 4) {
		artwork.emit("DISAPPEAR");
		webGL_status = 4;
  }
 } else{
  if (webGL_status !== 2) {
   artwork.emit('SPREAD_GLOBE');
   webGL_status = 2;
  }
}

 //CONATAの特徴
 if (scroll > featurePos - windowHeight * 2/3) {
		$(".p-top-feature__title__logo").removeClass("move");
	} else {
		$(".p-top-feature__title__logo").addClass("move");
	}

	var featureTop = feature_section.getBoundingClientRect().top;
	var featureHeight = feature_section.getBoundingClientRect().height;
	var ratio = featureTop / featureHeight * -1 * 100;
	var before_showNum = showNum;
	var featureFinish = false;
	if(featureTop < featureHeight) {
		if(ratio > 55) {
			showNum = 2;
		} else if(ratio > 25) {
			showNum = 1;
		} else {
			showNum = 0;
		}
		if(ratio > 70) {
			featureFinish = true;
		}
	}
	if(before_showNum != showNum) {
		$(".fadeFeature").removeClass("fadeFeature");
		document.querySelectorAll(".p-top-feature__item")[showNum].classList.add("fadeFeature");
	}
	if(featureFinish) {
		$(".p-top-feature .c-btn").addClass("show");
	}

	if (scroll > kadai_section.getBoundingClientRect().top  + windowHeight && scroll < kadaiPos_bottom) {
		$("[data-module=FadeInKadai").each(function() {
			var delay = $(this).data("delay") ? $(this).data("delay"): 0;
			var speed = $(this).data("speed") ? $(this).data("speed"): 0.8;
			$(this).css('transition' ,`all ${speed}s ${delay}s`);
			$(this).addClass("fadeIn");
		});
	} else {
		$("[data-module=FadeInKadai").each(function() {
			$(this).removeClass("fadeIn");
		});
	}
});

const $title1 = document.querySelector('.p-top-mission__mission');
artwork.addTitleParticles($title1);
