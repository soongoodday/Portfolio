class Navigation {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.getElementById('navMenu');
    this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
    this.header = document.querySelector('.header');
    this.indicatorBar = document.querySelector('.nav-indicator-bar');

    // ✅ 섹션 id 목록
    this.sections = ['home', 'about', 'skills', 'ai-skills', 'portfolio'];

    // ✅ 섹션 요소를 "한 번만" 캐시
    this.sectionEls = this.sections
      .map(id => document.getElementById(id))
      .filter(Boolean);

    // ✅ 현재 active 섹션 기억
    this.currentSection = null;

    this.init();
  }

  init() {
    // 모바일 메뉴 토글
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }

    // 네비 링크 클릭
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });

    // ✅ 스크롤: rAF + passive + "한 프레임에 한 번만"
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

    // 화면 리사이즈 시(모바일 주소창 등)도 한번 업데이트
    window.addEventListener('resize', () => this.handleScroll(), { passive: true });

    // 초기 활성화
    this.handleScroll();
  }

  toggleMobileMenu() {
    this.mobileMenuBtn?.classList.toggle('active');
    this.navMenu?.classList.toggle('active');
  }

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
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerHeight = this.header ? this.header.offsetHeight : 0;
    
    // ✅ Safari에서도 안정적인 위치 계산
const y = window.scrollY + targetElement.getBoundingClientRect().top - headerHeight;

// ✅ 우리가 만든 "마법 스크롤" 사용!
this.smoothScrollTo(targetId === 'home' ? 1 : y, 520);


    // 모바일 메뉴 닫기
    if (this.navMenu && this.navMenu.classList.contains('active')) {
      this.toggleMobileMenu();
    }
  }

  handleScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 200;

    // ✅ 섹션 탐색: 캐시된 요소만 사용
    let nextSection = 'home';
    for (const el of this.sectionEls) {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < bottom) {
        nextSection = el.id;
        break;
      }
    }

    // ✅ 섹션이 안 바뀌었으면 아무것도 하지 않음 (버벅임 크게 줄음)
    if (nextSection === this.currentSection) return;
    this.currentSection = nextSection;

    // ✅ nav-link active는 전체 토글 말고, "필요할 때만" 갱신
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href'); // "#home" 형태
      const id = href ? href.replace('#', '') : '';
      link.classList.toggle('active', id === nextSection);
    });

    // 인디케이터 바 업데이트(있을 때만)
    if (this.indicatorBar) {
      const index = this.sections.indexOf(nextSection);
      const percentage = (index / this.sections.length) * 100;
      this.indicatorBar.style.left = `${percentage}%`;
    }
  }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
