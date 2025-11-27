// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 动态设置当前年份
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('#currentYear');
  yearElements.forEach(el => el.textContent = currentYear);
  
  // 移动端菜单切换
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    // 切换图标
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // 回到顶部按钮
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
      navbar.style.padding = '15px 0';
      navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
      navbar.style.padding = '20px 0';
      navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    // 滚动动画检测
    checkScrollAnimations();
  });
  
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 滚动动画检测
  function checkScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // 元素顶部距离视口底部150px时触发
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  
  // 初始加载时检查一次
  checkScrollAnimations();
  
  // 文章卡片悬停动画增强
  const articleCards = document.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'var(--shadow-sm)';
    });
  });
  
  // 订阅表单提交处理
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeMsg = document.getElementById('subscribeMsg');
  
  if (subscribeForm && subscribeMsg) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // 邮箱验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && emailRegex.test(email)) {
        // 模拟提交成功
        subscribeMsg.textContent = '订阅成功！感谢你的关注。';
        subscribeMsg.style.color = 'var(--primary-color)';
        subscribeMsg.style.display = 'block';
        this.reset();
        
        // 3秒后隐藏提示
        setTimeout(() => {
          subscribeMsg.style.display = 'none';
        }, 3000);
      } else {
        subscribeMsg.textContent = '请输入有效的邮箱地址。';
        subscribeMsg.style.color = '#ff3b30'; // 苹果错误色
        subscribeMsg.style.display = 'block';
      }
    });
  }
  
  // 图片懒加载
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.classList.add('loaded');
          imageObserver.unobserve(image);
        }
      });
    });
    
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // 降级处理：不支持IntersectionObserver的浏览器直接加载
    lazyImages.forEach(image => {
      image.classList.add('loaded');
    });
  }
});