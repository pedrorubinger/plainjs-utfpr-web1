const fetchCEP = async () => {
  const postalCodeEl = document.getElementById('contactCEP');
  const stateEl = document.getElementById('contactState');

  if (postalCodeEl && postalCodeEl.value) {
    const CEP_API_URL = `https://viacep.com.br/ws/${postalCodeEl.value}/json/`;
    
    try {
      const response = await (await fetch(CEP_API_URL)).json();

      if (!response.erro) {
        stateEl.setAttribute('value', response.uf);
      } else throw new Error();
    } catch (error) {
      stateEl.setAttribute('value', 'Invalid CEP!');
    }
  }
};

const Help = () => {
  const helpContainer = document.getElementById('help-container');

  window.Menu(helpContainer, 'help');
};

window.Help = Help();
