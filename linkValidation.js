const axios = require('axios')

axios.head(process.argv[2], { maxRedirects: 0 })
  .then((response) => console.log(response.statusText))
  .catch((err) => console.log('BAD - ', err.message));
