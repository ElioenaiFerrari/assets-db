require('dotenv/config');
require('module-alias/register');

const app = require('@/config/app');

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`listen on http://localhost:${PORT}`);
});
