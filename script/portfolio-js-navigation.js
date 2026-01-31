class Navigation {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
    this.header = document.querySelector('.header');
    this.indicatorBar = document.querySelector('.nav-indicator-bar');

    // 섹션 id 목록
    this.sections = ['home', 'about', 'skills', 'ai-skills', 'portfolio', 'page-bottom'];


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

    // ✅ 히어로 "맨 아래로 스크롤하기" 버튼도 page-bottom으로 이동
    const downBtn = document.querySelector('.hero_box_scrollButton');
    if (downBtn) {
      downBtn.addEventListener('click', (e) => this.goToSection(e, 'page-bottom'));
    }


    // 네비 클릭
    this.navLinks.forEach(link => {
      // ✅ 외부 링크(작업일기/타임라인)는 기본 이동 막지 않기
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

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

  goToSection(e, targetId) {
  if (e) e.preventDefault();

  // 1) (폰에서 중요) 메뉴가 열려있으면 먼저 닫기
  if (this.navMenu?.classList.contains('active')) {
    this.toggleMobileMenu();
  }

  // 2) 메뉴가 닫힌 다음에(다음 프레임) 위치 계산해서 이동
  requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerH = this.header ? this.header.offsetHeight : 0;
    const y = window.scrollY + target.getBoundingClientRect().top - headerH;

    this.smoothScrollTo(targetId === 'home' ? 0 : y, 520);
  });
}

  handleNavClick(e) {
  const link = e.currentTarget;

  // 외부 링크는 그냥 열기 + 메뉴만 닫기
  if (link.target === "_blank") {
    if (this.navMenu?.classList.contains('active')) {
      this.toggleMobileMenu();
    }
    return;
  }

  // 내부 앵커는 Navigation이 스크롤을 관리
  e.preventDefault();
  const targetId = (link.getAttribute('href') || '').replace('#', '');
  this.goToSection(e, targetId);
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



