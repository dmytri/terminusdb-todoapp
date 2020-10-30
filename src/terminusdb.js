/**
 * @module TodoMVCDB
 * @description TodoMVC DB Methods
 */

// **TerminusDB** is a decentralized revision control database.
// This module provides methods for the TodoMVC app which store the todo data
// in Terminusdb. All TerminusDB related code examples are here.

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
// The query method accepts a query builder, which constructs the query with a
// fluent style by chaining statements. In the following function add three
// tripples which represent the todo document and it's two properties, title
// and completed. 
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
 * @property {string} TodoAlteredTitle.id Todo Document Id to Alter
 * @property {'title'} TodoAlteredTitle.key string "title"
 * @property {string} TodoAlteredTitle.value Todo Title
 */

/**
 * @typedef {Object} TodoAlteredCompleted Todo Completed Altered
 * @property {string} TodoAlteredTitle.id Todo Document Id to Alter
 * @property {'completed'} TodoAlteredCompleted.key string "completed"
 * @property {boolean} TodoAlteredCompleted.value Todo Completed
 * @property {string} TodoAlteredCompleted.id Todo Document Id to Alter
 */

/**
 * Alter Todo
 * @param {(TodoAlteredTitle|TodoAlteredCompleted)} data Todo Title or Completed Alteration
 * @example
 *
 * alter({id: 'doc:todo1', key: 'title', value: 'walk the dinasaur'})
 * alter({id: 'doc:todo1', key: 'completed', value: true})
 */
// Here we use a triple statment to find the todo whith a given id, then
// delete either updated it's title or it's completed propery, depending on
// the value of the key that is passed.
// updating a triple in TerminusDB means deleting it and adding a new one.
function alter (data) {
  DB.query(Q
    .triple(data.id, data.key, 'v:Value')
    .delete_triple(data.id, data.key, 'v:Value')
    .add_triple(data.id, data.key,
      data.key === 'completed'
        ? Q.literal(data.value, 'boolean')
        : Q.literal(data.value, 'string'))
  ).catch((error) => {
    console.log('alter error', error, data)
  })
}

/**
 * Remove Todo
 *
 * @param {Object} data
 * @param {string} data.id Todo ID
 * @example
 *
 * remove({id: 'doc:todo1'})
*/
// Here we find a triple with a given Id and delete it.
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
 * @example
 *
 * toggle({completed: true})
*/
// Here we look for all todos that do not have the completed value that is
// passed to the function and set them to this value.
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
 *
 * @example
 *
 * clear()
*/
// This function deletes all Todos which have been completed.
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
 * @example
 *
 * let todos = []
 * state((err, data) => {
 *   if (err) console.log('read error', err)
 *   else {
 *     todos = data
 *   }
 * })
 */
// This function retrieves all todos from the database and passes them to a
// callback
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
      })))
  }).catch((error) => {
    callback(error)
  })
}

// Export database methods
module.exports = { state, create, alter, remove, toggle, clear }
