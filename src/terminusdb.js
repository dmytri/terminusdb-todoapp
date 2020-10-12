const Client = require("@terminusdb/terminusdb-client")

const DB = new Client.WOQLClient("https://127.0.0.1:6363/", {
  dbid: "TodoMVC",
  user: "admin",
  key: "root",
})

DB.organization("admin")
DB.db("TodoMVC")

DB.connect()
 .catch((error) => {
    console.log('error', error)
  })

const Q = Client.WOQL

const create = (data) => {
  DB.query(Q
    .add_triple(data.id, 'type','scm:Todo') 
    .add_triple(data.id, 'title', Q.literal(data.title, 'string'))
    .add_triple(data.id, 'completed', Q.literal(false,'boolean'))
  )
}

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

const remove = (data) => {
  DB.query(Q
    .delete_object(data.id, 'type','scm:Todo') 
  )
}

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

module.exports = { state, create, alter, remove }
