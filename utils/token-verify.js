const jwt = require('jsonwebtoken');
const secret = 'bagheera';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2NDE3NjIwN30.A_1NwOWmfnmwtUOrvevxuEqZcXfu9mLagVcyEI9XSbc';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
const payload = verifyToken(token, secret);
console.log(payload);
