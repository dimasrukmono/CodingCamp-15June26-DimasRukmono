// --- TANTANGAN 1 & 2: GREETING & CUSTOM NAME ---
let userName = localStorage.getItem('userName');
if (!userName) {
    userName = prompt("Selamat datang! Siapa namamu?") || "Student";
    localStorage.setItem('userName', userName);
}

function updateTime() {
    const now = new Date();
    document.getElementById('time-display').textContent = now.toLocaleTimeString('en-US', { hour12: false });
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('en-US', options);
    
    const hour = now.getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    
    // Menampilkan sapaan beserta nama
    document.getElementById('greeting-message').textContent = `${greeting}, ${userName}!`;
}
setInterval(updateTime, 1000);
updateTime();

// --- TANTANGAN 3: LIGHT / DARK MODE ---
const isDark = localStorage.getItem('darkMode') === 'true';
if (isDark) document.body.classList.add('dark-mode');

document.getElementById('btn-theme').onclick = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// --- FOCUS TIMER ---
let timeLeft = 1500; 
let timerInterval;

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').textContent = `${m}:${s}`;
}

document.getElementById('btn-start').onclick = () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (timeLeft > 0) { timeLeft--; updateTimerDisplay(); } 
            else { clearInterval(timerInterval); alert("Waktu fokus selesai!"); }
        }, 1000);
    }
};

document.getElementById('btn-stop').onclick = () => {
    clearInterval(timerInterval); timerInterval = null;
};

document.getElementById('btn-reset').onclick = () => {
    clearInterval(timerInterval); timerInterval = null; timeLeft = 1500; updateTimerDisplay();
};

// --- TO-DO LIST (Dengan Tantangan Mencegah Duplikat) ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task}</span><button class="btn-delete" onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('btn-add-task').onclick = () => {
    const input = document.getElementById('task-input');
    const newTask = input.value.trim();
    
    if (newTask !== '') {
        // TANTANGAN: Cek Duplikat
        if (tasks.includes(newTask)) {
            alert("Tugas ini sudah ada di daftarmu!");
        } else {
            tasks.push(newTask);
            input.value = '';
            renderTasks();
        }
    }
};

window.deleteTask = (index) => { tasks.splice(index, 1); renderTasks(); };
renderTasks();

// --- QUICK LINKS ---
let links = JSON.parse(localStorage.getItem('links')) || [];

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.url; a.target = '_blank'; a.className = 'link-btn'; a.textContent = link.name;
        container.appendChild(a);
    });
    localStorage.setItem('links', JSON.stringify(links));
}

document.getElementById('btn-add-link').onclick = () => {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    if (nameInput.value.trim() !== '' && urlInput.value.trim() !== '') {
        let url = urlInput.value.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
        links.push({ name: nameInput.value.trim(), url: url });
        nameInput.value = ''; urlInput.value = ''; renderLinks();
    }
};
renderLinks();