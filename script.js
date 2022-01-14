const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const subtitles = document.getElementById('subtitles');

function toggleButton() {
  button.disabled = !button.disabled;
}

function showSubs() {
  subtitles.style.display= 'inline-block';
}

function hideSubs() {
  subtitles.style.display= 'none';
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: '16cda1224eaf4dc597e68cc245affc2d',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJoke() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    subtitles.innerHTML = joke;
   showSubs();
    toggleButton();
  } catch (error) {
    console.log('whoops', error);
  }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', () => {
  hideSubs();
  toggleButton();
});
