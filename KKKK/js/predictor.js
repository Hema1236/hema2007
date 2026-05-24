const ADVICE = {
  step1: {
    weak: 'Your Step 1 score is below average for this specialty. If retaking is still an option, a higher score significantly strengthens your application.',
    missing: 'Step 1 is Pass/Fail for many schools, but this specialty still strongly prefers a numeric score. Providing a numeric score where available is advantageous.'
  },
  step2: {
    weak: 'Retaking Step 2 CK should be a priority. A score above the specialty average meaningfully improves your odds — it is the single most improvable factor on your application.',
    very_weak: 'Your Step 2 score is significantly below this specialty\'s threshold. Retaking Step 2 CK before applying is strongly recommended.'
  },
  research: {
    weak: 'This specialty values research. Even 1–2 publications or a case report can distinguish your application. Seek projects through your current or past institutions.',
    missing: 'You have no listed research. For this specialty, adding at least one publication or poster presentation before applications open would be high-impact.'
  },
  presentations: {
    weak: 'Presenting at regional or national conferences signals academic engagement. Aim for at least one abstract submission.',
    missing: 'No presentations listed. Even a poster at a regional meeting adds value to an IMG application in this specialty.'
  },
  rotations: {
    weak: 'US clinical rotations are critical for IMGs — they provide letters, exposure, and credibility with program directors. Obtain at least 2 targeted rotations in this specialty.',
    missing: 'You have no US clinical rotations listed. This is the most important gap to address. Program directors need to see you perform in a US clinical setting before ranking you.',
    very_weak: 'Only 1 rotation listed. Try to secure at least 1 more rotation specifically in your target specialty — sub-internships carry the most weight.'
  },
  lors: {
    weak: 'Fewer than 3 strong letters is a concern for most programs. Prioritize obtaining a letter from a US-based physician in your target specialty.',
    missing: 'No letters listed. Strong LORs — especially from US faculty who know your work directly — are among the highest-weighted factors for IMG applicants.'
  },
  experience: {
    weak: 'Less than 1 year of clinical experience after medical school is on the lower end. Additional clinical exposure — even as a researcher or observer — helps bridge this gap.',
    missing: 'No post-graduation clinical experience listed. Programs value evidence of continued clinical engagement. Document any clinical work, even informal or international.'
  }
};

let specialtyData = null;

function normalizeStep1(score, passFail, spec) {
  if (passFail) {
    return spec.step1PassFailAccepted ? 0.45 : 0.10;
  }
  if (score < spec.step1Min) return clamp((score - (spec.step1Min - 20)) / 20, 0, 0.15);
  return clamp((score - spec.step1Min) / (spec.step1Top - spec.step1Min), 0, 1);
}

function normalizeStep2(score, spec) {
  if (!score) return 0;
  if (score < spec.step2Min) return clamp((score - (spec.step2Min - 20)) / 20, 0, 0.15);
  return clamp((score - spec.step2Min) / (spec.step2Top - spec.step2Min), 0, 1);
}

function normalizeCount(value, avg, top) {
  if (value <= 0) return 0;
  if (value <= avg) return clamp(value / avg * 0.5, 0, 0.5);
  return clamp(0.5 + (value - avg) / (top - avg) * 0.5, 0, 1);
}

function imgTypeBonus(imgType, spec) {
  if (imgType === 'usimg') return spec.weights.imgType * 1.0;
  return spec.weights.imgType * 0.2;
}

function labelFactor(score) {
  if (score >= 0.75) return 'Strong';
  if (score >= 0.50) return 'Average';
  if (score >= 0.20) return 'Weak';
  return 'Below Threshold';
}

function labelClass(score) {
  if (score >= 0.75) return 'strong';
  if (score >= 0.50) return 'average';
  if (score >= 0.20) return 'weak';
  return 'missing';
}

function getAdvice(factors) {
  const bullets = [];
  const { step1, step2, research, presentations, rotations, lors, experience } = factors;

  if (step1.score < 0.20 && !factors.step1IsPassFail) bullets.push(ADVICE.step1.weak);
  if (factors.step1IsPassFail) bullets.push(ADVICE.step1.missing);
  if (step2.score < 0.10) bullets.push(ADVICE.step2.very_weak);
  else if (step2.score < 0.40) bullets.push(ADVICE.step2.weak);
  if (research.score === 0) bullets.push(ADVICE.research.missing);
  else if (research.score < 0.40) bullets.push(ADVICE.research.weak);
  if (presentations.score === 0) bullets.push(ADVICE.presentations.missing);
  else if (presentations.score < 0.35) bullets.push(ADVICE.presentations.weak);
  if (rotations.score === 0) bullets.push(ADVICE.rotations.missing);
  else if (rotations.score < 0.25) bullets.push(ADVICE.rotations.very_weak);
  else if (rotations.score < 0.50) bullets.push(ADVICE.rotations.weak);
  if (lors.score === 0) bullets.push(ADVICE.lors.missing);
  else if (lors.score < 0.40) bullets.push(ADVICE.lors.weak);
  if (experience.score < 0.20) bullets.push(ADVICE.experience.weak);

  if (bullets.length === 0) {
    bullets.push('Your profile is strong across all evaluated dimensions. Focus on personalizing your personal statement and securing audition rotations at your target programs.');
    bullets.push('Consider applying broadly within your specialty — including community programs — to maximize your chances of matching.');
  }

  return bullets.slice(0, 5);
}

function computeResult(formData, spec) {
  const s1 = normalizeStep1(formData.step1Score, formData.step1PassFail, spec);
  const s2 = normalizeStep2(formData.step2Score, spec);
  const res = normalizeCount(formData.research, spec.researchAvg, spec.researchTop);
  const pres = normalizeCount(formData.presentations, spec.presentationsAvg, spec.presentationsTop);
  const rot = normalizeCount(formData.rotations, spec.rotationsAvg, spec.rotationsTop);
  const lor = normalizeCount(formData.lors, spec.lorsAvg, spec.lorsTop);
  const exp = normalizeCount(formData.experience, spec.experienceAvg, spec.experienceTop);
  const imgBonus = imgTypeBonus(formData.imgType, spec);

  const w = spec.weights;
  const rawScore =
    s1 * w.step1 +
    s2 * w.step2 +
    res * w.research +
    pres * w.presentations +
    rot * w.rotations +
    lor * w.lors +
    exp * w.experience +
    imgBonus;

  const basePercent = clamp(rawScore * 100, 5, 95);
  const low = Math.max(5, Math.round(basePercent - 6));
  const high = Math.min(95, Math.round(basePercent + 6));

  const factors = {
    step1: { score: s1, label: labelFactor(s1), cls: labelClass(s1), name: 'USMLE Step 1' },
    step2: { score: s2, label: labelFactor(s2), cls: labelClass(s2), name: 'USMLE Step 2 CK' },
    research: { score: res, label: labelFactor(res), cls: labelClass(res), name: 'Research Publications' },
    presentations: { score: pres, label: labelFactor(pres), cls: labelClass(pres), name: 'Presentations & Abstracts' },
    rotations: { score: rot, label: labelFactor(rot), cls: labelClass(rot), name: 'US Clinical Rotations' },
    lors: { score: lor, label: labelFactor(lor), cls: labelClass(lor), name: 'Letters of Recommendation' },
    experience: { score: exp, label: labelFactor(exp), cls: labelClass(exp), name: 'Clinical Experience' },
    step1IsPassFail: formData.step1PassFail
  };

  return {
    low,
    high,
    midpoint: Math.round((low + high) / 2),
    factors,
    advice: getAdvice(factors),
    specialty: formData.specialty,
    spec: {
      medianMatchedStep2IMG: spec.medianMatchedStep2IMG,
      medianMatchedStep2USSenior: spec.medianMatchedStep2USSenior,
      step2Avg: spec.step2Avg,
      imgMatchRate: Math.round(spec.imgMatchRate * 100),
      competitivenessLevel: spec.competitivenessLevel
    },
    applicantStep2: formData.step2Score
  };
}

function showError(fieldId, msg) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  let err = el.parentElement.querySelector('.field-error');
  if (!err) {
    err = document.createElement('span');
    err.className = 'field-error';
    el.parentElement.appendChild(err);
  }
  err.textContent = msg;
  el.classList.add('input-error');
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.remove());
  document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
}

function collectForm() {
  const step1Type = document.querySelector('input[name="step1Type"]:checked')?.value;
  const step1Score = parseInt(document.getElementById('step1Score')?.value, 10);
  const step2Score = parseInt(document.getElementById('step2Score').value, 10);
  const research = parseInt(document.getElementById('research').value, 10);
  const presentations = parseInt(document.getElementById('presentations').value, 10);
  const rotations = parseInt(document.getElementById('rotations').value, 10);
  const lors = parseInt(document.getElementById('lors').value, 10);
  const experience = parseFloat(document.getElementById('experience').value);
  const imgType = document.getElementById('imgType').value;
  const specialty = document.getElementById('specialty').value;

  clearErrors();
  let valid = true;

  if (!step1Type) { showError('step1TypeGroup', 'Please select Step 1 type'); valid = false; }
  if (step1Type === 'numeric' && (!step1Score || step1Score < 140 || step1Score > 300)) {
    showError('step1Score', 'Enter a score between 140 and 300'); valid = false;
  }
  if (!step2Score || step2Score < 140 || step2Score > 300) {
    showError('step2Score', 'Enter a Step 2 score between 140 and 300'); valid = false;
  }
  if (isNaN(research) || research < 0) { showError('research', 'Enter 0 or more'); valid = false; }
  if (isNaN(presentations) || presentations < 0) { showError('presentations', 'Enter 0 or more'); valid = false; }
  if (isNaN(rotations) || rotations < 0) { showError('rotations', 'Enter 0 or more'); valid = false; }
  if (isNaN(lors) || lors < 0 || lors > 10) { showError('lors', 'Enter between 0 and 10'); valid = false; }
  if (isNaN(experience) || experience < 0) { showError('experience', 'Enter 0 or more'); valid = false; }
  if (!imgType) { showError('imgType', 'Please select IMG type'); valid = false; }
  if (!specialty) { showError('specialty', 'Please select a specialty'); valid = false; }

  if (!valid) return null;

  return {
    step1PassFail: step1Type === 'passfail',
    step1Score: step1Type === 'numeric' ? step1Score : null,
    step2Score,
    research,
    presentations,
    rotations,
    lors,
    experience,
    imgType,
    specialty
  };
}

async function initPredictor() {
  try {
    specialtyData = await loadJSON('js/data/specialties.json');
    const select = document.getElementById('specialty');
    Object.keys(specialtyData).forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });

    const params = new URLSearchParams(window.location.search);
    const preselect = params.get('specialty');
    if (preselect && specialtyData[preselect]) {
      select.value = preselect;
    }
  } catch (e) {
    console.error('Failed to load specialty data', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPredictor();

  document.querySelectorAll('input[name="step1Type"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const scoreWrap = document.getElementById('step1ScoreWrap');
      scoreWrap.style.display = radio.value === 'numeric' ? 'block' : 'none';
    });
  });

  document.getElementById('predictor-form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = collectForm();
    if (!formData) return;

    const spec = specialtyData[formData.specialty];
    const result = computeResult(formData, spec);
    saveSession('predictor-result', result);
    window.location.href = 'results-predictor.html';
  });
});
