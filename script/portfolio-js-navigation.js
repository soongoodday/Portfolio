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

    // 네비 클릭
    this.navLinks.forEach(link => {
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

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').replace('#', '');
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
