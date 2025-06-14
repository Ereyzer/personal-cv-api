(() => {
    const TOKEN = window.location.href.split('/').reverse()[0];
    console.log(TOKEN);
    console.log(window.location);

    const formSelector = document.querySelector('#form-new-password');
    formSelector.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const message = document.querySelector('p[data-message]');

    const inputsCheck = (passwordValue, passwordRepeat) => {
        if (passwordValue !== passwordRepeat) {
            message.innerHTML = 'PASSWORDS DON\'T MATCH';
            message.classList.replace('message-good', 'message-wrong')
            return false;
        } else if (passwordValue.length === 0) {
            message.innerHTML = 'Please entry some value';
            message.classList.replace('message-good', 'message-wrong');
            return false;
        } else if (passwordValue.length < 8) {
            message.innerHTML = 'PASSWORD TO SHORT';
            message.classList.replace('message-good', 'message-wrong');
            return false;
        } else if (passwordValue.length > 30) {
            message.innerHTML = 'PASSWORD TO long';
            message.classList.replace('message-good', 'message-wrong');
            return false;
        } else {
            message.innerHTML = 'PASSWORDS MATCH';
            message.classList.replace('message-wrong', 'message-good');
            return true;
        }
    };

    const formEvent = (event) => {
        const passwordValue = event.target.elements.password.value;
        const link = `${window.location.origin}${window.location.pathname}`;

        fetch(link, {
            body: JSON.stringify({ password: passwordValue }),
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: 'text/html'
            }
        }).then(response => {
            const text = response.text();
            console.log(response);
            console.log(text);
            return text;
        }).then(res => {
            console.log(res);
            document.body.innerHTML = res;

        })
    };


    const editEvent = (event) => {
        if (event.target.nodeName !== 'INPUT') return;
        if (!inputsCheck(formSelector.children[1].value, formSelector.children[2].value)) {
            formSelector.removeEventListener('submit', formEvent);
            return
        };
        formSelector.addEventListener('submit', formEvent);
    };
    formSelector.addEventListener('input', editEvent);


})();