// Require TerminusDB Client
const Client = require("@terminusdb/terminusdb-client")

// Instantiate database client
const DB = new Client.WOQLClient("https://127.0.0.1:6363/", {
  dbid: "TodoMVC",
  user: "admin",
  key: "root",
})

// Set organization and database name
DB.organization("admin")
DB.db("TodoMVC")

// Connect to database
DB.connect()
 .catch((error) => {
    console.log('error', error)
  })


// Assign query builder to Q
const Q = Client.WOQL

// Create a Todo
const create = (data) => {
  DB.query(Q
    .add_triple(data.id, 'type','scm:Todo') 
    .add_triple(data.id, 'title',
      Q.literal(data.title, 'string'))
    .add_triple(data.id, 'completed',
      Q.literal(false,'boolean'))
  )
}

// Update a Todo
const alter = (data) => {
  console.log('alter',data)
  DB.query(Q
    .triple(data.id, data.key, 'v:Value') 
    .delete_triple(data.id, data.key, 'v:Value')
    .add_triple(data.id, data.key,
      data.key === 'completed'
      ? Q.literal(data.value, 'boolean') 
      : Q.literal(data.value, 'string') 
    )
  )
  .catch((error) => {
    console.log('alter error', error, data)
  })
}

// Remove a Todo
const remove = (data) => {
  DB.query(Q
    .delete_object(data.id, 'type','scm:Todo') 
  )
}

// Read state from database
const state = (callback) => {
  DB.query(Q
    .triple('v:Doc','type','scm:Todo')
    .triple('v:Doc', 'scm:title', 'v:Title')
    .triple('v:Doc', 'scm:completed', 'v:Completed')
  ).then((response) => {
    callback(null,
      response.bindings.map(item => ({
        id: item.Doc,
        title: item.Title['@value'],
        completed: item.Completed === 'system:unknown'
          ? false
          : item.Completed['@value'] === 'true'
      }))
    )
  })
  .catch((error) => {
    callback(error)
  })
}

// Export database methods
module.exports = { state, create, alter, remove }
