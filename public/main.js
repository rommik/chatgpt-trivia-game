document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card-inner');
    const flipButton = document.getElementById('flip-button');
  
    flipButton.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
  