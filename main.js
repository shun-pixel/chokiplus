(function () {
  "use strict";
  var doc = document;
  var ARROW = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
  var CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
  var SCISSORS = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><path d="M8.12 8.12 12 12"></path><path d="M20 4 8.12 15.88"></path><circle cx="6" cy="18" r="3"></circle><path d="M14.8 14.8 20 20"></path></svg>';

  /* ---------- Loader ---------- */
  var loader = doc.createElement("div");
  loader.className = "loader";
  loader.innerHTML = '<div class="loader-lockup"><span class="loader-scissors">' + SCISSORS + '</span><strong>CHOKI＋</strong><span class="loader-line"></span><small>FINANCIAL EDUCATION FOR BEAUTY PROFESSIONALS</small></div>';
  doc.body.appendChild(loader);
  doc.documentElement.classList.add("is-loading");
  setTimeout(function () {
    loader.classList.add("is-leaving");
    doc.documentElement.classList.remove("is-loading");
    doc.documentElement.classList.add("is-ready");
    setTimeout(function () { loader.remove(); }, 450);
  }, 1150);

  /* ---------- Header hide on scroll down ---------- */
  var header = doc.querySelector(".site-header");
  var lastY = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-hidden", y > lastY && y > 120);
    lastY = y;
  }, { passive: true });

  /* ---------- Menu ---------- */
  var NAV = [["私たちについて", "#about"], ["事業内容", "#service"], ["代表メッセージ", "#message"], ["活動実績", "#achievements"], ["お知らせ", "#news"], ["会社情報", "#company"]];
  var brand = doc.querySelector(".site-header .brand");
  var overlay = doc.createElement("div");
  overlay.className = "menu-overlay";
  var links = NAV.map(function (n, i) {
    return '<a href="' + n[1] + '"><span>' + String(i + 1).padStart(2, "0") + "</span>" + n[0] + ARROW + "</a>";
  }).join("");
  overlay.innerHTML = '<div class="menu-panel"><div class="menu-top">' +
    (brand ? brand.outerHTML.replace('class="brand ', 'class="brand brand-light ') : "") +
    '<button type="button" aria-label="メニューを閉じる">' + CLOSE + "</button></div><nav>" + links +
    '<a href="#contact" class="menu-contact"><span>07</span>お問い合わせ' + ARROW + "</a></nav><p>お金の知識を、美容師の新しい基礎教養へ。</p></div>";
  doc.body.appendChild(overlay);
  function setMenu(open) {
    overlay.classList.toggle("is-open", open);
    doc.body.style.overflow = open ? "hidden" : "";
  }
  var menuBtn = doc.querySelector(".menu-button");
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(true); });
  overlay.querySelector(".menu-top button").addEventListener("click", function () { setMenu(false); });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay || e.target.closest("a")) setMenu(false);
  });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Hero band rotation ---------- */
  var BAND = [
    "投資の答えではなく、<b>選ぶための知識</b>を。",
    "美容師の働き方に、<b>安心の土台</b>を。",
    "自分の人生を、<b>自分で判断する力</b>を。"
  ];
  var band = doc.querySelector(".hero-band");
  if (band) {
    var bi = 0;
    band.innerHTML = BAND[0];
    setInterval(function () {
      band.classList.add("is-out");
      setTimeout(function () {
        bi = (bi + 1) % BAND.length;
        band.innerHTML = BAND[bi];
        band.classList.remove("is-out");
        band.classList.add("is-in");
        void band.offsetWidth;
        band.classList.remove("is-in");
      }, 500);
    }, 3600);
  }

  /* ---------- FAQ ---------- */
  var ANSWERS = [
    "はい。初めて学ぶ方にも理解できるよう、制度や用語の基礎からお伝えします。各講座の対象レベルは、募集ページでご案内します。",
    "いいえ。当社の講座・研修は、金融商品を販売・勧誘することを目的としていません。特定の商品、銘柄、通貨ペア等について、個別具体的な売買の指示や推奨は行いません。",
    "いいえ。「今買う」「この価格で売る」といった個別具体的な指示は行いません。仕組み、一般的な分析方法、資金管理、リスク管理等を学ぶ教育内容です。",
    "はい。人数、年代、雇用形態、希望テーマ等を伺い、一般的な金融教育の範囲で内容をご提案します。オンライン・対面のいずれもご相談いただけます。",
    "実施時間、参加人数、開催方法、内容により異なります。お問い合わせ後にヒアリングを行い、お見積りをご案内します。"
  ];
  doc.querySelectorAll(".faq-item").forEach(function (item, i) {
    var ans = doc.createElement("div");
    ans.className = "faq-answer";
    ans.innerHTML = "<p>" + (ANSWERS[i] || "") + "</p>";
    item.appendChild(ans);
    var btn = item.querySelector("button");
    btn.addEventListener("click", function () {
      var open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      ans.style.height = open ? ans.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- Scroll reveal ---------- */
  var targets = doc.querySelectorAll("[data-reveal]");
  targets.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = el.getAttribute("data-reveal");
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.style.transition = "opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1)";
        el.style.opacity = "1";
        el.style.transform = "none";
        io.unobserve(el);
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.style.opacity = "1"; el.style.transform = "none"; });
  }

  /* ---------- Contact form (demo) ---------- */
  function toast(title, desc) {
    var t = doc.createElement("div");
    t.className = "demo-toast";
    t.innerHTML = "<strong>" + title + "</strong><span>" + desc + "</span>";
    doc.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("is-show"); });
    setTimeout(function () {
      t.classList.remove("is-show");
      setTimeout(function () { t.remove(); }, 400);
    }, 4000);
  }
  var form = doc.querySelector(".contact-form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    toast("お問い合わせ内容を受け付けました（デモ）", "本番公開時に送信先メール・フォーム連携を設定してください。");
    form.reset();
  });
})();
