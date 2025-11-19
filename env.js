const fs = require('fs');
require('dotenv').config();

const envConfig = `
export const environment = {
  production: false,
  apiBase: "${process.env.API_BASE}"
};
`;

fs.writeFileSync('./src/environments/config.ts', envConfig);
