//node,js's built in crypto
const crypto = require('crypto')

//Hashing -- prcess to store password
//one way process-- a string that has been hashed
//regardless of the input the has is always the same size
//can not be 'un-hashed'


//sha256
// const hash = crypto.createHash('sha256')

// hash.update('a')//create a hash out of the letter a

// const digest = hash.digest('hex')
// console.log('sha256:', digest)

// const userPass = 'abc123'

// function makeHash(string) {
//     const hash = crypto.createHash('sha256')

//     hash.update(string)

//     const digest = hash.digest('hex')
//     return digest
// }

// const loginPassword = 'abc123'

// console.log(makeHash(userPass)=== makeHash(loginPassword))


// const bcrypt = require('bcrypt')

// const userPassword = "Hello123"
// const hashedPassword = bcrypt.hashSync(userPassword, 3)

// console.log(bcrypt.compareSync('hello123', hashedPassword))

//Encryption

//two way proccess where data is 'locked' in an encryptionstring using a key and the key can remove the data from the string. it is a two way process 

const cryptoJs = require('crypto-js')

const stringToEncrypt = "hello secret message"

const encryptionKey = "myKey"

//Advanced Encryption Standard
const myEncryption = cryptoJs.AES.encrypt(stringToEncrypt, encryptionKey)
//console.log(myEncryption.toString())

const decryptedMessage = cryptoJs.AES.decrypt(myEncryption.toString(), 'myKey')
console.log(decryptedMessage.toString(cryptoJs.enc.Utf8))

