const input = document.getElementById('input');
const output = document.getElementById('output');
let history = [];
let historyIndex = 0;

const commands = {
    help: () => {
        return (
            `<div class='command-output'>` +
                'Available commands:\n' +
                ' about   - Show profile info\n' +
                ' skills  - Show my skills\n' +
                ' projects - Show featured projects\n' +
                ' contact - Contact details\n' +
                ' clear   - Clear the terminal' +
            `</div>`
        );
    },

    about: () => {
        return (
            `<div class='command-output'>` +
                `<div class='profile-pic'></div>` +
                `I am Suraj, a passionate <span class='prompt'>Software Developer</span> ` +
                `who loves building scalable backend systems and performance-optimized applications.\n` +
                `I enjoy working with modern frameworks like Spring Boot and exploring new technologies ` +
                `in distributed systems.` +
            `</div>`
        );
    },

    skills: () => {
        return (
            `<div class='command-output'>` +
                'Java SE, Java EE / Jakarta EE, Spring Boot, Hibernate, ' +
                'REST APIs, Maven, Git, MySQL, JUnit, ' +
                'Docker, Linux, and Microservices Architecture.' +
            `</div>`
        );
    },

    projects: () => {
        return (
            `<div class='command-output'>` +
                '1. Banking Web Application — Built with JSP, Servlets, and Oracle DB.\n' +
                '2. Reactive Chat App — Real-time messaging using WebSockets and Netty.\n' +
                '3. Microservices Demo — Spring Cloud-based service communication project.' +
            `</div>`
        );
    },

    contact: () => {
        return (
            `<div class='command-output'>` +
                `👉🏻 <a href="https://github.com/suraj-mohapatra" target="_blank" rel="noopener noreferrer">GitHub</a>` +
                `&nbsp;|&nbsp;` +
                `👉🏻 <a href="https://linkedin.com/in/surajmohapatra" target="_blank" rel="noopener noreferrer">LinkedIn</a>` +
            `</div>`
        );
    },

    clear: () => {
        return `<div></div>`;
    }
};


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        
        if (!cmd) return;
        
        appendLine(`<span class='prompt'>$</span> ${cmd}`);

        if (commands[cmd] !== undefined) {
            if (cmd === 'clear') {
                output.innerHTML = '';
            } else {
                const content = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
                appendLine(content);
            }
        } else {
            appendLine(`<div class="command-not-found">bash: ${cmd}: command not found</div>`);
        }
        history.push(cmd);
        historyIndex = history.length;
        input.value = '';
        scrollBottom();
    }
    if (e.key === 'ArrowUp') {
        if (historyIndex > 0) { historyIndex--; input.value = history[historyIndex]; }
    }
    if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) { historyIndex++; input.value = history[historyIndex]; }
        else { historyIndex = history.length; input.value = ''; }
    }
});

function appendLine(text) {
    const div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = text;
    output.appendChild(div);
}

function scrollBottom() {
    const screen = document.getElementById('screen');
    screen.scrollTop = screen.scrollHeight;
}

// Binary scroll effect
function createBinaryScroll() {
    const binaryScroll = document.querySelector('.binary-scroll');
    const binaryContent = document.createElement('div');
    binaryContent.style.whiteSpace = 'nowrap';
    binaryContent.style.color = 'var(--accent)';
    binaryContent.style.position = 'absolute';
    binaryContent.style.animation = 'scroll 40s linear infinite';

    function generateBinary() {
        let binary = '';
        for (let i = 0; i < 200; i++) {
            binary += Math.random() < 0.5 ? '0' : '1';
            binary += ' ';
        }
        return binary;
    }

    function updateBinary() {
        binaryContent.textContent = generateBinary();
    }

    binaryScroll.appendChild(binaryContent);
    updateBinary();
    setInterval(updateBinary, 500); // Update binary every 500ms
}

// Initialize binary scroll
createBinaryScroll();