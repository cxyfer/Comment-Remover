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
    
    // 設置 cookie 以記住語言選擇
    setCookie('language', lang, 365);
}

function removeComments() {
    const codeInput = document.getElementById('matlabCode');
    let code = codeInput.value;
    
    // 先移除多行註解
    code = code.replace(/%\{[\s\S]*?%\}/g, '');
    
    // 然後處理單行註釋，保留字符串中的 % 符號
    code = code.replace(/('.*?'|".*?")|(%.*$)/gm, function(match, string, comment) {
        if (string) return string; // 保留字符串
        if (comment) return ''; // 移除註釋
    });
    
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
    const savedLanguage = getCookie('language');
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    } else {
        const userLanguage = navigator.language || navigator.userLanguage;
        const initialLanguage = userLanguage.startsWith('zh') ? 'zh' : 'en';
        changeLanguage(initialLanguage);
    }
}

// 設置 cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// 獲取 cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 初始化頁面語言
document.addEventListener('DOMContentLoaded', function() {
    setInitialLanguage();
});