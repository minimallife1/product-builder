class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');

        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                background-color: #f44336;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                animation: appear 0.5s ease-out forwards;
            }

            @keyframes appear {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results');

generateBtn.addEventListener('click', () => {
    resultsContainer.innerHTML = '';
    const numbers = new Set();

    while(numbers.size < 10) { // Generate 10 numbers instead of 6
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            resultsContainer.appendChild(lottoBall);
        }, index * 100);
    });
});

// Theme switcher logic
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    themeSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });

    // Comment form logic
    const commentForm = document.getElementById('comment-form');
    const commentName = document.getElementById('comment-name');
    const commentText = document.getElementById('comment-text');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = commentName.value;
        const text = commentText.value;

        const li = document.createElement('li');
        li.innerHTML = `<strong>${name}:</strong> ${text}`;
        commentsList.appendChild(li);

        commentName.value = '';
        commentText.value = '';
    });
});
