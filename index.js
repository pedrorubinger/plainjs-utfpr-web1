const credentials = [
  { id: 1, username: 'pedrorubinger', password: 'pedro' },
];

const addAlert = (form) => {
  const alert = document.getElementById('login-invalid-alert');

  if (!form || alert) return null;

  const firstFormGroup = document.getElementById('username-form-group');
  const div = document.createElement('div');
  const message = document.createTextNode('Your credentials are not valid!');

  div.setAttribute('id', 'login-invalid-alert');
  div.classList.add('alert', 'alert-danger', 'w-100');
  div.setAttribute('role', 'alert');
  div.appendChild(message);  

  form.insertBefore(div, firstFormGroup);
  return true;
};

const removeAlert = (form) => {
  const alert = document.getElementById('login-invalid-alert');

  if (alert) {
    form.removeChild(alert);
  }

  return true;
};

const checkCredentials = (username, password) => (
  credentials.some(
    (credential) =>
      credential.username === username && credential.password === password
  )
);

const Login = () => {
  const form = document.getElementById('login-form');
  const username = document.getElementById('login-username');
  const password = document.getElementById('login-password');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
      if ((!username || !password) || (username && !username.value) || (password && !password.value)) {
        throw new Error();
      }

      if (checkCredentials(username.value, password.value)) {
        removeAlert(form);
        window.location.href = './scripts/pages/Dashboard/dashboard.html';
      } else {
        throw new Error();
      }
    } catch (error) {
      addAlert(form);
    }
  });
}

Login();
