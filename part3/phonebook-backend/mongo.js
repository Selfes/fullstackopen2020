const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument at least: node mongo.js <password> [<name> <phone number>]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ntxzy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phonebookEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhonebookEntry = new mongoose.model('PhonebookEntry', phonebookEntrySchema)

if (process.argv.length === 3) {
  PhonebookEntry.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person['name'], person['number'])
    })
    mongoose.connection.close()
  })

} else {
  const entry = new PhonebookEntry({
    name: process.argv[3],
    number: process.argv[4]
  })

  entry.save().then((result) => {
    console.log('added', result['name'], result['number'], 'to phonebook')
    mongoose.connection.close()
  })
}
