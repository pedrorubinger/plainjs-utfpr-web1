const Menu = function () {
  const initMenu = (pageContainer, name) => {
    if (!pageContainer) return null;

    const menu = document.createElement('div');

    menu.setAttribute('id', 'dashboard-menu');
    menu.innerHTML = `
      <nav class="w-100">
        <ul class="d-flex justify-content-center align-items-center w-100">
          <li class="${name === 'patients' ? 'active' : 'mn-item'}">
            <a
              href="../Patients/patients.html"
              title="Click to manage your patients"
            >
              Patients
            </a>
          </li>
          <li class="${name === 'appointments' ? 'active' : 'mn-item'}">
            <a
              id="appointments-menu-link"
              href="../Appointments/appointments.html"
              title="Click to manage your appointments"
            >
              Appointments
            </a>
          </li>
          <li>
            <a href="../../../index.html" title="Click to logout">Logout</a>
          </li>
        </ul>
      </nav>
    `;

    pageContainer.insertBefore(menu, pageContainer.firstChild);
  };

  return initMenu;
};

window.Menu = Menu();
