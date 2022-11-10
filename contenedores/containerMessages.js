// const { options } = require('../options/config.js')
// const knex = require('knex')(options.sqlite)
const fs = require("fs")

module.exports = class ContainerMsg {
    constructor(configConnection) {
        this.myFile = configConnection
    }

    async readFile() {
        try {
          const content = await fs.promises.readFile(this.myFile, "utf-8");
          console.log("Content msgs: " + content)
          const contentParsed = JSON.parse(content);
          return contentParsed;
        } catch (error) {
          console.error("Error leer archivo: " + error);
        }
      }


    async getAllMsg() {
        const fileContent = await this.readFile()
        try {
            if (fileContent.length !== 0) {
            // console.table(fileContent)
            return fileContent;
            } else {
            console.log("Lo sentimos, la lista de mensajes está vacía!!!");
            }
        } catch (error) {
            console.error(`Error getting all messages ${error}`);
        }
    }
   
    async saveMsg(addMessage) {
        const fileContent = await this.myFile
        // console.log('Dentro del saveProduct: '+ JSON.stringify(addMessage))
        if (addMessage !== undefined) {
            const messageToSave = JSON.stringify([...fileContent, { ...addMessage, id_message: fileContent[fileContent.length - 1].id_message + 1 }], null, 2)
            
            try {
                this.myFile = fs.promises.writeFileSync(this.myFile, messageToSave)
                return messageToSave

            } catch (error) {
                console.log(error)
                return { Error: 'Upps! Hubo un error y no pudimos guardar el Mensaje.' }
            }
        } else {
            return { Error: 'Upps! We had some problems saving the mensaje, try later.' }
        }
    }
}    