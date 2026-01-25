(() => {
  // ✅ 슬라이드별: 이미지 + 상단 텍스트 + 하단 캡션 + 링크
  const OTHER_WORKS_SLIDES = [
    {
      left: { src: "images/detail_nouvedilie1.png", alt: "누베딜리 상세페이지 시안 1" },
      rights: [],
      title: "누베딜리 상세 페이지",
      desc: "누베딜리 웹페이지의 제품 썸네일을 클릭하면 나오는 상세 페이지",
      topic: "일상에서 부담없이 캐주얼하게 착용 가능한 반지",
      age: "30대 ~ 40대 이상",
      caption: "상세페이지 디자인",
      link: "#" // ← 여기에 피그마 링크 넣기
    },
    {
      left: { src: "images/game_banner_260121.png", alt: "게임 배너" },
      rights: [],
      title: "게임 배너",
      desc: "마리오 카트 레퍼런스를 참고해 제작한 게임 배너",
      topic: "프로모션/이벤트 배너",
      age: "전 연령",
      caption: "배너 디자인",
      link: "#" // ← 여기에 피그마 링크 넣기
    },
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

  // ✅ 바뀔 텍스트 요소들 (없으면 그냥 무시)
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
    if (linkEl && s.link) linkEl.href = s.link;
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

  // active dot + 텍스트 갱신
  const setActive = (index) => {
    dotBtns.forEach((btn, i) =>
      btn.setAttribute("aria-current", i === index ? "true" : "false")
    );
    updateText(index); // ✅ 여기서 같이 바꿈
  };

  // 초기
  setActive(0);

  // 도트 클릭
  dotsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-dot");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    if (!Number.isFinite(index)) return;

    setActive(index);          // ✅ 클릭 즉시 텍스트 변경
    scrollToIndex(index, "smooth");
  });

  // 스크롤 시 active 보정 (드래그/화살표로 넘어가도 텍스트 변경됨)
  let raf = 0;
  viewport.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActive(getCurrentIndex()));
  });

  /* ================================
     ✅ 화살표 클릭 이동
  ================================= */
  const moveSlide = (dir) => {
    const cur = getCurrentIndex();
    const next =
      dir === "next"
        ? clamp(cur + 1, 0, slideEls.length - 1)
        : clamp(cur - 1, 0, slideEls.length - 1);

    setActive(next);            // ✅ 즉시 텍스트 변경
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
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveSlide("prev");
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      moveSlide("next");
    }
  });
})();
