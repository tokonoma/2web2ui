const axios = require('axios')

axios.head(process.argv[2], { maxRedirects: 0 })
  .then((response) => {
    if (!/image/.test(response.headers['content-type'])) {
      console.log('BAD - This does not look like an image, ', response.headers['content-type']);
      return;
    }

    console.log(response.statusText)
  })
  .catch((err) => console.log('BAD - ', err.message));
