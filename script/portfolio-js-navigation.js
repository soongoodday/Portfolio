class Navigation {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
    this.header = document.querySelector('.header');
    this.indicatorBar = document.querySelector('.nav-indicator-bar');

    // 섹션 id 목록
    this.sections = ['home', 'about', 'skills', 'ai-skills', 'portfolio'];

    // 섹션 요소 캐시
    this.sectionEls = this.sections
      .map(id => document.getElementById(id))
      .filter(Boolean);

    this.currentSection = null;

    this.init();
  }

  init() {
    // 모바일 메뉴 토글
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // ✅ 공용 스크롤 함수 (웹/모바일 공통)
    const scrollToTarget = (targetEl) => {
      if (!targetEl) return;

      const scrollEl = document.scrollingElement || document.documentElement;
      const headerH = this.header ? this.header.offsetHeight : 0;

      let y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 8;

      const maxScroll = scrollEl.scrollHeight - window.innerHeight;
      y = Math.min(Math.max(0, y), maxScroll);

      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // ✅ 메뉴 닫은 뒤 스크롤 (모바일 대응)
    const closeMenuThenScroll = (targetEl) => {
      if (this.navMenu?.classList.contains('active')) {
        this.toggleMobileMenu();
        setTimeout(() => scrollToTarget(targetEl), 380);
      } else {
        scrollToTarget(targetEl);
      }
    };

    // ✅ 네비게이션 링크 클릭 처리 (연락 포함)
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        e.preventDefault();
        const targetEl = document.querySelector(href);
        closeMenuThenScroll(targetEl);
      });
    });

    // ✅ 히어로 "맨 아래로 스크롤" 버튼
    const bottomBtn = document.querySelector('.hero_box_scrollButton');
    if (bottomBtn) {
      bottomBtn.addEventListener('click', () => {
        const targetEl = document.getElementById('page-bottom');
        closeMenuThenScroll(targetEl);
      });
    }

    // 스크롤 rAF
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.addEventListener('resize', () => this.handleScroll(), { passive: true });

    // 최초 1회
    this.handleScroll();
  }

  toggleMobileMenu() {
    this.mobileMenuBtn?.classList.toggle('active');
    this.navMenu?.classList.toggle('active');
  }

  /* ===== 부드러운 스크롤 (이것만 사용) ===== */
  smoothScrollTo(targetY, duration = 520) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const start = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      window.scrollTo(0, startY + diff * easeOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  handleNavClick(e) {
  const link = e.currentTarget;

  // ✅ 1) 외부 링크(target=_blank)는 막지 말고, 메뉴만 닫기
  if (link.target === "_blank") {
    if (this.navMenu?.classList.contains('active')) {
      this.toggleMobileMenu();
    }
    return; // ✅ preventDefault() 하지 않음 → 링크 정상 열림
  }

  // ✅ 2) 내부 앵커(#section)만 우리가 스크롤 처리
  e.preventDefault();

  const href = link.getAttribute('href') || '';
  const targetId = href.replace('#', '');

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerHeight = this.header ? this.header.offsetHeight : 0;
  const y =
    window.scrollY +
    targetElement.getBoundingClientRect().top -
    headerHeight;

  this.smoothScrollTo(targetId === 'home' ? 1 : y, 520);

  if (this.navMenu?.classList.contains('active')) {
    this.toggleMobileMenu();
  }
}

  handleScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const headerHeight = this.header ? this.header.offsetHeight : 0;
    const scrollPosition = window.scrollY + headerHeight + 30;

    let nextSection = 'home';
    for (const el of this.sectionEls) {
      if (
        scrollPosition >= el.offsetTop &&
        scrollPosition < el.offsetTop + el.offsetHeight
      ) {
        nextSection = el.id;
        break;
      }
    }

    if (nextSection === this.currentSection) return;
    this.currentSection = nextSection;

    this.navLinks.forEach(link => {
      const id = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', id === nextSection);
    });

    // ⭐ 인디케이터 실제 위치로 부드럽게 이동
    this.updateIndicator(nextSection);
  }

  /* ===== 인디케이터 바 실제 위치 계산 ===== */
  updateIndicator(sectionId) {
    if (!this.indicatorBar || !this.navMenu) return;

    const activeLink = this.navLinks.find(link => {
      return link.getAttribute('href') === `#${sectionId}`;
    });

    if (!activeLink) return;

    const menuRect = this.navMenu.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const left = linkRect.left - menuRect.left;
    const width = linkRect.width;

    this.indicatorBar.style.transform = `translateX(${left}px)`;
    this.indicatorBar.style.width = `${width}px`;
    this.indicatorBar.style.opacity = '1';
  }
}

/* ===== 초기화 ===== */
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});

// ✅ "연락" + "맨 아래로 스크롤하기"를 진짜 최하단으로 이동 (웹/모바일 공통)
(() => {
  const goBottom = () => {
    const doc = document.documentElement;
    const top = Math.max(doc.scrollHeight, document.body.scrollHeight);

    // ✅ 일부 브라우저에서 한 번에 안 먹는 경우가 있어 2번 보정
    window.scrollTo({ top, behavior: 'smooth' });
    requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: 'smooth' });
    });
  };

  // 1) 히어로 버튼
  const bottomBtn = document.querySelector('.hero_box_scrollButton');
  if (bottomBtn) bottomBtn.addEventListener('click', goBottom);

  // 2) 네비 '연락' 링크
  const contactLink = document.querySelector('a[href="#page-bottom"]');
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      goBottom();
    });
  }
})();
