const button = document.getElementById('button');

function login() {
  const inputEmail = document.getElementById('email');
  const inputSenha = document.getElementById('senha');
  if (inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
button.addEventListener('click', login);

const getFinalSubmitButton = document.getElementById('submit-btn');
getFinalSubmitButton.disabled = true;

function confirmeButton() {
  const acepptCheckbox = document.getElementById('agreement');
  if (acepptCheckbox.checked) {
    getFinalSubmitButton.disabled = false;
  } else {
    getFinalSubmitButton.disabled = true;
  }
}
const agreed = document.getElementById('agreement');
agreed.addEventListener('click', confirmeButton);
