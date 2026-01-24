(() => {
  const OTHER_WORKS_SLIDES = [
    { left: { src: "images/detail_nouvedilie1.png", alt: "누베딜리 상세페이지 시안 1" }, rights: [] },
    { left: { src: "images/game_banner_260121.png", alt: "게임 배너" }, rights: [] },
  ];

  // ✅ 중복 id 있어도 마지막 것을 잡음
  const last = (sel) => {
    const all = document.querySelectorAll(sel);
    return all.length ? all[all.length - 1] : null;
  };

  const carousel = last("#otherWorksCarousel");
  const viewport = last("#otherWorksViewport");
  const dotsWrap = last("#otherWorksDots");

  if (!carousel || !viewport || !dotsWrap) return;

  // (중복 실행 방지) 이미 초기화했다면 중단
  if (carousel.dataset.owInit === "1") return;
  carousel.dataset.owInit = "1";

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
    return { figure, img };
  };

  // 슬라이드 생성
  OTHER_WORKS_SLIDES.forEach((slide, idx) => {
    const article = document.createElement("article");
    article.className = "other-works-slide";
    article.setAttribute("aria-label", `슬라이드 ${idx + 1}`);

    const grid = document.createElement("div");
    grid.className = "other-works-grid";

    const leftWrap = document.createElement("div");
    leftWrap.className = "other-works-left-wrap";

    const left = createFigure(slide.left, "other-works-figure--left");
    leftWrap.appendChild(left.figure);

    const stack = document.createElement("div");
    stack.className = "other-works-stack";
    (slide.rights || []).forEach((imgObj) => {
      const item = createFigure(imgObj);
      stack.appendChild(item.figure);
    });

    grid.appendChild(leftWrap);
    grid.appendChild(stack);

    article.appendChild(grid);
    viewport.appendChild(article);
    slideEls.push(article);

    // 도트 생성
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "other-works-dot";
    dot.dataset.index = String(idx);
    dot.setAttribute("aria-label", `슬라이드 ${idx + 1}로 이동`);
    dotsWrap.appendChild(dot);
    dotBtns.push(dot);
  });

  // 유틸
  const getSlideWidth = () => viewport.clientWidth || 1;

  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  const getCurrentIndex = () => {
    const w = getSlideWidth();
    return clamp(Math.round(viewport.scrollLeft / w), 0, slideEls.length - 1);
  };

  const scrollToIndex = (index, behavior = "smooth") => {
    viewport.scrollTo({ left: getSlideWidth() * index, behavior });
  };

  // active dot
  const setActive = (index) => {
    dotBtns.forEach((btn, i) => btn.setAttribute("aria-current", i === index ? "true" : "false"));
  };
  setActive(0);

  // 도트 클릭
  dotsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-dot");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    if (!Number.isFinite(index)) return;
    scrollToIndex(index, "smooth");
  });

  // 스크롤 시 active 보정
  let raf = 0;
  viewport.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(getCurrentIndex()));
  });

  /* ================================
     ✅ 화살표 클릭 이동 (진짜 최종)
     - 꼭 carousel 안에 있는 .other-works-arrow만 반응
  ================================= */
  const moveSlide = (dir) => {
    const cur = getCurrentIndex();
    const next = dir === "next"
      ? clamp(cur + 1, 0, slideEls.length - 1)
      : clamp(cur - 1, 0, slideEls.length - 1);

    scrollToIndex(next, "smooth");
  };

  carousel.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-arrow");
    if (!btn) return;

    const dir = btn.dataset.dir;
    if (dir === "prev" || dir === "next") moveSlide(dir);
  });

  // 키보드(선택): 캐러셀에 포커스 있을 때
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); moveSlide("prev"); }
    if (e.key === "ArrowRight") { e.preventDefault(); moveSlide("next"); }
  });
})();
