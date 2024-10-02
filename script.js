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
    showNotification('註解已移除', 2000);
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