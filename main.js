function showNotification(type, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification-content notification-${type}`;
    notification.id = 'notification-container'
    notification.innerHTML = `
      <p>${message}</p>
      <span class="close-btn">&times;</span>
    `;
    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    setTimeout(() => {
        notification.remove();
    }, duration);
}
// showNotification('success', 'Thành công: Đây là thông báo thành công!', 3000);
// showNotification('error', 'Thất bại: Đây là thông báo thất bại!', 5000);
// showNotification('warning', 'Cảnh báo: Đây là thông báo cảnh báo!', 4000);
// showNotification('info', 'Thông tin: Đây là thông báo thông tin!', 6000);
var count = 0
const hslToHex = (h, s, l) => {
    s /= 100; l /= 100;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const toRgb = t => {
        t = (t < 0 ? t + 1 : t > 1 ? t - 1 : t);
        return (t < 1 / 6 ? p + (q - p) * 6 * t :
            t < 1 / 2 ? q :
                t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 :
                    p) * 255;
    };
    return `#${[h / 360 + 1 / 3, h / 360, h / 360 - 1 / 3].map(t => Math.round(toRgb(t)).toString(16).padStart(2, '0')).join('')}`;
};

function randomHSLColors() {
    const hue = Math.random() * 360;
    const saturation = Math.random() * 100;
    const lightness1 = Math.random() * 51 + 25;
    const lightness2 = Math.min(100, lightness1 + (Math.random() * 20 - 10));
    return [hslToHex(hue, saturation, lightness1), hslToHex(hue, saturation, lightness2)];
}

function createSquareElement(size, color, key) {
    const square = document.createElement('div');
    square.className = 'square';
    square.style.cssText = `width: ${size}px; height: ${size}px; background-color: ${color}; display: inline-block;`;
    square.setAttribute('data-key', key);


    return square;
}


function createSquares(numberLength) {
    const container = document.getElementsByClassName('container')[0];
    const [color1, color2] = randomHSLColors()

    container.innerHTML = ''

    const containerWidth = container.clientWidth;
    const squareSize = containerWidth / numberLength;
    const numOfSquares = numberLength * numberLength
    const randomSquare = Math.floor(Math.random() * numOfSquares)

    container.style.gridTemplateColumns = `repeat(${numberLength}, 1fr)`

    for (let index = 0; index < numOfSquares; index++) {
        let squareColor = (index == randomSquare ? color1 : color2)
        let square = createSquareElement(squareSize, squareColor, index)
        container.appendChild(square);
    }
    console.log(randomSquare)
    return randomSquare
}

function countdown(duration) {
    const countdownContainer = document.createElement('div');
    const progressBar = document.createElement('div');
    const counter = document.createElement('div');

    countdownContainer.className='countdownContainer'
    progressBar.className='progressBar'
    
    countdownContainer.appendChild(progressBar);
    countdownContainer.appendChild(counter);

    document.body.appendChild(countdownContainer);

    let remainingTime = Math.ceil(duration / 1000); // Tính thời gian còn lại bằng giây
    counter.textContent = `Đóng trong: ${remainingTime}s`;

    const interval = setInterval(() => {
        remainingTime--;
        counter.textContent = `Đóng trong: ${remainingTime}s`;

        // Tính phần trăm thời gian còn lại
        const percentage = (remainingTime / (duration / 1000)) * 100;
        progressBar.style.width = `${percentage}%`;

        // Đổi màu thanh đếm ngược dựa trên phần trăm
        if (percentage <= 50) {
            progressBar.style.backgroundColor = 'orange';
        }
        if (percentage <= 20) {
            progressBar.style.backgroundColor = 'red';
        }

        if (remainingTime <= 0) {
            clearInterval(interval); // Ngừng bộ đếm ngược khi thời gian hết
            countdownContainer.textContent = 'Hết thời gian!';
        }
    }, 1000);
    return {
        reset: () => {
            clearInterval(interval);
            document.body.removeChild(countdownContainer);
        }
    };
}


function run() {
    var squareSelected, defaultNumberSquares = 3
    let countdownInstance= countdown(10000)
    var squareTrue = createSquares(defaultNumberSquares)

    const container = document.querySelector('.container');

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('square')) {
            squareSelected = e.target.getAttribute('data-key');
            console.log(squareSelected);
            if (squareSelected == squareTrue) {
                showNotification('success', 'Đáp án chính xác!', 3000);
                countdownInstance.reset()
                // Tạo lại các ô vuông mới sau khi đáp án đúng
                countdownInstance= countdown(10000)
                squareTrue = createSquares(3);
            } else {
                showNotification('error', 'Đáp án sai!', 3000);
            }
        }
    });

}
run()