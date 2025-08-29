document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                const preloader = document.getElementById('preloader');
                const appContainer = document.querySelector('.app-container');
                
                preloader.style.opacity = '0';
                
                appContainer.style.display = 'block';
                
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
function initTelegramApp() {
    if (!window.Telegram || !window.Telegram.WebApp) {
        console.warn("Telegram WebApp не доступен");
        showAccessDenied("Требуется Telegram для использования приложения");
        return;
    }
    
    const tg = window.Telegram.WebApp;

    try {
        if (typeof tg.ready === 'function') {
            tg.ready();
        }
        
        if (isDesktopDevice()) {
            showAccessDenied("Приложение доступно только на мобильных устройствах");
            return;
        }
        
    } catch (error) {
        console.error("Ошибка инициализации Telegram WebApp:", error);
        showAccessDenied("Ошибка инициализации приложения");
    }
}

function isDesktopDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        if (tg.platform && ['tdesktop', 'macos', 'linux'].includes(tg.platform)) {
            return true;
        }
    }
    
    const desktopPatterns = [
        /windows nt/i,
        /macintosh/i,
        /linux/i,
        /cros/i,
        /playstation/i,
        /xbox/i
    ];
    
    const mobilePatterns = [
        /android/i,
        /webos/i,
        /iphone/i,
        /ipad/i,
        /ipod/i,
        /blackberry/i,
        /windows phone/i
    ];
    
    const isDesktop = desktopPatterns.some(pattern => userAgent.match(pattern));
    const isMobile = mobilePatterns.some(pattern => userAgent.match(pattern));
    
    return isDesktop && !isMobile;
}

function showAccessDenied(message) {
    document.body.innerHTML = `
        <div class="access-denied">
            <div class="access-denied-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Доступ запрещен</h2>
                <p>${message}</p>
            </div>
        </div>
    `;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTelegramApp);
} else {
    initTelegramApp();
}