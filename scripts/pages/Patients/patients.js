let database = {
  patients: [
    {
      id: 1,
      patientCPF: '193.849.299-10',
      patientName: 'Mark Joe Otto Miller',
      patientBirthdate: '1993-08-14',
      patientMother: 'Margareth Adeline Miller',
      patientGender: 'Male',
      patientPhone: '+55 (31) 95553-3010'
    },
    {
      id: 2,
      patientCPF: '192.009.109-20',
      patientName: 'Josh Murray Garcia Júnior',
      patientBirthdate: '1985-12-05',
      patientMother: 'Maria Garcia',
      patientGender: 'Male',
      patientPhone: '+55 (43) 94110-2200'
    },
    {
      id: 3,
      patientCPF: '192.009.109-20',
      patientName: 'Angela Wilson Johnson',
      patientBirthdate: '1999-09-03',
      patientMother: 'Phoebe Wilson Johnson',
      patientGender: 'Female',
      patientPhone: '+55 (43) 94110-2200'
    }
  ]
};

const refreshPatientsTable = () => {
  const displayPatients = document.getElementById('display-patients-container');
  const feedbackContainer = document.getElementById('patients-feedback');

  if (displayPatients) {
    if (!database.patients.length) {
      feedbackContainer.innerHTML = `
        <h5>Patients</h5>
        <p class="text-muted small">You do not have registered patients.</p>
      `;
      return displayPatients.innerHTML = ``;
    }

    feedbackContainer.innerHTML = `
      <h5>Patients</h5>
      <p class="text-muted small">Currently you have 3 patients.</p>
    `;

    return displayPatients.innerHTML = getResultTable();
  }

  return null;
};

const handleSubmit = (elements) => {
  const data = [...elements].map((element) => {
    if (element.type === 'radio') {      
      if (element.checked) {
        return {
          name: element.name,
          value: element.id,
        };
      } else return undefined;
    }

    return {
      name: element.name,
      value: element.value,
    };
  }).filter((el) => el);

  console.log('submitted:', data);
};

const getPatientForm = (form, data = {}, mode) => {
  if (form) {
    form.innerHTML = `
      <div>
        <label for="patientCPF">CPF:</label>
        <input
          type="text"
          name="patientCPF"
          id="patientCPF"
          placeholder="CPF"
          class="form-control"
          required
          value="${data.patientCPF || ''}"
        />
      </div>

      <div class="mt-3">
        <label for="patientName">Name:</label>
        <input
          type="text"
          name="patientName"
          id="patientName"
          placeholder="Name"
          class="form-control"
          required
          value="${data.patientName || ''}"
        />
      </div>

      <div class="mt-3">
        <label for="patientBirthdate">Birthdate:</label>
        <input
          type="date"
          name="patientBirthdate"
          id="patientBirthdate"
          placeholder="Birthdate"
          class="form-control"
          required
          value="${data.patientBirthdate || ''}"
        />
      </div>

      <div class="mt-3">
        <label for="patientMother">Mother's Name:</label>
        <input
          type="text"
          name="patientMother"
          id="patientMother"
          placeholder="Mother's name"
          class="form-control"
          required
          value="${data.patientMother || ''}"
        />
      </div>

      ${mode !== 'view' ? (`
        <div id="patient-gender-container" class="mt-3">
          <input type="radio" id="male" name="patientGender" value="male">
          <label for="male">Male</label><br>
          <input type="radio" id="female" name="patientGender" value="female">
          <label for="female">Female</label><br>
          <input type="radio" id="other" name="patientGender" value="other">
          <label for="other">Other</label>
        </div>
      `) : (`
        <div class="mt-3">
          <label>Gender:</label>
          <input
            type="text"
            class="form-control"
            value="${data.patientGender || ''}"
            disabled
          />
        </div>
      `)}

      <div class="mt-3">
        <label for="patientPhone">Phone:</label>
        <input
          type="text"
          name="patientPhone"
          id="patientPhone"
          placeholder="Phone"
          class="form-control"
          required
          value="${data.patientPhone || ''}"
        />
      </div>
    `;
  }

  const saveButton = document.getElementById('include-patient-save-button');
  const modalFooter = document.getElementById('include-patient-modal-footer');

  if (mode === 'view') {
    if (modalFooter && saveButton) modalFooter.removeChild(saveButton);

    return true;
  }

  if (form && modalFooter && !saveButton) {
    const newSaveButton = document.createElement('button');
    const gender = document.getElementById('patient-gender-container');

    newSaveButton.setAttribute('type', 'button');
    newSaveButton.setAttribute('id', 'include-patient-save-button');
    newSaveButton.setAttribute('class', 'btn btn-primary');
    newSaveButton.addEventListener('click', () => handleSubmit(form.elements, gender));
    newSaveButton.innerText = 'Save';
    modalFooter.appendChild(newSaveButton);
  }

  return true;
};

const initOnChangeEvents = () => {
  const patientCPF = document.getElementById('patientCPF');
  const patientName = document.getElementById('patientName');
  const patientBirthdate = document.getElementById('patientBirthdate');
  const patientMother = document.getElementById('patientMother');
  const patientPhone = document.getElementById('patientPhone');

  const onChangeCPF = (e) => {
    e.preventDefault();
  };

  const onChangeName = (e) => {
    e.preventDefault();
  };

  const onChangeBirthdate = (e) => {
    e.preventDefault();
  };

  const onChangeMother = (e) => {
    e.preventDefault();
  };

  // const onChangeGender = (e) => {
    // e.preventDefault();
  // };

  const onChangePhone = (e) => {
    e.preventDefault();
  };

  patientCPF.addEventListener('change', onChangeCPF);
  patientName.addEventListener('change', onChangeName);
  patientBirthdate.addEventListener('change', onChangeBirthdate);
  patientMother.addEventListener('change', onChangeMother);
  // patientGender.addEventListener('change', onChangeGender);
  patientPhone.addEventListener('change', onChangePhone);
};

const viewRecord = (id) => {
  const form = document.getElementById('include-patient-form');
  const data = database.patients.find((patient) => patient.id === id);
  
  getPatientForm(form, data, 'view');
  setFieldIsDisable(true);
};

const setFieldIsDisable = (value) => {
  const form = document.getElementById('include-patient-form');

  if (form) {
    [...form.children].forEach((child) => {
      [...child.children].filter((item) => item.localName === 'input')
        .forEach((subChild) => {
          if (value) subChild.setAttribute('disabled', true);
          else subChild.removeAttribute('disabled');
        });
    });
  }
};

const editRecord = (id) => {
  console.log('clicked to edit:', id);
};

const deleteRecord = (id) => {
  console.log('clicked to delete:', id);

  database.patients = database.patients.filter((record) => record.id !== id);

  return refreshPatientsTable();
};

const onClickIncludePatient = () => {
  const form = document.getElementById('include-patient-form');

  setFieldIsDisable(false);
  getPatientForm(form);
};

const getActionsTable = (record) => {
  return (`
    <div class="d-flex">
      <span
        title="View patient data"
        id="action-view-patient-${record}"
        data-toggle="modal"
        data-target="#addPatient"
        onclick="viewRecord(${record})"
      >
        <svg
          cursor="pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#3d7ed3"
          class="bi bi-search mr-3"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </span>

      <span
        title="Edit patient data"
        id="action-edit-patient-${record}"
        onclick="editRecord(${record})"
      >
        <svg
          cursor="pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ffae00"
          class="bi bi-pencil-fill mr-3"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
      </span>

      <span
        title="Delete patient"
        id="action-delete-patient-${record}"
        onclick="deleteRecord(${record})"
      >
        <svg
          cursor="pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ff3655"
          class="bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
      </span>
    </div>
  `);
};

const getResultTable = () => (`
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th scope="col">CPF</th>
        <th scope="col">Name</th>
        <th scope="col">Birthdate</th>
        <th scope="col">Gender</th>
        <th scope="col">Phone</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      ${database.patients.map((patient) => (
        `<tr>
          <td>${patient.patientCPF}</td>
          <td>${patient.patientName}</td>
          <td>${patient.patientBirthdate}</td>
          <td>${patient.patientGender}</td>
          <td>${patient.patientPhone}</td>
          <td>${getActionsTable(patient.id)}</td>
        </tr>`
      )).join('')}
    </tbody>
  </table>
`);

const Patient = () => {
  const form = document.getElementById('include-patient-form');

  // initOnChangeEvents();
  refreshPatientsTable();
  getPatientForm(form);
};

window.Patient = Patient();
