/* ================================
   portfolio-js-otherworks.js
   ✅ 3단 갤러리: "프로젝트(슬라이드) 1개당 카드 1개"
   ✅ 모달에서 해당 프로젝트 이미지들(left + rights) 넘기기
   ✅ 썸네일 클릭으로 이미지 전환
   ✅ ESC 닫기 / 좌우키 이미지 이동
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
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/nouvedeilie_banner.png", alt: "누베딜리 웹 배너" },
      rights: [],
      title: "누베딜리 웹 배너",
      desc: "누베딜리 웹 배너",
      topic: "일상에서 부담없이 캐주얼하게 착용 가능한 반지",
      age: "30대 ~ 40대 이상",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/carrot_banner1.png", alt: "당근마켓 웹 배너1" },
      rights: [],
      title: "당근마켓 웹 배너1",
      desc: "당근마켓의 메인 컬러와 캐릭터를 활용해서 구인 목적으로 띄우는 광고 배너를 작업했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "당근마켓을 사용하는 전 연령대 사용자",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/carrot_banner2.png", alt: "당근마켓 웹 배너2" },
      rights: [],
      title: "당근마켓 웹 배너2",
      desc: "당근마켓의 메인 컬러와 캐릭터를 활용해서 구인 목적으로 띄우는 광고 배너를 작업했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "당근마켓을 사용하는 전 연령대 사용자",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/green17_poster.png", alt: "학원 모집 홍보 포스터" },
      rights: [],
      title: "학원 모집 홍보 포스터",
      desc: "Ideogram을 활용해 이미지를 생성하고 variation을 도출해 전체적인 색상을 반영했습니다. 빠르고 높은 취업률을 강점으로 내세운 콘셉트입니다.",
      topic: "학원 모집 홍보 포스터",
      age: "학원 수강에 관심이 있는 10대 ~ 30대 이상",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/art_banner1.png", alt: "미대입시닷컴 웹페이지 배너1" },
      rights: [],
      title: "미대입시닷컴 웹페이지 배너1",
      desc: "미대입시닷컴 웹 페이지별 광고 배너입니다. 그라데이션 포인트를 통일해서 작업했습니다.",
      topic: "미대입시닷컴 웹페이지 배너",
      age: "미대 입시생(10대 ~ 20대), 미술 입시 관련 선생님(20대 이상)",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/art_banner2.png", alt: "미대입시닷컴 웹페이지 배너2" },
      rights: [],
      title: "미대입시닷컴 웹페이지 배너2",
      desc: "미대입시닷컴 웹 페이지별 광고 배너입니다. 그라데이션 포인트를 통일해서 작업했습니다.",
      topic: "미대입시닷컴 웹페이지 배너",
      age: "미대 입시생(10대 ~ 20대), 미술 입시 관련 선생님(20대 이상)",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/art_banner3.png", alt: "미대입시닷컴 웹페이지 배너3" },
      rights: [],
      title: "미대입시닷컴 웹페이지 배너3",
      desc: "미대입시닷컴 웹 페이지별 광고 배너입니다. 그라데이션 포인트를 통일해서 작업했습니다.",
      topic: "미대입시닷컴 웹페이지 배너",
      age: "미대 입시생(10대 ~ 20대), 미술 입시 관련 선생님(20대 이상)",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/game_banner_260121.png", alt: "게임 배너" },
      rights: [],
      title: "가상의 카트 게임 배너",
      desc: "가상의 카트 게임 배너를 ChatGPT로 이미지 생성 후 제작했습니다.",
      topic: "프로모션/이벤트 배너",
      age: "전 연령(게임 사용자)",
      caption: "",
      link: "#"
    },
    {
      left: { src: "images/KartRider_banner.png", alt: "카트라이더 게임 배너" },
      rights: [],
      title: "카트라이더 게임 배너",
      desc: "상단 이미지의 카트라이더 게임 배너와 동일하게 포토샵으로 하단 이미지처럼 작업했습니다.",
      topic: "프로모션/게임 배너",
      age: "카트라이더 게임 이용자 및 관심 있는 전 연령대",
      caption: "",
      link: "#"
    },
  ];

  const grid = document.getElementById("otherWorksGrid3");
  if (!grid) return;

  // ✅ 카드 = 슬라이드 1개
  grid.innerHTML = OTHER_WORKS_SLIDES.map((s, i) => {
    const thumb = s.left?.src || "";
    const alt = s.left?.alt || s.title || "";
    return `
      <article class="ow-card" role="button" tabindex="0" data-slide="${i}" aria-label="${s.title} 크게보기">
        <div class="ow-thumb">
          <img src="${thumb}" alt="${alt}" loading="lazy" decoding="async">
        </div>
        <div class="ow-body">
          <h3 class="ow-title">${s.title || ""}</h3>
          <p class="ow-caption">${s.caption || ""}</p>
        </div>
      </article>
    `;
  }).join("");

  // ===== 모달 요소 =====
  const modal = document.getElementById("owModal");
  const modalImg = document.getElementById("owModalImg");
    /* =========================
     ✅ ZOOM(돋보기) + PINCH(모바일 핀치줌)
  ========================= */

  // 1) 버튼 만들기(돋보기)
  const zoomBtn = document.createElement("button");
  if (window.innerWidth <= 768) zoomBtn.style.display = "none";
  zoomBtn.type = "button";
  zoomBtn.className = "ow-zoom-btn";
  zoomBtn.textContent = "🔍";
  zoomBtn.setAttribute("aria-label", "확대/축소");
  modalImg.parentElement.appendChild(zoomBtn);

  const figureEl = modalImg.closest(".ow-modal__figure");
  // ✅ 태블릿(769~1024): 스와이프(좌우)만 허용 느낌으로
if (window.innerWidth <= 1024 && window.innerWidth > 768) {
  figureEl.style.touchAction = "pan-x";
}


  // 2) 확대 상태 변수들
  let scale = 1;     // 확대 배율
  let tx = 0;        // x 이동
  let ty = 0;        // y 이동

  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  const apply = () => {
    modalImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    figureEl?.classList.toggle("is-zoomed", scale > 1);
  };

  const resetZoom = () => {
    scale = 1; tx = 0; ty = 0;
    apply();
  };

  // 3) 돋보기 버튼 = 확대/원복 토글
  zoomBtn.addEventListener("click", () => {
    if (scale === 1) {
      scale = 2; tx = 0; ty = 0;
      apply();
    } else {
      resetZoom();
    }
  });

  // 4) PC: 마우스 휠 확대/축소
  figureEl?.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    scale = clamp(scale + delta, 1, 4);
    if (scale === 1) { tx = 0; ty = 0; }
    apply();
  }, { passive: false });

  // 5) 공통: 드래그로 이동(확대 상태일 때만)
  let isDrag = false;
  let dragStartX = 0;
  let dragStartY = 0;

  figureEl?.addEventListener("pointerdown", (e) => {
    if (scale <= 1) return;
    isDrag = true;
    dragStartX = e.clientX - tx;
    dragStartY = e.clientY - ty;
    figureEl.setPointerCapture?.(e.pointerId);
  });

  figureEl?.addEventListener("pointermove", (e) => {
    if (!isDrag) return;
    tx = e.clientX - dragStartX;
    ty = e.clientY - dragStartY;
    apply();
  });

  figureEl?.addEventListener("pointerup", () => {
    isDrag = false;
  });

  figureEl?.addEventListener("pointercancel", () => {
    isDrag = false;
  });

  // 6) ⭐ 모바일: 두 손가락 핀치 줌
  // 손가락 두 개의 거리로 확대/축소 계산
  let pinchStartDist = 0;
  let pinchStartScale = 1;

  const getDist = (a, b) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  figureEl?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      pinchStartDist = getDist(e.touches[0], e.touches[1]);
      pinchStartScale = scale;
    }
  }, { passive: true });

  figureEl?.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // ⭐ 브라우저 기본 줌 막고 우리가 처리
      const dist = getDist(e.touches[0], e.touches[1]);
      const ratio = dist / pinchStartDist;
      scale = clamp(pinchStartScale * ratio, 1, 4);

      if (scale === 1) { tx = 0; ty = 0; }
      apply();
    }
  }, { passive: false });

  // ✅ 이미지가 바뀌거나 모달 닫힐 때 resetZoom을 호출해야 깔끔해!
  // 아래 2곳에 resetZoom(); 한 줄씩 추가해줘:
  // 1) setModalImage() 맨 끝
  // 2) closeModal() 맨 끝

  const modalThumbs = document.getElementById("owModalThumbs");
  const modalTitle = document.getElementById("owModalTitle");
  const modalDesc = document.getElementById("owModalDesc");
  const modalTopic = document.getElementById("owModalTopic");
  const modalAge = document.getElementById("owModalAge");
  const modalLink = document.getElementById("owModalLink");
  const prevBtn = document.getElementById("owPrev");
  const nextBtn = document.getElementById("owNext");

  let currentSlide = 0;
  let currentImg = 0;
  let currentImages = [];

  const buildImages = (slide) => {
    const s = OTHER_WORKS_SLIDES[slide];
    const imgs = [];
    if (s?.left) imgs.push(s.left);
    (s?.rights || []).forEach((r) => imgs.push(r));
    return imgs;
  };

  const renderThumbs = () => {
    if (!modalThumbs) return;
    modalThumbs.innerHTML = currentImages.map((im, idx) => {
      return `
        <button class="ow-modal__thumb ${idx === currentImg ? "is-active" : ""}" type="button" data-img="${idx}" aria-label="이미지 ${idx + 1}">
          <img src="${im.src}" alt="">
        </button>
      `;
    }).join("");
  };

  const setModalImage = (idx) => {
    currentImg = Math.max(0, Math.min(idx, currentImages.length - 1));
    const im = currentImages[currentImg];
    modalImg.src = im.src;
    modalImg.alt = im.alt || OTHER_WORKS_SLIDES[currentSlide]?.title || "";
    renderThumbs();
    resetZoom();
  };

  const openModal = (slideIndex) => {
    currentSlide = Math.max(0, Math.min(slideIndex, OTHER_WORKS_SLIDES.length - 1));
    const s = OTHER_WORKS_SLIDES[currentSlide];

    currentImages = buildImages(currentSlide);
    currentImg = 0;

    modalTitle.textContent = s.title || "";
    modalDesc.textContent = s.desc || "";
    modalTopic.textContent = s.topic || "";
    modalAge.textContent = s.age || "";
    modalLink.href = s.link || "#";

    modal.classList.add("image-only"); // ⭐ 사진만 크게 보기
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setModalImage(0);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.classList.remove("image-only"); // ⭐ 원래 상태로 되돌리기
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetZoom();
  };

  const moveImg = (dir) => {
    const next = dir === "next" ? currentImg + 1 : currentImg - 1;
    if (next < 0 || next > currentImages.length - 1) return;
    setModalImage(next);
  };

  // 카드 클릭/엔터
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".ow-card");
    if (!card) return;
    openModal(Number(card.dataset.slide));
  });

  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".ow-card");
    if (!card) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(Number(card.dataset.slide));
    }
  });

  // 모달 닫기(배경/닫기버튼)
  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeModal();

    // 썸네일 클릭
    const t = e.target.closest(".ow-modal__thumb");
    if (t && t.dataset.img) setModalImage(Number(t.dataset.img));
  });

  // 이전/다음(이미지용으로 사용)
  prevBtn?.addEventListener("click", () => moveImg("prev"));
  nextBtn?.addEventListener("click", () => moveImg("next"));

  // ESC / 좌우키(이미지 이동)
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") moveImg("prev");
    if (e.key === "ArrowRight") moveImg("next");
  });
})();

