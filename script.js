// ⚠️ Remplacer par l'URL de ton Google Apps Script Web App (voir README.md)
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwwaSYxQpzxWlORB73FJfx54mVgUqcKV6MVJTvAeTdnqE3bGo7fd1ffC1c2dwKRxpU5qQ/exec";

const params = new URLSearchParams(window.location.search);
const chapterId = params.get('chapter');

const idForm = document.getElementById('id-form');
const quizForm = document.getElementById('quiz-form');
const questionsContainer = document.getElementById('questions-container');
const resultBanner = document.getElementById('result-banner');
const chapterTitleEl = document.getElementById('chapter-title');
const submitBtn = document.getElementById('submit-btn');
const statusMsg = document.getElementById('status-msg');

let chapterData = null;
let studentName = '';
let studentClasse = '';

if (!chapterId) {
  questionsContainer.innerHTML = '<p>Aucun chapitre sélectionné. Retourne à l\'accueil.</p>';
} else {
  fetch(`chapters/${chapterId}.json`)
    .then(r => {
      if (!r.ok) throw new Error('not found');
      return r.json();
    })
    .then(data => {
      chapterData = data;
      chapterTitleEl.textContent = `Ch. ${data.number} — ${data.title}`;
      document.title = `Quiz — ${data.title}`;
    })
    .catch(() => {
      chapterTitleEl.textContent = 'Chapitre introuvable';
    });
}

idForm.addEventListener('submit', (e) => {
  e.preventDefault();
  studentName = document.getElementById('student-name').value.trim();
  studentClasse = document.getElementById('student-classe').value.trim();
  if (!studentName || !studentClasse || !chapterData) return;

  idForm.style.display = 'none';
  renderQuestions();
  quizForm.style.display = 'block';
});

function renderQuestions() {
  questionsContainer.innerHTML = '';
  chapterData.questions.forEach((q, i) => {
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <h3>${i + 1}. ${q.question}</h3>
      <div class="choices" data-qindex="${i}">
        ${q.choices.map((c, ci) => `
          <label class="choice">
            <input type="radio" name="q${i}" value="${ci}" required>
            <span>${c}</span>
          </label>
        `).join('')}
      </div>
    `;
    questionsContainer.appendChild(block);
  });
}

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let score = 0;

  chapterData.questions.forEach((q, i) => {
    const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
    const choiceLabels = questionsContainer
      .querySelectorAll(`.choices[data-qindex="${i}"] .choice`);

    choiceLabels.forEach((label, ci) => {
      label.querySelector('input').disabled = true;
      if (ci === q.answer) label.classList.add('correct');
      if (selected && parseInt(selected.value) === ci && ci !== q.answer) {
        label.classList.add('incorrect');
      }
    });

    if (selected && parseInt(selected.value) === q.answer) score++;

    const expl = document.createElement('p');
    expl.className = 'explanation';
    expl.textContent = q.explanation || '';
    questionsContainer.querySelectorAll('.question-block')[i].appendChild(expl);
  });

  const total = chapterData.questions.length;
  submitBtn.disabled = true;

  resultBanner.style.display = 'block';
  resultBanner.innerHTML = `
    <div class="score-banner">
      <p>Score de ${studentName} (${studentClasse})</p>
      <div class="score">${score} / ${total}</div>
    </div>
  `;

  sendResult({
    nom: studentName,
    classe: studentClasse,
    chapitre: chapterData.title,
    chapitreId: chapterId,
    score: score,
    total: total,
    date: new Date().toISOString()
  });
});

function sendResult(payload) {
  if (WEBHOOK_URL.includes('REMPLACER_PAR_TON_ID')) {
    statusMsg.textContent = "Résultat non envoyé : l'URL du webhook n'est pas encore configurée (voir README).";
    return;
  }
  fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  })
    .then(() => { statusMsg.textContent = 'Résultat envoyé.'; })
    .catch(() => { statusMsg.textContent = "Échec de l'envoi du résultat (vérifie ta connexion)."; });
}
