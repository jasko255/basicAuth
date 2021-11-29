import bcrypt from "bcrypt"

const plainPW = "abs"

const numberOfRounds = 10

console.time('bcrypt')

const hash = bcrypt.hashSync(plainPW,numberOfRounds)
console.log(hash);
console.timeEnd('bcrypt')


const isOk = bcrypt.compareSync(plainPW, hash)

console.log(isOk);


//require("crypto").randomBytes(64).toString("hex")