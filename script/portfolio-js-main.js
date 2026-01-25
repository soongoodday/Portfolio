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

btn.addEventListener("click", () => {
  bottom.scrollIntoView({ behavior: "smooth" });
});

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
