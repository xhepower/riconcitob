const bcrypt = require('bcrypt');
async function hashPassword() {
  const mypass = 'putl el que lo lea';
  const hash = await bcrypt.hash(mypass, 10);
  console.log(hash);
}
hashPassword();
