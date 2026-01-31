// Navigation functionality (✅ 최종 안정 버전)

class Navigation {
  constructor() {
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.navMenu = document.getElementById("navMenu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = ["home", "about", "skills", "ai-skills", "portfolio", "page-bottom"];
    this.indicatorBar = document.querySelector(".nav-indicator-bar");

    this.init();
  }

  init() {
    // ✅ 햄버거 버튼 클릭 -> 메뉴 열고 닫기
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu());
    }

    // ✅ 메뉴 링크 클릭 -> (스크롤은 CSS가 부드럽게 해줌) + 모바일 메뉴 닫기
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.navMenu.classList.contains("active")) {
          this.toggleMobileMenu();
        }
      });
    });

    // ✅ 스크롤하면 active 메뉴 표시 업데이트
    window.addEventListener("scroll", () => this.handleScroll());

    // 초기 활성화
    this.updateActiveSection();
  }

  toggleMobileMenu() {
    this.mobileMenuBtn.classList.toggle("active");
    this.navMenu.classList.toggle("active");
  }

  handleScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 200;
    let currentSection = this.sections[0];

    for (let section of this.sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        currentSection = section;
        break;
      }
    }

    // ✅ href(#id) 기준으로 active 처리 (data-section 없어도 됨)
    this.navLinks.forEach((link) => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (targetId === currentSection) link.classList.add("active");
      else link.classList.remove("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Navigation();
});
