const input = document.getElementById('input');
const output = document.getElementById('output');
let history = [];
let historyIndex = 0;

const commands = {
    help: `Available commands:\n about  - Show profile info\n skills - Show my skills\n projects - Show featured projects\n contact - Contact details\n clear - Clear the terminal`,
    about: `<div class='profile-pic'></div>I'm Suraj, a passionate <span class='prompt'>Java Developer</span> who loves building scalable backend systems, RESTful APIs, and performance-optimized applications.\nI enjoy working with modern frameworks like Spring Boot and exploring new technologies in distributed systems.`,
    skills: `Core Java, Spring Boot, Hibernate, REST APIs, Maven, Git, MySQL, JUnit, Docker, Linux, and Microservices Architecture.`,
    projects: `1. Banking Web Application — Built with JSP, Servlets, and Oracle DB.\n2. Reactive Chat App — Real-time messaging using WebSockets and Netty.\n3. Microservices Demo — Spring Cloud-based service communication project.`,
    contact: `Email: suraj@example.com\nGitHub: https://github.com/yourusername\nLinkedIn: https://linkedin.com/in/yourprofile`,
    clear: ''
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (!cmd) return;
        appendLine(`<span class='prompt'>$</span> ${cmd}`);
        if (commands[cmd] !== undefined) {
            if (cmd === 'clear') { output.innerHTML = ''; }
            else appendLine(commands[cmd]);
        } else {
            appendLine(`bash: ${cmd}: command not found`);
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