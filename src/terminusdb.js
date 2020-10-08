const Client = require("@terminusdb/terminusdb-client")

const DB = new Client.WOQLClient("https://127.0.0.1:6363/", {
  dbid: "TodoMVC",
  user: "admin",
  key: "root",
})

DB.db("TodoMVC");
DB.organization("admin");

DB.connect()
 .then(function (response) {
  })
 .catch(function (error) {
    console.log(error)
  })

const Q = Client.WOQL

 doctype('Todo')                                                                          
 	.label('Todo Item')                                                                        
 	.description('something to do')                                                            
 	.property('title', 'xsd:string')                                                           
 	.property('complete', 'xsd:boolean')
Q.doctype('Todo')
.label('Todo Item')
.description('something to do')
.property('title', 'xsd:string')
.property('complete', 'xsd:boolean')

DB.query(Q)
  .then((response) => {
      console.log(response)
  })

//const query = Q.all()
//const query = Q.triple('v:doc','type','scm:Todo')

