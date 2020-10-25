/**
 * @module TerminusDB
 * @description TerminusDB TodoMVC Methods
 */

// Require TerminusDB Client
const Client = require('@terminusdb/terminusdb-client')

// Instantiate database client
const DB = new Client.WOQLClient('https://127.0.0.1:6363/', {
  user: 'admin',
  key: 'root'
})

// Set organization and database name
DB.organization('admin')
DB.db('TodoMVC')

// Connect to database
DB.connect()
  .catch((error) => {
    console.log('error', error)
  })

// Assign query builder to Q
const Q = Client.WOQL

/**
 * @typedef {Object} TodoCreated Todo Created
 * @property {string} TodoCreated.id Todo ID
 * @property {string} TodoCreated.title Todo Title
 */

/**
 * Create Todo
 * @param {TodoCreated} todo Todo Created
 * @example
 * create({
 *  id: "doc:todo1",
 *  title: "Taste TerminusDB"
 * })
 */
function create (todo) {
  DB.query(Q
    .add_triple(todo.id, 'type', 'scm:Todo')
    .add_triple(todo.id, 'title',
      Q.literal(todo.title, 'string'))
    .add_triple(todo.id, 'completed',
      Q.literal(false, 'boolean'))
  )
}

/**
 * @typedef {Object} TodoAlteredTitle Todo Title Altered
 * @property {'title'} TodoAlteredTitle.key string "title"
 * @property {string} TodoAlteredTitle.value Todo Title
 * @property {string} TodoAlteredTitle.id Todo Document Id to Alter
 */

/**
 * @typedef {Object} TodoAlteredCompleted Todo Completed Altered
 * @property {'completed'} TodoAlteredCompleted.key string "completed"
 * @property {boolean} TodoAlteredCompleted.value Todo Completed
 * @property {string} TodoAlteredCompleted.id Todo Document Id to Alter
 */

/**
 * Alter Todo
 *
 * @param {(TodoAlteredTitle|TodoAlteredCompleted)} data Todo Title or Completed Alteration
 */
function alter (data) {
  console.log('alter', data)
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

/**
 * Remove Todo
 *
 * @param {Object} data
 * @param {string} data.id Todo ID
*/
function remove (data) {
  DB.query(Q
    .triple(data.id, 'v:Predicate', 'v:Object')
    .delete_triple(data.id, 'v:Predicate', 'v:Object')
  )
}

/**
 * Toggle All Todos
 *
 * @param {Object} data
 * @param {boolean} data.completed Todo completed
*/

function toggle (data) {
  console.log('data', data)
  DB.query(Q
    .triple('v:Doc', 'completed', Q.literal(!data.completed, 'boolean'))
    .delete_triple('v:Doc', 'completed', Q.literal(!data.completed, 'boolean'))
    .add_triple('v:Doc', 'completed', Q.literal(data.completed, 'boolean'))
  )
}

/**
 * Clear Completed Todos
*/
function clear () {
  DB.query(Q
    .triple('v:Doc', 'completed', Q.literal(true, 'boolean'))
    .triple('v:Doc', 'v:Predicate', 'v:Object')
    .delete_triple('v:Doc', 'v:Predicate', 'v:Object')
  )
}

/**
 * Response Callback
 *
 * @callback callback
 * @param {Error} error Error Object
 * @Param {Array} response Response Array
 */

/**
 * Get all Todos
 *
 * @param {callback} callback callback to recieve state
 */

function state (callback) {
  DB.query(Q
    .triple('v:Doc', 'type', 'scm:Todo')
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
module.exports = { state, create, alter, remove, toggle, clear }
