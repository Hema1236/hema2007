async function loadJSON(path) {
  if (path.includes('specialties') && typeof SPECIALTIES_DATA !== 'undefined') {
    return SPECIALTIES_DATA;
  }
  if (path.includes('question-tree') && typeof QUESTION_TREE !== 'undefined') {
    return QUESTION_TREE;
  }
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

function saveSession(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function loadSession(key) {
  const raw = sessionStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNav);
