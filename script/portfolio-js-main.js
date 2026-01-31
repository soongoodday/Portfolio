// Main application logic

// 유틸리티 함수들
const utils = {
    // 디바운스 함수
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 요소가 뷰포트에 있는지 확인
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 부드러운 스크롤
    smoothScrollTo(target, duration = 1000) {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
};

// 포트폴리오 필터링 (필요시 사용)
class PortfolioFilter {
    constructor() {
        this.items = document.querySelectorAll('.portfolio-item');
        this.init();
    }
    
    init() {
        // 필터 버튼이 있다면 이벤트 리스너 추가
        const filterButtons = document.querySelectorAll('[data-filter]');
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => this.filter(e.target.dataset.filter));
            });
        }
    }
    
    filter(category) {
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// 이미지 레이지 로딩
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => imageObserver.observe(img));
    }
}

// 폼 유효성 검사 (컨택트 폼이 있을 경우)
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // 유효성 검사
        if (this.validate(data)) {
            this.submitForm(data);
        }
    }
    
    validate(data) {
        let isValid = true;
        
        // 이메일 검사
        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                this.showError('email', '올바른 이메일 주소를 입력해주세요.');
                isValid = false;
            }
        }
        
        // 필수 필드 검사
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showError(field.name, '이 필드는 필수입니다.');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            
            // 기존 에러 메시지 제거
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            field.parentNode.appendChild(errorDiv);
            field.focus();
        }
    }
    
    submitForm(data) {
        console.log('Form submitted:', data);
        // 실제 제출 로직을 여기에 추가
        alert('문의가 성공적으로 전송되었습니다!');
        this.form.reset();
    }
}

// 성능 모니터링
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // 페이지 로드 성능 측정
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
}

// 테마 토글 (다크모드 등)
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        // 테마 적용
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // 토글 버튼이 있다면
        const themeToggleBtn = document.getElementById('themeToggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggle());
        }
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 레이지 로딩 초기화
    new LazyLoader();
    
    // 성능 모니터링
    new PerformanceMonitor();
    
    // 콘솔에 환영 메시지
    console.log('%c웹디자이너 성경은 포트폴리오', 'font-size: 20px; font-weight: bold; color: #283f6e;');
    console.log('%c문의: soongoodday@gmail.com', 'font-size: 14px; color: #5577ae;');
});

// 전역 에러 핸들링
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

// 리사이즈 핸들링 (디바운스 적용)
window.addEventListener('resize', utils.debounce(() => {
    // 리사이즈 시 필요한 로직
    console.log('Window resized');
}, 250));

// Export utilities for use in other scripts
window.portfolioUtils = utils;

// 맨 아래로 스크롤하기
const btn = document.querySelector(".hero_box_scrollButton");
const bottom = document.querySelector("#page-bottom");

document.addEventListener('DOMContentLoaded', () => {
  const topBtn = document.querySelector('.top-btn');
  if (!topBtn) return;

  const toggleTopBtn = () => {
    if (window.scrollY > 400) topBtn.classList.add('show');
    else topBtn.classList.remove('show');
  };

  window.addEventListener('scroll', toggleTopBtn);
  toggleTopBtn(); // 처음 로드 시도 체크

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const downBtn = document.querySelector(".hero_box_scrollButton");
  const bottom = document.querySelector("#page-bottom");

  const topBtn = document.querySelector(".top-btn");
  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

/* ===================================
   footer 연락처: 복사 + 앱 열기 + 모달 팝업
   ✅ 클릭 -> 모달 뜸 -> [복사하고 열기] 누르면
      1) 클립보드 복사
      2) 전화앱/메일앱 열기
=================================== */
(() => {
  // 1) 대상 찾기
  const items = Array.from(document.querySelectorAll(".footer-contact .contact-item"));

  // 2) 복사 함수 (실패 대비 포함)
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  };

  // 3) 모달 HTML 생성
  const modal = document.createElement("div");
  modal.id = "copyModal";
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;
  modal.innerHTML = `
    <div class="copy-modal__backdrop" style="
      position:absolute; inset:0;
      background: rgba(0,0,0,0.55);
    "></div>

    <div class="copy-modal__panel" role="dialog" aria-modal="true" style="
      position: relative;
      width: min(420px, 100%);
      background: #fff;
      border-radius: 18px;
      padding: 18px 18px 14px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
      transform: translateY(8px);
    ">
      <button type="button" class="copy-modal__close" aria-label="닫기" style="
        position:absolute; top:10px; right:10px;
        width: 36px; height: 36px;
        border-radius: 999px;
        border: 1px solid #e8e8e8;
        background: #fff;
        font-size: 18px;
        cursor: pointer;
      ">×</button>

      <div class="copy-modal__title" style="
        font-weight: 800;
        font-size: 16px;
        margin: 6px 0 8px;
        color: #111;
      ">복사할까요?</div>

      <div class="copy-modal__desc" style="
        font-size: 14px;
        color: #333;
        line-height: 1.4;
        margin-bottom: 12px;
      "></div>

      <div class="copy-modal__value" style="
        font-size: 14px;
        color: #111;
        background: #f6f6f6;
        border: 1px solid #ededed;
        border-radius: 12px;
        padding: 10px 12px;
        margin-bottom: 12px;
        word-break: break-all;
      "></div>

      <div class="copy-modal__actions" style="
        display:flex;
        gap: 10px;
        justify-content: flex-end;
      ">
        <button type="button" class="copy-modal__cancel" style="
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid #e6e6e6;
          background: #fff;
          cursor: pointer;
          font-weight: 700;
        ">취소</button>

        <button type="button" class="copy-modal__ok" style="
          padding: 10px 12px;
          border-radius: 12px;
          border: 0;
          background: #111;
          color: #fff;
          cursor: pointer;
          font-weight: 800;
        ">복사하고 열기</button>
      </div>

      <div class="copy-modal__hint" style="
        margin-top: 10px;
        font-size: 12px;
        color: #666;
      ">* 버튼을 누르면 복사 후 앱이 열려요.</div>
    </div>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector(".copy-modal__backdrop");
  const closeBtn = modal.querySelector(".copy-modal__close");
  const cancelBtn = modal.querySelector(".copy-modal__cancel");
  const okBtn = modal.querySelector(".copy-modal__ok");
  const descEl = modal.querySelector(".copy-modal__desc");
  const valueEl = modal.querySelector(".copy-modal__value");

  // 4) 토스트(하단 팝업)도 같이 만들기
  const toast = document.createElement("div");
  toast.id = "copyToast";
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 26px;
    transform: translateX(-50%);
    background: rgba(20,20,20,0.92);
    color: #fff;
    padding: 12px 16px;
    border-radius: 14px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: opacity .25s ease, transform .25s ease;
  `;
  document.body.appendChild(toast);

  let toastTimer = null;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(-6px)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(0)";
    }, 1200);
  };

  // 5) 모달 열고 닫기
  let pending = { copy: "", action: "", label: "" };

  const openModal = ({ copy, action, label }) => {
    pending = { copy, action, label };
    descEl.textContent = label === "전화번호"
      ? "전화번호를 클립보드에 복사하고, 전화 앱을 열까요?"
      : "이메일을 클립보드에 복사하고, 메일 앱을 열까요?";
    valueEl.textContent = copy;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // 6) 핵심: [복사하고 열기]
  okBtn.addEventListener("click", async () => {
    const ok = await copyText(pending.copy);
    showToast(ok ? `${pending.label} 복사 완료! 📋` : `복사 실패 😢`);

    // ✅ 앱 열기: 새 탭 느낌으로 막히는 경우가 있어 "동일 탭"으로 호출
    // - 모바일은 보통 바로 열림
    // - PC는 tel: 은 앱이 없으면 반응이 없을 수도 있음(정상)
    if (pending.action) {
      // 약간의 딜레이를 주면 복사 후 열기가 안정적
      setTimeout(() => {
        window.location.href = pending.action;
      }, 150);
    }

    closeModal();
  });

  // 7) 각 contact-item에 클릭 이벤트 걸기
  const bind = (el) => {
    const copy = el.dataset.copy || el.textContent.trim();
    const action = el.dataset.action || "";
    const label = el.id === "copyPhone" ? "전화번호" : "이메일";

    el.style.cursor = "pointer";
    el.addEventListener("click", () => openModal({ copy, action, label }));
  };

  items.forEach(bind);
})();

(() => {
  const sliders = document.querySelectorAll("[data-subslider]");
  if (!sliders.length) return;

  sliders.forEach((wrap) => {
    const track = wrap.querySelector(".sub-slider__track");
    const dotsWrap = wrap.querySelector(".sub-slider__dots");
    if (!track || !dotsWrap) return;

    const items = Array.from(track.children);

    // dots 만들기
    dotsWrap.innerHTML = items.map((_, i) =>
      `<button class="sub-slider__dot" type="button" aria-label="${i+1}"></button>`
    ).join("");
    const dots = Array.from(dotsWrap.querySelectorAll(".sub-slider__dot"));

    const getStep = () => {
      const first = items[0];
      if (!first) return track.clientWidth;
      const gap = parseFloat(getComputedStyle(track).gap || "0");
      return first.getBoundingClientRect().width + gap;
    };

    const setActiveDot = () => {
      const step = getStep();
      const idx = Math.round(track.scrollLeft / step);
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    // dot 클릭하면 해당 슬라이드로 이동
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        track.scrollTo({ left: getStep() * i, behavior: "smooth" });
      });
    });

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(setActiveDot);
    });

    setActiveDot();
  });
})();

/* =========================
   휠을 가로 스크롤로 변환
========================= */
(function(){
  const selectors = [
    ".other-works-viewport",
    ".sub-slider__track",
    ".sub-images--scroll3"
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener("wheel", (e) => {
        // shift+휠은 원래 가로스크롤이니까 그대로 두고,
        // 일반 휠은 가로로 바꿔줌
        if(e.shiftKey) return;

        // 세로 스크롤을 가로로 이동
        if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const bottom = document.querySelector("#page-bottom");
  const downBtn = document.querySelector(".hero_box_scrollButton");
  const contactLink = document.querySelector('a[href="#page-bottom"]');

  if (!bottom) return;

  function goBottom(e) {
    if (e) e.preventDefault();

    const headerH = header ? header.offsetHeight : 0;
    const y = bottom.getBoundingClientRect().top + window.pageYOffset - headerH;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // ✅ "맨 아래로 스크롤하기"
  if (downBtn) downBtn.addEventListener("click", goBottom);

  // ✅ 햄버거 메뉴 "연락"도 같은 방식으로 (원하면 유지 추천)
  if (contactLink) contactLink.addEventListener("click", goBottom);
});
