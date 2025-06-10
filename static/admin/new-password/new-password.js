(() => {
    const formSelector = document.querySelector('#form-new-password');
    const message = document.querySelector('p[data-message]');

    const formEvent = (event) => {
        event.preventDefault();
        const passwordValue = event.target.elements.password.value;
        // console.log(event);
        // console.log(event.target.elements.password.value);
        // console.log(event.target.elements['password-repeat'].value);
        if (passwordValue !== event.target.elements['password-repeat'].value) {
            message.innerHTML = 'PASSWORDS DON\'T MATCH';
            message.classList.replace('message-good', 'message-wrong')
        } else {
            message.innerHTML = 'PASSWORDS MATCH';
            message.classList.replace('message-wrong', 'message-good');
        }

    };
    formSelector.addEventListener('submit', formEvent);



})()