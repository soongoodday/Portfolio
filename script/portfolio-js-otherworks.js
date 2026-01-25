/* ================================
   portfolio-js-otherworks.js (통째 복붙 버전)
   ✅ 슬라이드마다 이미지 높이 자동(원본 비율대로)
   ✅ 도트/화살표/키보드 이동
   ✅ 상단 텍스트 + 하단 캡션 + 링크 자동 변경
   ✅ 오른쪽 이미지 없으면 가운데 정렬(is-single)
================================ */
(() => {
  const OTHER_WORKS_SLIDES = [
    {
      left: { src: "images/nouvedilie1.png", alt: "누베딜리 상세페이지 시안 1" },
      rights: [{ src: "images/nouvedilie2.png", alt: "누베딜리 상세페이지 시안 2" }],
      title: "누베딜리 상세 페이지",
      desc: "누베딜리 웹페이지의 제품 썸네일을 클릭하면 나오는 상세 페이지",
      topic: "일상에서 부담없이 캐주얼하게 착용 가능한 반지",
      age: "30대 ~ 40대 이상",
      caption: "상세페이지 디자인",
      link: "#"
    },
    {
      left: { src: "images/game_banner_260121.png", alt: "게임 배너" },
      rights: [],
      title: "가상의 카트 게임 배너",
      desc: "가상의 카트 게임 배너를 chatGPT(챗GPT)를 활용해 이미지 생성 후 제작했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "전 연령(게임 사용자)",
      caption: "배너 디자인",
      link: "#"
    },
  ];

  const last = (sel) => {
    const all = document.querySelectorAll(sel);
    return all.length ? all[all.length - 1] : null;
  };

  const carousel = last("#otherWorksCarousel");
  const viewport = last("#otherWorksViewport");
  const dotsWrap = last("#otherWorksDots");
  if (!carousel || !viewport || !dotsWrap) return;

  if (carousel.dataset.owInit === "1") return;
  carousel.dataset.owInit = "1";

  // 바뀔 텍스트 요소들
  const titleEl = document.getElementById("otherWorksTitleText");
  const descEl = document.getElementById("otherWorksDesc");
  const topicEl = document.getElementById("otherWorksTopic");
  const ageEl = document.getElementById("otherWorksAge");
  const captionEl = document.getElementById("otherWorksCaption");
  const linkEl = document.getElementById("otherWorksLink");

  const updateText = (index) => {
    const s = OTHER_WORKS_SLIDES[index];
    if (!s) return;
    if (titleEl) titleEl.textContent = s.title || "";
    if (descEl) descEl.textContent = s.desc || "";
    if (topicEl) topicEl.textContent = s.topic || "";
    if (ageEl) ageEl.textContent = s.age || "";
    if (captionEl) captionEl.textContent = s.caption || "";
    if (linkEl) linkEl.href = s.link || "#";
  };

  viewport.innerHTML = "";
  dotsWrap.innerHTML = "";

  const slideEls = [];
  const dotBtns = [];

  const createFigure = ({ src, alt }, extraClass = "") => {
    const figure = document.createElement("figure");
    figure.className = `other-works-figure ${extraClass}`.trim();

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";

    figure.appendChild(img);
    return figure;
  };

  OTHER_WORKS_SLIDES.forEach((slide, idx) => {
    const article = document.createElement("article");
    article.className = "other-works-slide";
    article.setAttribute("aria-label", `슬라이드 ${idx + 1}`);

    const grid = document.createElement("div");
    grid.className = "other-works-grid";

    const leftWrap = document.createElement("div");
    leftWrap.className = "other-works-left-wrap";
    leftWrap.appendChild(createFigure(slide.left, "other-works-figure--left"));

    const stack = document.createElement("div");
    stack.className = "other-works-stack";
    (slide.rights || []).forEach((imgObj) => {
      stack.appendChild(createFigure(imgObj));
    });

    // ✅ 오른쪽이 비었으면 한 장만 가운데
    if (!slide.rights || slide.rights.length === 0) {
      grid.classList.add("is-single");
    }

    grid.appendChild(leftWrap);
    grid.appendChild(stack);

    article.appendChild(grid);
    viewport.appendChild(article);
    slideEls.push(article);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "other-works-dot";
    dot.dataset.index = String(idx);
    dot.setAttribute("aria-label", `슬라이드 ${idx + 1}로 이동`);
    dotsWrap.appendChild(dot);
    dotBtns.push(dot);
  });

  // 유틸
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
  const getSlideWidth = () => viewport.clientWidth || 1;
  const getCurrentIndex = () => clamp(Math.round(viewport.scrollLeft / getSlideWidth()), 0, slideEls.length - 1);

  const scrollToIndex = (index, behavior = "smooth") => {
    viewport.scrollTo({ left: getSlideWidth() * index, behavior });
  };

  const setActive = (index) => {
    dotBtns.forEach((btn, i) => btn.setAttribute("aria-current", i === index ? "true" : "false"));
    updateText(index);
  };

  setActive(0);

  dotsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-dot");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    if (!Number.isFinite(index)) return;

    setActive(index);
    scrollToIndex(index, "smooth");
  });

  let raf = 0;
  viewport.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(getCurrentIndex()));
  });

  const moveSlide = (dir) => {
    const cur = getCurrentIndex();
    const next = dir === "next"
      ? clamp(cur + 1, 0, slideEls.length - 1)
      : clamp(cur - 1, 0, slideEls.length - 1);

    setActive(next);
    scrollToIndex(next, "smooth");
  };

  carousel.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-arrow");
    if (!btn) return;
    const dir = btn.dataset.dir;
    if (dir === "prev" || dir === "next") moveSlide(dir);
  });

  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); moveSlide("prev"); }
    if (e.key === "ArrowRight") { e.preventDefault(); moveSlide("next"); }
  });

  // 리사이즈 보정
  window.addEventListener("resize", () => {
    const idx = getCurrentIndex();
    scrollToIndex(idx, "auto");
  });
})();
