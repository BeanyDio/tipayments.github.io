document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        initTelegramApp();
    }, 1000);
});

function initTelegramApp() {
    console.log("Инициализация приложения...");

    if (!window.Telegram || !window.Telegram.WebApp) {
        console.warn("Telegram WebApp не доступен");
        hidePreloaderAndShowMessage("Требуется Telegram для использования приложения");
        return;
    }

    const tg = window.Telegram.WebApp;

    try {
        if (typeof tg.ready === 'function') {
            tg.ready();
            console.log("Telegram WebApp инициализирован");
        }

        if (isDesktopDevice()) {
            console.log("Обнаружено desktop-устройство");
            hidePreloaderAndShowMessage("Приложение доступно только на мобильных устройствах");
            return;
        }

        console.log("Все проверки пройдены, показываем приложение");
        hidePreloaderAndShowApp();

    } catch (error) {
        console.error("Ошибка инициализации Telegram WebApp:", error);
        hidePreloaderAndShowMessage("Ошибка инициализации приложения");
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

function hidePreloaderAndShowApp() {
            const preloader = document.getElementById('preloader');
            const appContainer = document.querySelector('.app-container');
            
            preloader.style.opacity = '0';
            
            appContainer.style.display = 'block';
            
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }

        function hidePreloaderAndShowMessage(message) {
            const preloader = document.getElementById('preloader');
            
            preloader.style.opacity = '0';
            
            setTimeout(function() {
                preloader.style.display = 'none';
                showAccessDenied(message);
            }, 500);
        }

function showAccessDenied(message) {
    const style = document.createElement('style');
    style.textContent = `
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #0373FF 0%, #0397FF 100%);
                    padding: 20px;
                    color: #333;
                }
                
                .access-denied-container {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    max-width: 500px;
                    width: 100%;
                    padding: 40px 30px;
                    text-align: center;
                    animation: fadeIn 0.6s ease-out;
                }
                
                .icon-container {
                    margin-bottom: 25px;
                }
                
                .icon-circle {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #FF4B4B 0%, #FF7B7B 100%);
                    border-radius: 50%;
                    box-shadow: 0 10px 20px rgba(255, 75, 75, 0.3);
                    animation: pulse 2s infinite;
                }
                
                .icon-circle i {
                    font-size: 50px;
                    color: white;
                }
                
                h1 {
                    font-size: 28px;
                    margin-bottom: 15px;
                    color: #FF4B4B;
                    font-weight: 700;
                }
                
                p {
                    font-size: 18px;
                    line-height: 1.6;
                    margin-bottom: 5px;
                    color: #555;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 10px 20px rgba(255, 75, 75, 0.3); }
                    50% { transform: scale(1.05); box-shadow: 0 15px 30px rgba(255, 75, 75, 0.4); }
                    100% { transform: scale(1); box-shadow: 0 10px 20px rgba(255, 75, 75, 0.3); }
                }
                
                @media (max-width: 500px) {
                    .access-denied-container {
                        padding: 30px 20px;
                    }
                    
                    h1 {
                        font-size: 24px;
                    }
                    
                    p {
                        font-size: 16px;
                    }
                    
                    .icon-circle {
                        width: 80px;
                        height: 80px;
                    }
                    
                    .icon-circle i {
                        font-size: 40px;
                    }
                }
            `;

    document.head.appendChild(style);

    document.body.innerHTML = `
                <div class="access-denied-container">
                    <div class="icon-container">
                        <div class="icon-circle">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>
                    
                    <h1>Доступ запрещен</h1>
                    <p>${message}</p>
                </div>
            `;
}