const translations = {
    zh: {
        title: 'MATLAB 註解移除器',
        placeholder: '在此輸入您的 MATLAB 代碼...',
        removeButton: '移除註解',
        notification: '註解已移除'
    },
    en: {
        title: 'MATLAB Comment Remover',
        placeholder: 'Enter your MATLAB code here...',
        removeButton: 'Remove Comments',
        notification: 'Comments removed'
    }
};

let currentLanguage = 'en';  // 將默認語言設置為英文

function changeLanguage(lang) {
    currentLanguage = lang;
    document.title = translations[lang].title;
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('matlabCode').placeholder = translations[lang].placeholder;
    document.getElementById('removeButton').textContent = translations[lang].removeButton;
    document.getElementById('languageSelect').value = lang;
  
}

function removeComments() {
    const codeInput = document.getElementById('matlabCode');
    
    // 移除單行註解和多行註解
    let code = codeInput.value;
    
    // 使用更複雜的正則表達式來處理單行註釋
    code = code.replace(/('.*?'|".*?")|(%.*$)/gm, function(match, string, comment) {
        if (string) return string; // 保留字符串
        if (comment) return ''; // 移除註釋
    });
    
    // 移除多行註解
    code = code.replace(/^\s*%{[\s\S]*?%}\s*$/gm, '');
    
    // 移除連續的空行，保留單個空行
    code = code.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // 更新輸入框的內容
    codeInput.value = code.trim();

    // 顯示通知
    showNotification(translations[currentLanguage].notification, 2000);
}

function showNotification(text, duration = 2000) {
    const notification = document.getElementById('notification');
    notification.textContent = text;
    notification.classList.remove('hidden');
    notification.classList.add('show');

    // 3秒後隱藏通知
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, duration);
}

// 根據使用者的裝置語言設定初始語言
function setInitialLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const initialLanguage = userLanguage.startsWith('zh') ? 'zh' : 'en';
    changeLanguage(initialLanguage);
}

// 初始化頁面語言
document.addEventListener('DOMContentLoaded', function() {
    setInitialLanguage();
});