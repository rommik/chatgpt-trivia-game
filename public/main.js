document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.card-inner').addEventListener('transitionend', function () {
        console.log('rotation ended');
        if (this.style.transform === 'rotateY(180deg)') {
            document.querySelector('.feedback').style.display = 'flex';
        } else {
            document.querySelector('.feedback').style.display = 'none';
        }
    });

    document.querySelector('.card-inner').addEventListener('click', function () {
        if (this.style.transform !== 'rotateY(180deg)')
            toggleCard(this);

    });

    document.getElementById('smile-button').addEventListener('click', function () {
        postAnswer(document.querySelector('.feedback-question-id').innerHTML, true);

    });
    document.getElementById('frown-button').addEventListener('click', function () {
        postAnswer(document.querySelector('.feedback-question-id').innerHTML, false);
    });


    // Function to fetch a random question from the server
    const fetchQuestion = () => {
        const questionText = document.querySelector('.card-front');
        const answerText = document.querySelector('.card-back');
        const hiddenQuestionId = document.querySelector('.feedback-question-id');
        fetch('/api/getQuestion')
            .then((response) => response.json())
            .then((data) => {
                questionText.innerText = data.question;
                answerText.innerText = data.answer;
                hiddenQuestionId.innerText = data.id;
            })
            .catch((error) => console.error('Error fetching question:', error));
    };

    const postAnswer = (questionId, userAnswer) => {
        console.log(questionId, userAnswer);
        fetch('/api/answerQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questionId, userAnswer }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // Initial fetch of a random question
                fetchQuestion();

                const cardInner = document.querySelector('.card-inner');
                toggleCard(cardInner);
            })
            .catch((error) => console.error('Error posting answer:', error));
    };

    // Initial fetch of a random question
    fetchQuestion();


});


function toggleCard(cardInner) {
    console.log(cardInner);
    cardInner.style.transform = cardInner.style.transform === 'rotateY(0deg)' ? 'rotateY(180deg)' : /*do nothing*/ 'rotateY(0deg)';
}

