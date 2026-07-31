document.getElementById('add-btn').addEventListener('click', addRow);
document.getElementById('calc-btn').addEventListener('click', calculateGrade);

function addRow() {
  const container = document.getElementById('course-rows');
  const newRow = document.createElement('div');
  newRow.className = 'row';

  newRow.innerHTML = `
    <input type="text" placeholder="Assignment / Exam" class="assignment-name">
    <input type="number" placeholder="Grade (%)" class="grade-input" min="0" max="100">
    <input type="number" placeholder="Weight (%)" class="weight-input" min="0" max="100">
    <button class="remove-btn" onclick="removeRow(this)">✕</button>
  `;

  container.appendChild(newRow);
}

function removeRow(btn) {
  const rows = document.querySelectorAll('.row');
  
  if (rows.length > 1) {
    btn.parentElement.remove();
  } else {
    alert("You must keep at least one row.");
  }
}

function calculateGrade() {
  const rows = document.querySelectorAll('.row');
  let totalWeightedScore = 0;
  let totalWeight = 0;

  rows.forEach(row => {
    const gradeVal = parseFloat(row.querySelector('.grade-input').value);
    const weightVal = parseFloat(row.querySelector('.weight-input').value);

 valid numbers
    if (!isNaN(gradeVal) && !isNaN(weightVal)) {
      totalWeightedScore += gradeVal * (weightVal / 100);
      totalWeight += weightVal;
    }
  });

  const resultBox = document.getElementById('result-box');
  const finalScoreElem = document.getElementById('final-percentage');
  const letterGradeElem = document.getElementById('letter-grade');
  const warningElem = document.getElementById('weight-warning');

  if (totalWeight === 0) {
    alert("Please enter at least one valid grade and weight combination.");
    return;
  }

 
  const finalPercentage = (totalWeightedScore / (totalWeight / 100)).toFixed(2);

  finalScoreElem.textContent = `${finalPercentage}%`;
  letterGradeElem.textContent = getLetterGrade(finalPercentage);


  if (totalWeight !== 100) {
    warningElem.textContent = `Note: Total weight entered is ${totalWeight}%, not 100%. Grade calculated based on proportion.`;
  } else {
    warningElem.textContent = "";
  }

  resultBox.classList.remove('hidden');
}

function getLetterGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}
