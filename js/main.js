// 다나쌤 피아노 수업 — 공통 스크립트
(function () {
  // 모바일 메뉴
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '닫기' : '메뉴';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = '메뉴';
      });
    });
  }

  // 복사 버튼
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var msg = document.getElementById(b.getAttribute('data-target'));
      var done = function () { if (msg) msg.textContent = '복사했어요: ' + text; };
      var fallback = function () {
        var el = b.closest('.contact-card').querySelector('.value');
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(range);
        if (msg) msg.textContent = '선택된 글자를 길게 눌러 복사해 주세요.';
      };
      try {
        navigator.clipboard.writeText(text).then(done, fallback);
      } catch (e) { fallback(); }
    });
  });

  // 연도
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
