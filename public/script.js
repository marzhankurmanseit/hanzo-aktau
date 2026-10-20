// ===== Hanzo Aktau — interactions =====
(function () {
  "use strict";

  // --- Full category list (19) ---
  var CATEGORIES = [
    { kz: "Маки роллдар", ru: "Маки роллы" },
    { kz: "Урамаки", ru: "Урамаки" },
    { kz: "Суши & Гункандар", ru: "Суши & Гунканы" },
    { kz: "Қытырлақ роллдар", ru: "Хрустящие роллы" },
    { kz: "Қуырылған роллдар", ru: "Жареные роллы" },
    { kz: "Пісірілген роллдар", ru: "Запечённые роллы" },
    { kz: "Ерекше мәзір", ru: "Особое меню" },
    { kz: "VIP мәзір", ru: "VIP меню" },
    { kz: "Сетттер", ru: "Сеты" },
    { kz: "Комбо", ru: "Комбо" },
    { kz: "Пицца", ru: "Пицца" },
    { kz: "Сорпалар", ru: "Супы" },
    { kz: "Салаттар", ru: "Салаты" },
    { kz: "Ыстық тағамдар", ru: "Горячие блюда" },
    { kz: "Чикен", ru: "Чикен" },
    { kz: "Фритюр", ru: "Фритюр" },
    { kz: "Десерттер", ru: "Десерты" },
    { kz: "Сусындар", ru: "Напитки" },
    { kz: "Балалар мәзірі", ru: "Детское меню" }
  ];

  var STORAGE_KEY = "hanzo-lang";

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "kz" || saved === "ru") return saved;
    } catch (e) {}
    return "kz";
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";

    var nodes = document.querySelectorAll("[data-kz]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = lang === "kz" ? el.getAttribute("data-kz") : el.getAttribute("data-ru");
      if (val !== null && val !== undefined) el.textContent = val;
    }

    // language buttons state
    var btns = document.querySelectorAll(".lang-switch button");
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle("is-active", btns[j].getAttribute("data-lang") === lang);
      btns[j].setAttribute("aria-pressed", btns[j].getAttribute("data-lang") === lang);
    }

    renderCategories(lang);
  }

  function renderCategories(lang) {
    var list = document.getElementById("cat-chips");
    if (!list) return;
    var html = "";
    for (var i = 0; i < CATEGORIES.length; i++) {
      var name = lang === "kz" ? CATEGORIES[i].kz : CATEGORIES[i].ru;
      html += "<li>" + name + "</li>";
    }
    list.innerHTML = html;
  }

  // --- init ---
  document.addEventListener("DOMContentLoaded", function () {
    var lang = getLang();
    applyLang(lang);

    // language switch
    var langBtns = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].addEventListener("click", function () {
        var l = this.getAttribute("data-lang");
        saveLang(l);
        applyLang(l);
      });
    }

    // mobile menu
    var burger = document.querySelector(".burger");
    var nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        burger.setAttribute("aria-expanded", open);
      });
      var links = nav.querySelectorAll("a");
      for (var k = 0; k < links.length; k++) {
        links[k].addEventListener("click", function () {
          nav.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
        });
      }
    }

    // current year
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  });
})();
