const apiURL = 'https://restcountries.com/v3.1/name/';

// fetch API
async function getData(url, input) {
  try {
    const apiResponse = await axios.get(`${url}${input ? input : 'deutschland'}`);
    const apiData = await apiResponse.data[0];
    return [apiData.capital[0], apiData.cca2];
  } catch (err) {
    console.error(err);
  }
}

// DOM
const button = document.querySelector('button');
button.addEventListener('click', async () => {
  try {
    const inputTag = document.querySelector('input');
    const data = await getData(apiURL, inputTag.value);

    const paragraph = document.querySelector('p');
    paragraph.innerText = `${data[1]}: ${data[0]}`;
  } catch (err) {
    console.error(err);
  }
});
