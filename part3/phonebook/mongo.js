const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://taylor-roberts:${password}@cluster0.syqo2ym.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String

})

const Person = mongoose.model('Person', PersonSchema)
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`Added ${person.name} ${person.number} to phonebook!`)
    mongoose.connection.close()
  })
}
else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}


