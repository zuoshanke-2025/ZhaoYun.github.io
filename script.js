// DOM元素
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('back-to-top');
const loginBtn = document.getElementById('login-btn');
const contentArea = document.getElementById('content-area');
const adminPassword = document.getElementById('admin-password');
const submitMessageBtn = document.getElementById('submit-message');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const messagesContainer = document.getElementById('messages-container');

// 导航菜单交互
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// 回到顶部按钮
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 处理管理员登录
loginBtn.addEventListener('click', () => {
    const password = adminPassword.value.trim();
    
    // 简单的密码验证 (在实际应用中应使用更安全的方法)
    if (password === 'admin123') {
        contentArea.classList.remove('hidden');
        contentArea.innerHTML = `
            <h3>今日分享主题: 构建高效自我管理系统</h3>
            <div class="content-date">发布时间: ${new Date().toLocaleDateString()}</div>
            <div class="content-body">
                <p>在快节奏的现代生活中，高效的自我管理系统是成功的关键。今天，我们将探讨如何建立一个个人化的系统，帮助您更好地管理时间、任务和目标。</p>
                <h4>要点一：时间块工作法</h4>
                <p>将一天划分为专注的时间块，每个时间块专注于一项任务，避免多任务处理带来的效率损失。</p>
                <h4>要点二：优先级矩阵</h4>
                <p>使用紧急/重要矩阵来分类任务，确保你始终专注于真正重要的事情。</p>
                <h4>要点三：反思与调整</h4>
                <p>定期回顾你的系统，评估什么有效，什么需要改进，并持续优化你的流程。</p>
                <div class="quote">
                    "自我管理的本质不是管理时间，而是管理注意力。" — 彼得·德鲁克
                </div>
            </div>
        `;
        adminPassword.value = '';
    } else {
        alert('密码错误，请重试!');
    }
});

// 处理留言提交
submitMessageBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (name && message) {
        const currentDate = new Date().toLocaleDateString();
        
        // 创建新留言
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <div class="message-author">${name}</div>
                <div class="message-date">${currentDate}</div>
            </div>
            <div class="message-content">${message}</div>
        `;
        
        // 添加到留言板
        messagesContainer.prepend(messageCard);
        
        // 清空输入
        nameInput.value = '';
        messageInput.value = '';
    } else {
        alert('请填写您的称呼和留言内容!');
    }
});

// 页面加载时添加一些示例留言
document.addEventListener('DOMContentLoaded', () => {
    // 添加一些示例留言
    const sampleMessages = [
        {name: '张先生', message: '这个社群太棒了！我已经学到了很多知识，感谢分享。', date: '2025-01-15'},
        {name: '李女士', message: '昨天的分享很有启发性，希望能有更多类似的内容。', date: '2025-01-14'},
        {name: '王教授', message: '作为社群的老成员，我见证了这里的成长。越来越多的精彩内容，继续加油！', date: '2025-01-10'}
    ];
    
    sampleMessages.forEach(item => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <div class="message-author">${item.name}</div>
                <div class="message-date">${item.date}</div>
            </div>
            <div class="message-content">${item.message}</div>
        `;
        messagesContainer.appendChild(messageCard);
    });
    
    // 添加动画效果
    const animate = () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animate);
    animate(); // 初始运行
});
