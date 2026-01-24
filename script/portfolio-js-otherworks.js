(() => {
  const OTHER_WORKS_SLIDES = [
    {
      left: { src: "images/detail_nouvedilie1.png", alt: "누베딜리 상세페이지 시안 1" },
      rights: [],
    },
    {
      left: { src: "images/_260115-20.png", alt: "누베딜리 상세페이지 시안 2" },
      rights: [
        { src: "images/other2_1.png", alt: "모델 컷(세트2) 1" },
        { src: "images/other2_2.png", alt: "모델 컷(세트2) 2" },
        { src: "images/other2_3.png", alt: "반지 디테일 컷(세트2)" },
      ],
    },
  ];

  const carousel = document.getElementById("otherWorksCarousel");
  const viewport = document.getElementById("otherWorksViewport");
  const dotsWrap = document.getElementById("otherWorksDots");

  if (!carousel || !viewport || !dotsWrap) return;

  viewport.innerHTML = "";
  dotsWrap.innerHTML = ""; // ✅ 여기 중요! ("" 이어야 함)

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
    const slideIndex = idx + 1;

    const article = document.createElement("article");
    article.className = "other-works-slide";
    article.id = `other-slide-${slideIndex}`;

    const grid = document.createElement("div");
    grid.className = "other-works-grid";

    // ✅ 왼쪽 wrapper
    const leftWrap = document.createElement("div");
    leftWrap.className = "other-works-left-wrap";
    leftWrap.appendChild(createFigure(slide.left, "other-works-figure--left"));

    // 오른쪽
    const stack = document.createElement("div");
    stack.className = "other-works-stack";

    (slide.rights || []).forEach((imgObj) => {
      stack.appendChild(createFigure(imgObj));
    });

    grid.appendChild(leftWrap);
    grid.appendChild(stack);

    article.appendChild(grid);
    viewport.appendChild(article);
    slideEls.push(article);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "other-works-dot";
    dot.setAttribute("aria-label", `슬라이드 ${slideIndex}로 이동`);
    dot.dataset.index = String(idx);
    dotsWrap.appendChild(dot);
    dotBtns.push(dot);
  });

  const getSlideWidth = () => viewport.clientWidth || 1;

  const setActive = (index) => {
    dotBtns.forEach((btn, i) => {
      btn.setAttribute("aria-current", i === index ? "true" : "false");
    });
  };

  setActive(0);

  dotsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button.other-works-dot");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    viewport.scrollTo({ left: getSlideWidth() * index, behavior: "smooth" });
  });

  viewport.addEventListener("scroll", () => {
    const idx = Math.round(viewport.scrollLeft / getSlideWidth());
    setActive(Math.max(0, Math.min(idx, slideEls.length - 1)));
  });
})();
