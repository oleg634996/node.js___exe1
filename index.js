const contacts = require("./db/contacts")
const { Command } = require("commander")

const invokeAction = async({action,id,name,phone ,email}) => {
  switch (action) {
    case "list":
          const allContacts =await contacts.listContacts()
         console.log(allContacts)
          break;
      case "get":
          const idContact = await contacts.getContactById(id)
          console.log(idContact)
          break;
      case "add":
          const contactAdd = await contacts.addContact({email, phone, name})
          console.log(contactAdd)
      break;
    case "remove":
      const contactRemove = await contacts.removeContact(id)
      console.log(contactRemove)
      break
  
    default:
        break;
  }
}  


// const actionIndex = process.argv.indexOf("--action")

  

//  if (actionIndex !== -1) {
//    const action = process.argv[actionIndex + 1]
//    invokeAction({action})
//  }

// invokeAction({ action: "listContacts" })
// invokeAction({action:"getContactById",id:"6"})
//invokeAction({ action: "addContact", name: "oleg", email: "oleg@gmail.com", phone: "0937449015" })
//invokeAction({action:"remove",id:"62"})

const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv)