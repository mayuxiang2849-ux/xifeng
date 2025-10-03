// 1. 轮播图功能（自动切换+点击控制）
let currentSlide = 0; // 当前显示的轮播索引
const slides = document.querySelectorAll('.carousel-item'); // 所有轮播项
const indicators = document.querySelectorAll('.carousel-indicator'); // 轮播指示器
const prevBtn = document.getElementById('prevSlide'); // 上一张按钮
const nextBtn = document.getElementById('nextSlide'); // 下一张按钮

// 显示指定索引的轮播
function showSlide(index) {
    // 隐藏所有轮播，重置指示器
    slides.forEach(slide => slide.classList.remove('opacity-100'));
    slides.forEach(slide => slide.classList.add('opacity-0'));
    indicators.forEach(ind => ind.classList.remove('opacity-100'));
    indicators.forEach(ind => ind.classList.add('opacity-50'));
    
    // 显示当前轮播，激活当前指示器
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100');
    indicators[index].classList.remove('opacity-50');
    indicators[index].classList.add('opacity-100');
    
    currentSlide = index; // 更新当前索引
}

// 自动轮播（5秒切换一次）
let slideTimer = setInterval(() => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) nextIndex = 0; // 最后一张回到第一张
    showSlide(nextIndex);
}, 5000);

// 点击上一张
prevBtn.addEventListener('click', () => {
    clearInterval(slideTimer); // 暂停自动轮播
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) prevIndex = slides.length - 1; // 第一张回到最后一张
    showSlide(prevIndex);
    slideTimer = setInterval(() => { // 重新启动自动轮播
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }, 5000);
});

// 点击下一张
nextBtn.addEventListener('click', () => {
    clearInterval(slideTimer); // 暂停自动轮播
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    showSlide(nextIndex);
    slideTimer = setInterval(() => { // 重新启动自动轮播
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }, 5000);
});

// 点击指示器切换轮播
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(slideTimer); // 暂停自动轮播
        showSlide(index);
        slideTimer = setInterval(() => { // 重新启动自动轮播
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            showSlide(nextIndex);
        }, 5000);
    });
});

// 2. 导航栏滚动效果（滚动时变透明+加阴影）
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // 滚动超过50px时
        navbar.classList.add('bg-forest-dark/80', 'shadow-md');
        navbar.classList.remove('bg-transparent');
    } else { // 回到顶部时
        navbar.classList.remove('bg-forest-dark/80', 'shadow-md');
        navbar.classList.add('bg-transparent');
    }
});

// 3. 移动端菜单切换（点击按钮显示/隐藏菜单）
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden'); // 切换隐藏/显示
});

// 4. 平滑滚动（点击锚点链接时平滑到对应位置）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认跳转
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // 点击首页链接不处理
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // 平滑滚动到目标位置
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // 如果是移动端，点击后关闭菜单
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});