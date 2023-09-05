const bcrypt = require('bcrypt');
async function verifyPassword() {
  const mypass = 'putl el que lo lea';
  const hash = '$2b$10$3RHOoMPtyFGOzhY6pHRD6OEBZCnnub9D04xh0ncWADJ25zSRpw4Sy';
  const isMatch = await bcrypt.compare(mypass, hash);
  console.log(isMatch);
}
verifyPassword();
