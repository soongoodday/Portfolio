// Navigation functionality

class Navigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = ['home', 'about', 'skills', 'ai-skills', 'portfolio'];
        this.indicatorBar = document.querySelector('.nav-indicator-bar');
        
        this.init();
    }
    
    init() {
        // 모바일 메뉴 토글
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // 네비게이션 링크 클릭
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // 스크롤 이벤트
        window.addEventListener('scroll', () => this.handleScroll());
        
        // 초기 활성화
        this.updateActiveSection();
    }
    
    toggleMobileMenu() {
        this.mobileMenuBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // 부드러운 스크롤
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 모바일 메뉴 닫기
            if (this.navMenu.classList.contains('active')) {
                this.toggleMobileMenu();
            }
        }
    }
    
    handleScroll() {
        this.updateActiveSection();
    }
    
    updateActiveSection() {
        const scrollPosition = window.scrollY + 200;
        let currentSection = this.sections[0];
        
        // 현재 섹션 찾기
        for (let section of this.sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    currentSection = section;
                    break;
                }
            }
        }
        
        // 네비게이션 링크 업데이트
        this.navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // 인디케이터 바 위치 업데이트
        if (this.indicatorBar) {
            const index = this.sections.indexOf(currentSection);
            const percentage = (index / this.sections.length) * 100;
            this.indicatorBar.style.left = `${percentage}%`;
        }
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

