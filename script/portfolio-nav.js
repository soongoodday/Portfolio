document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    if (!mobileMenuBtn || !navMenu) return;
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // ✅ 메뉴 닫고 → 그 다음 스크롤 (홈 잘림 해결)
  const scrollToSection = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const doScroll = () => {
      const headerHeight = header ? header.offsetHeight : 0;

      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const y = target.offsetTop - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // 메뉴가 열려있으면 먼저 닫고 스크롤
    if (navMenu && navMenu.classList.contains('active')) {
      toggleMobileMenu();
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
    } else {
      doScroll();
    }
  };

  // 네비 링크 클릭
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      scrollToSection(id);
    });
  });

  // contactLink (있을 때만)
  const contactLink = document.getElementById('contactLink');
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      if (navMenu && navMenu.classList.contains('active')) toggleMobileMenu();
    });
  }
});
