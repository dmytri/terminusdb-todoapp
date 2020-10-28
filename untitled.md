# dmytri/terminusdb-todoapp

TerminusDB TodoMVC Methods

* [TerminusDB]()
  * [~create\(todo\)]()
  * [~alter\(data\)]()
  * [~remove\(data\)]()
  * [~toggle\(data\)]()
  * [~clear\(\)]()
  * [~state\(callback\)]()
  * [~TodoCreated]() : `Object`
  * [~TodoAlteredTitle]() : `Object`
  * [~TodoAlteredCompleted]() : `Object`
  * [~callback]() : `function`

## TerminusDB~create\(todo\)

Create Todo

**Kind**: inner method of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| todo | `TodoCreated` | Todo Created |

**Example**

```text
create({
 id: "doc:todo1",
 title: "Taste TerminusDB"
})
```

## TerminusDB~alter\(data\)

Alter Todo

**Kind**: inner method of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| data | `TodoAlteredTitle` \| `TodoAlteredCompleted` | Todo Title or Completed Alteration |

## TerminusDB~remove\(data\)

Remove Todo

**Kind**: inner method of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| data | `Object` |  |
| data.id | `string` | Todo ID |

## TerminusDB~toggle\(data\)

Toggle All Todos

**Kind**: inner method of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| data | `Object` |  |
| data.completed | `boolean` | Todo completed |

## TerminusDB~clear\(\)

Clear Completed Todos

**Kind**: inner method of [`TerminusDB`]()  


## TerminusDB~state\(callback\)

Get all Todos

**Kind**: inner method of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| callback | `callback` | callback to recieve state |

## TerminusDB~TodoCreated : `Object`

Todo Created

**Kind**: inner typedef of [`TerminusDB`]()  
 **Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| TodoCreated.id | `string` | Todo ID |
| TodoCreated.title | `string` | Todo Title |

## TerminusDB~TodoAlteredTitle : `Object`

Todo Title Altered

**Kind**: inner typedef of [`TerminusDB`]()  
 **Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| TodoAlteredTitle.key | `'title'` | string "title" |
| TodoAlteredTitle.value | `string` | Todo Title |
| TodoAlteredTitle.id | `string` | Todo Document Id to Alter |

## TerminusDB~TodoAlteredCompleted : `Object`

Todo Completed Altered

**Kind**: inner typedef of [`TerminusDB`]()  
 **Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| TodoAlteredCompleted.key | `'completed'` | string "completed" |
| TodoAlteredCompleted.value | `boolean` | Todo Completed |
| TodoAlteredCompleted.id | `string` | Todo Document Id to Alter |

## TerminusDB~callback : `function`

Response Callback

**Kind**: inner typedef of [`TerminusDB`]()

| Param | Type | Description |
| :--- | :--- | :--- |
| error | `Error` | Error Object |
| response | `Array` | Response Array |

