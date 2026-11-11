const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const count = document.getElementById('count');
const themeBtn = document.getElementById('theme');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
if (localStorage.getItem('dark') === '1') document.body.classList.add('dark');

function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

function render() {
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');
    const span = document.createElement('span');
    span.textContent = t.text;
    span.onclick = () => { t.done = !t.done; save(); render(); };
    const del = document.createElement('button');
    del.textContent = '✕';
    del.className = 'del';
    del.onclick = () => { tasks.splice(i, 1); save(); render(); };
    li.append(span, del);
    list.appendChild(li);
  });
  const left = tasks.filter(t => !t.done).length;
  count.textContent = `${left} tâche(s) restante(s)`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  save(); render();
});

themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark', document.body.classList.contains('dark') ? '1' : '0');
};

render();
