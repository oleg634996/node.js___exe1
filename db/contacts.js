const fs = require("fs/promises")
const path = require("path")
const { customAlphabet } = require('nanoid')


const nanoid = customAlphabet('123456789', 2)
const pathContacts = path.join(__dirname, "contacts.json")
const update = async (contacts)=>{
    await fs.writeFile(pathContacts, JSON.stringify(contacts,null,2))
}

const listContacts = async () => {
    const data = await fs.readFile(pathContacts)
    return JSON.parse(data)
}

const getContactById = async (id) => {
    const data = await listContacts() 
    const contactId = data.find(item => item.id === id)
    return contactId||'sorry,dont have now'
}

const addContact = async({name,phone,email}) => {
    const data = await listContacts()
    const contact = {
        id:nanoid(),
        name,
        email,
        phone,
    }
    data.push(contact)
   await update(data)
    return contact
}

const removeContact = async(id) => {
    const data = await listContacts()
    const index = data.findIndex(item => item.id === id)
    if (index=== -1) {
        return null
    }
   const [finish] = data.splice(index,1)
    await update(data)
     return finish
  
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}