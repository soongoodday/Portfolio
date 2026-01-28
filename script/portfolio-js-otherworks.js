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
      left: { src: "images/nouvedilie1.png", alt: "누베딜리 상세페이지1" },
      rights: [{ src: "images/nouvedilie2.png", alt: "누베딜리 상세페이지2" }],
      title: "누베딜리 상세 페이지",
      desc: "누베딜리 웹페이지의 제품 썸네일을 클릭하면 나오는 상세 페이지",
      topic: "일상에서 부담없이 캐주얼하게 착용 가능한 반지",
      age: "30대 ~ 40대 이상",
      caption: "누베딜리 상세페이지",
      link: "#"
    },

    {
      left: { src: "images/nouvedeilie_banner.png", alt: "누베딜리 웹 배너" },
      rights: [],
      title: "누베딜리 웹페이지 배너",
      desc: "누베딜리 웹페이지 배너",
      topic: "일상에서 부담없이 캐주얼하게 착용 가능한 반지",
      age: "30대 ~ 40대 이상",
      caption: "누베딜리 웹페이지 배너",
      link: "#"
    },

    {
      left: { src: "images/carrot_banner1.png", alt: "당근마켓 웹 배너1" },
      rights: [],
      title: "당근마켓 웹 배너1",
      desc: "당근마켓의 메인 컬러와 캐릭터를 활용해서 구인 목적으로 띄우는 광고 배너를 작업했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "당근마켓을 사용하는 전 연령대 사용자",
      caption: "배너 디자인",
      link: "#"
    },

    {
      left: { src: "images/carrot_banner2.png", alt: "당근마켓 웹 배너2" },
      rights: [],
      title: "당근마켓 웹 배너2",
      desc: "당근마켓의 메인 컬러와 캐릭터를 활용해서 구인 목적으로 띄우는 광고 배너를 작업했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "당근마켓을 사용하는 전 연령대 사용자",
      caption: "배너 디자인",
      link: "#"
    },

    {
      left: { src: "images/green17_poster.png", alt: "학원 모집 홍보 포스터" },
      rights: [],
      title: "학원 모집 홍보 포스터",
      desc: "Ideogram(이디오그램)을 활용해서 이미지를 생성하고 variation을 도출해 전체적인 색상을 반영했습니다. 빠르고 높은 취업률을 강점으로 내세운 콘셉트입니다.",
      topic: "학원 모집 홍보 포스터",
      age: "학원 수강에 관심이 있는 10대 ~ 30대 이상",
      caption: "학원 모집 홍보 포스터",
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


/* =========================
   Other Works Mobile UX
   - 모바일 스와이프
   - 도트 생성/활성화
   - 스크롤 멈추면 자동 스냅
========================= */
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('otherWorksViewport');
  const dotsWrap = document.getElementById('otherWorksDots');

  if (!viewport || !dotsWrap) return;

  // 슬라이드들(직접 자식 기준)
  const slides = Array.from(viewport.children);
  if (!slides.length) return;

  // 현재 인덱스
  let index = 0;

  // === 도트 만들기(이미 있으면 재생성 안 함) ===
  if (dotsWrap.children.length === 0) {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'other-works-dot';
      b.setAttribute('aria-label', `${i + 1}번째 슬라이드`);
      b.addEventListener('click', () => snapTo(i, true));
      dotsWrap.appendChild(b);
    });
  }
  const dots = Array.from(dotsWrap.children);

  function setActiveDot(i){
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }

  // === 스냅(자동 정렬) ===
  function snapTo(i, smooth = true){
    index = Math.max(0, Math.min(i, slides.length - 1));
    const w = viewport.clientWidth;
    viewport.scrollTo({
      left: index * w,
      behavior: smooth ? 'smooth' : 'auto'
    });
    setActiveDot(index);
  }

  // 처음 도트 활성화
  setActiveDot(0);

  // === 스크롤 멈추면 가장 가까운 슬라이드로 자동 스냅 ===
  let scrollTimer = null;
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const w = viewport.clientWidth || 1;
      const i = Math.round(viewport.scrollLeft / w);
      snapTo(i, true);
    }, 120);
  }, { passive: true });

  // === 모바일 스와이프(터치) ===
  let startX = 0;
  let moved = 0;

  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    moved = 0;
    viewport.classList.add('is-swiping');
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    moved = e.touches[0].clientX - startX; // +면 오른쪽으로 드래그
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    viewport.classList.remove('is-swiping');

    // 현재 위치 기반 index 업데이트
    const w = viewport.clientWidth || 1;
    const current = Math.round(viewport.scrollLeft / w);

    // 스와이프 임계값
    const TH = 50;

    if (Math.abs(moved) < TH) {
      // 살짝 건드림: 제자리 스냅
      snapTo(current, true);
      return;
    }

    if (moved < 0) {
      // 왼쪽으로 스와이프(다음)
      if (current >= slides.length - 1) {
        // 끝에서 탄성 느낌
        viewport.style.setProperty('--nudge', '-10px');
        viewport.classList.remove('edge-nudge'); void viewport.offsetWidth;
        viewport.classList.add('edge-nudge');
        snapTo(current, true);
      } else {
        snapTo(current + 1, true);
      }
    } else {
      // 오른쪽으로 스와이프(이전)
      if (current <= 0) {
        viewport.style.setProperty('--nudge', '10px');
        viewport.classList.remove('edge-nudge'); void viewport.offsetWidth;
        viewport.classList.add('edge-nudge');
        snapTo(current, true);
      } else {
        snapTo(current - 1, true);
      }
    }
  }, { passive: true });

  // 화면 리사이즈되면 현재 index 위치 재정렬
  window.addEventListener('resize', () => snapTo(index, false));
});


/* =========================
   PC 마우스 드래그 슬라이드
========================= */
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('otherWorksViewport');
  if (!viewport) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    viewport.classList.add('is-swiping');
    startX = e.pageX;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.classList.remove('is-swiping');
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.classList.remove('is-swiping');

    /* 드래그 끝나면 가장 가까운 슬라이드로 스냅 */
    const w = viewport.clientWidth || 1;
    const index = Math.round(viewport.scrollLeft / w);
    viewport.scrollTo({
      left: index * w,
      behavior: 'smooth'
    });
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX) * 1.1; // 드래그 감도
    viewport.scrollLeft = scrollLeft - walk;
  });
});
