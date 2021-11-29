import jwt from 'jsonwebtoken'

const token = jwt.sign({_id: 'io1j23oj'}, 'process.env.JWT_SECRET', {expiresIn: '300s'})

console.log(token);

const decodedToken = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJpbzFqMjNvaiIsImlhdCI6MTYzMzg2NTk4OSwiZXhwIjoxNjMzODY2Mjg5fQ.jQrPfK_lpc6NLV88x_-ubpyweUSnY3NxcCosn0uH6xQ', 'process.env.JWT_SECRET')

console.log(decodedToken);