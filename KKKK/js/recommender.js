const quizState = {
  tree: null,
  currentNodeId: 'root',
  history: [],
  answers: {}
};

async function initQuiz() {
  try {
    quizState.tree = await loadJSON('js/data/question-tree.json');
    renderNode('root');
  } catch (e) {
    document.getElementById('quiz-shell').innerHTML =
      '<p class="error-msg">Failed to load quiz data. Please refresh the page.</p>';
  }
}

function renderNode(nodeId) {
  const node = quizState.tree[nodeId];
  if (!node) return;

  if (node.type === 'result') {
    finalizeResult(node);
    return;
  }

  const totalDepth = 10;
  const currentDepth = node.depth || 5;
  const progress = Math.round(((totalDepth - currentDepth) / totalDepth) * 100);

  document.getElementById('progress-bar').style.width = progress + '%';
  document.getElementById('progress-label').textContent =
    `Step ${quizState.history.length + 1}`;

  document.getElementById('question-text').textContent = node.text;

  const container = document.getElementById('options-container');
  container.innerHTML = '';

  node.answers.forEach((answer, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer.text;
    btn.addEventListener('click', () => advanceQuiz(nodeId, idx, answer.next, answer.text));
    container.appendChild(btn);
  });

  const backBtn = document.getElementById('back-btn');
  backBtn.style.visibility = quizState.history.length > 0 ? 'visible' : 'hidden';
}

function advanceQuiz(fromNodeId, answerIndex, nextNodeId, answerText) {
  quizState.history.push({ nodeId: fromNodeId, answerIndex });
  quizState.answers[fromNodeId] = answerText;
  quizState.currentNodeId = nextNodeId;
  renderNode(nextNodeId);
}

function backQuiz() {
  if (quizState.history.length === 0) return;
  const prev = quizState.history.pop();
  delete quizState.answers[quizState.currentNodeId];
  quizState.currentNodeId = prev.nodeId;
  renderNode(prev.nodeId);
}

function finalizeResult(node) {
  const resultData = {
    topSpecialties: node.scores,
    primary: node.primary,
    answers: quizState.answers
  };
  saveSession('recommender-result', resultData);
  window.location.href = 'results-recommender.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  document.getElementById('back-btn').addEventListener('click', backQuiz);
});
