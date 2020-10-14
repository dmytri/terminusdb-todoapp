// Require TerminusDB Client
const Client = require('@terminusdb/terminusdb-client')

// Instantiate database client
const DB = new Client.WOQLClient('https://127.0.0.1:6363/',
  { user: 'admin', key: 'root' }
)

// create Q alias to build queries
const Q = Client.WOQL

// organization is like user here
DB.organization('admin')

// connect
DB.connect()
  .then(() => hasDB())
  .catch(error => console.log('error', error))

// check for DB, create if missing
const hasDB = () => {
  console.log('# checking db')
  // use system database for this query
  DB.db('_system')
  // check if a database with the label TodoMVC exists
  DB.query(Q
    .triple('v:DB', 'type', 'system:Database')
    .triple('v:DB', 'label', 'v:Label')
    .eq({ '@language': 'en', '@value': 'TodoMVC' }, 'v:Label')
  ).then(response => {
    if (response.bindings.length === 0) {
      console.log('# creating db')
      // create the database
      DB.createDatabase('TodoMVC', {
        label: 'TodoMVC',
        comment: 'DB for TodoMVC backend',
        schema: true
      },
      'admin')
        .then(() => hasSchema())
    } else {
      console.log('# has db')
      hasSchema()
    }
  }).catch(error => console.log('error', error))
}

// check for schema and examples, add if missing
const hasSchema = () => {
  console.log('# checking schema')
  // set database to use to TodoMVC
  DB.db('TodoMVC')
  // check if a class called 'scm:Todo' exists
  // and is a sub of class 'system:Document'
  DB.query(Q
    .quad('v:Class', 'type', 'owl:Class', 'schema')
    .sub('system:Document', 'v:Class')
    .eq('v:Class', 'scm:Todo')
  )
    .then(response => {
      if (response.bindings.length === 0) {
        console.log('# creating schema')
        // add the schema for class 'scm:Todo'
        DB.query(Q
          .doctype('Todo')
          .label('Todo')
          .description('Things To Do')
          .property('title', 'xsd:string').cardinality(1)
          .property('completed', 'xsd:boolean').cardinality(1)
        ).then(response => {
          addExamples()
        }).catch(error => console.log('error', error))
      } else {
        console.log('# has schema')
        done()
      }
    })
    .catch(error => console.log('error', error))
}

// Create some example Todos
const addExamples = () => {
  console.log('# add todo1')
  // add example Todo 'Taste TerminusDB' 
  // set completed to true
  DB.query(Q
    .add_triple('doc:todo1', 'type', 'scm:Todo')
    .add_triple('doc:todo1', 'title',
      Q.literal('Taste TerminusDB', 'string'))
    .add_triple('doc:todo1', 'completed',
      Q.literal(true, 'boolean'))
  ).then(() => {
    console.log('# add todo2')
    // add example Todo 'Buy a camel' 
    // set completed to false
    DB.query(Q
      .add_triple('doc:todo2', 'type', 'scm:Todo')
      .add_triple('doc:todo2', 'title',
        Q.literal('Buy a camel', 'string'))
      .add_triple('doc:todo2', 'completed',
        Q.literal(false, 'boolean'))
      .comment('Add an example todo')
    ).then(() => done()
    ).catch(error => console.log('todo 2 error', error))
  }).catch(error => console.log('todo 1 error', error))
}

const done = () => {
  console.log('# done')
}
