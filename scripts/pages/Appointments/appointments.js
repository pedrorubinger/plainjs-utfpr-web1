let appointmentsDatabase = [
  {
    id: 1,
    patient: {
      patientId: 1,
      patientCPF: '193.849.299-10',
      patientName: 'Mark Joe Otto Miller'
    },
    appointmentDate: '2021-03-14',
    appointmentTime: '14:00',
    appointmentIsFollowUp: 'No',
    insurance: 'UniBed',
  },
];

const patientsList = localStorage.getItem('database') || [];

if (!localStorage.getItem('appointments')) {
  localStorage.setItem('appointments', JSON.stringify(appointmentsDatabase));
}

const insurancesList = [
  { id: 1, name: 'None' },
  { id: 2, name: 'UniBed' },
  { id: 3, name: 'Health' },
  { id: 4, name: 'Life' },
];

const getAppointmentsFromDatabase = () => {
  const data = localStorage.getItem('appointments');

  return JSON.parse(data);
};

const getResultTable = () => (`
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th scope="col">CPF</th>
        <th scope="col">Name</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Follow Up Visit</th>
        <th scope="col">Insurance</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      ${getAppointmentsFromDatabase().map((appointment) => (`
        <tr>
          <td>${appointment.patient?.patientCPF}</td>
          <td>${appointment.patient?.patientName}</td>
          <td>${appointment.appointmentDate}</td>
          <td>${appointment.appointmentTime}</td>
          <td>${appointment.appointmentIsFollowUp}</td>
          <td>${appointment.insurance}</td>
          <td>${getActionsTable(appointment.id)}</td>
        </tr>
      `)).join('')}
    </tbody>
  </table>
`);

const getActionsTable = (record) => {
  return (`
    <div class="d-flex">
      <span
        title="View appointment data"
        id="action-view-appointment-${record}"
        data-toggle="modal"
        data-target="#addAppointment"
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
        title="Edit appointment data"
        data-toggle="modal"
        data-target="#addAppointment"
        id="action-edit-appointment-${record}"
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
        title="Delete appointment"
        id="action-delete-appointment-${record}"
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

const handleSubmit = (elements, mode) => {
  const data = {};

  [...elements].forEach((element) => {
    console.log(element, element.name, element.value);
    if (element.type === 'radio') {
      if (element.checked) {
        return data[element.name] = element.id.charAt(0).toUpperCase() + element.id.slice(1);
      } else return;
    }

    data[element.name] = element.value;
    // return { name: element.name, value: element.value };
  });

  console.log('submitted:', data, mode);

  const hasEmptyFields = () => {
    let isEmpty = false;

    for(const key in data) {
      if(data[key] === "") {
        isEmpty = true;
        break;
      }
    }

    return isEmpty;
  };

  if (hasEmptyFields()) {
    return alert('You must fill in all fields!');
  } else {
    $('#addAppointment').modal('hide');
  }

  const db = getAppointmentsFromDatabase();

  if (mode === 'create') {
    if (db && db.length) {
      const last = db.find((value, i) => i === db.length - 1);

      if (last) db.push({ ...data, id: last.id + 1 });
    } else {
      db.push({ ...data, id: 1 });
    }

  } else if (mode === 'edit') {
    if (db && db.length) {
      const updatedDatabase = [...db].map((patient) => {
        if (patient.patientCPF === data.patientCPF) {
          return data;
        }

        return patient;
      });

      // console.log(db);
      db = updatedDatabase;
    }
  }

  localStorage.setItem('appointments', JSON.stringify(db));
  refreshAppointmentsTable();
};

const getPatientsFromDatabase = () => {
  const data = localStorage.getItem('database');

  if (data) return JSON.parse(data);
  return {
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
      },
    ],
  };
};

const setFieldIsDisable = (value) => {
  const form = document.getElementById('include-appointment-form');

  if (form) {
    [...form.children].forEach((child) => {
      [...child.children].filter((item) => ['input', 'select'].includes(item.localName))
        .forEach((subChild) => {
          if (value) subChild.setAttribute('disabled', true);
          else subChild.removeAttribute('disabled');
        });
    });
  }
};

const onClickIncludeAppointment = () => {
  const form = document.getElementById('include-appointment-form');

  setFieldIsDisable(false);
  getAppointmentsForm(form, {}, 'create');
};

const viewRecord = (id) => {
  const form = document.getElementById('include-appointment-form');
  const data = getAppointmentsFromDatabase().find((appointment) => appointment.id === id);

  getAppointmentsForm(form, data, 'view');
  setFieldIsDisable(true);
};

const editRecord = (id) => {
  const form = document.getElementById('include-appointment-form');
  const db = getAppointmentsFromDatabase();
  const data = db.find((appointment) => appointment.id === id);

  console.log('edit record:', id, data);

  getAppointmentsForm(form, data, 'edit');
  setFieldIsDisable(false);
};

const deleteRecord = (id) => {
  const db = getAppointmentsFromDatabase();

  db = db.filter((record) => record.id !== id);
  localStorage.setItem('appointments', JSON.stringify(db));

  return refreshAppointmentsTable();
};

const getAppointmentsForm = (form, data = {}, mode) => {
  if (form) {
    form.innerHTML = `
      <div>
        <label for="patient">Patient:</label>
        ${['edit', 'view'].includes(mode)
            ? (`
              <input
                type="text"
                name="patient"
                id="patient"
                class="form-control"
                value="${data.patient.patientName}"
                readonly
                disabled
              />
            `) : (`
              <select name="patient" id="patient" class="form-control">
                ${getPatientsFromDatabase().patients.map((patient) => (`
                  <option value="${patient.patientCPF}">
                    ${patient.patientName}
                  </option>
                `))}
              </select>
            `)
        }
      </div>

      <div class="mt-3">
        <label for="appointmentDate">Date:</label>
        <input
          type="date"
          name="appointmentDate"
          id="appointmentDate"
          placeholder="Name"
          class="form-control"
          required
          value="${data.appointmentDate || ''}"
        />
      </div>

      <div class="mt-3">
        <label for="appointmentTime">Time:</label>
        <input
          type="time"
          name="appointmentTime"
          id="appointmentTime"
          placeholder="Time"
          class="form-control"
          required
          value="${data.appointmentTime || ''}"
        />
      </div>
      
      ${mode !== 'view' ? (`
        <label class="mt-3">Is follow up visit:</label>
        <div id="appointment-follow-up-visit-container">
          ${data.appointmentIsFollowUp === 'Yes'
            ? `<input type="radio" id="yes" name="appointmentIsFollowUp" value="Yes" checked>`
            : `<input type="radio" id="yes" name="appointmentIsFollowUp" value="Yes">`
          }
          <label for="yes">Yes</label><br>
          ${data.appointmentIsFollowUp === 'No'
            ? `<input type="radio" id="no" name="appointmentIsFollowUp" value="no" checked>`
            : `<input type="radio" id="no" name="appointmentIsFollowUp" value="no">`
          }
          <label for="no">No</label><br>
        </div>
      `) : (`
        <div class="mt-3">
          <label>Is follow up visit:</label>
          <input
            type="text"
            class="form-control"
            value="${data.appointmentIsFollowUp || ''}"
            disabled
          />
        </div>
      `)}

      <div class="mt-3">
        <label for="insurance">Insurance:</label>
        <select
          name="insurance"
          id="insurance"
          class="form-control"
        >
          ${insurancesList.map((insurance) => (`
            ${data && [insurance.name, insurance.id].includes(data.insurance)
              ? `<option value="${insurance.name}" selected>${insurance.name}</option>`
              : `<option value="${insurance.name}">${insurance.name}</option>`
            }
          `)).join('')}
        </select>
      </div>
    `;
  }

  const saveButton = document.getElementById('include-appointment-save-button');
  const modalFooter = document.getElementById('include-appointment-modal-footer');

  if (mode === 'view') {
    if (modalFooter && saveButton) modalFooter.removeChild(saveButton);

    return true;
  }

  if (modalFooter && saveButton) {
    modalFooter.removeChild(saveButton);
  }

  if (form && modalFooter) {
    const newSaveButton = document.createElement('button');

    newSaveButton.setAttribute('type', 'button');
    newSaveButton.setAttribute('id', 'include-appointment-save-button');
    newSaveButton.setAttribute('class', 'btn btn-primary');
    newSaveButton.addEventListener('click', () => handleSubmit(form.elements, mode));
    newSaveButton.innerText = 'Save';
    modalFooter.appendChild(newSaveButton);
  }

  return true;
};

const refreshAppointmentsTable = () => {
  const displayAppointments = document.getElementById('display-appointments-container');
  const feedbackContainer = document.getElementById('appointments-feedback');
  const db = getAppointmentsFromDatabase();

  if (displayAppointments) {
    if (!db.length) {
      feedbackContainer.innerHTML = `
        <h5>Appointments</h5>
        <p class="text-muted small">You do not have registered appointments.</p>
      `;
      return displayAppointments.innerHTML = ``;
    }

    feedbackContainer.innerHTML = `
      <h5>Appointments</h5>
      <p class="text-muted small">Currently you have ${db.length} appointments.</p>
    `;

    return displayAppointments.innerHTML = getResultTable();
  }

  return null;
};

const Appointments = () => {
  const form = document.getElementById('include-appointment-form');
  const appointmentsContainer = document.getElementById('appointment-container');

  refreshAppointmentsTable();
  getAppointmentsForm(form);
  window.Menu(appointmentsContainer, 'appointments');
};

window.Appointments = Appointments();
