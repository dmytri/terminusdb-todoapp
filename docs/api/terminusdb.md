<a name="module_TerminusDB"></a>

## TerminusDB
TerminusDB TodoMVC Methods


* [TerminusDB](#module_TerminusDB)
    * [~create(todo)](#module_TerminusDB..create)
    * [~alter(data)](#module_TerminusDB..alter)
    * [~remove(data)](#module_TerminusDB..remove)
    * [~toggle(data)](#module_TerminusDB..toggle)
    * [~clear()](#module_TerminusDB..clear)
    * [~state(callback)](#module_TerminusDB..state)
    * [~TodoCreated](#module_TerminusDB..TodoCreated) : <code>Object</code>
    * [~TodoAlteredTitle](#module_TerminusDB..TodoAlteredTitle) : <code>Object</code>
    * [~TodoAlteredCompleted](#module_TerminusDB..TodoAlteredCompleted) : <code>Object</code>
    * [~callback](#module_TerminusDB..callback) : <code>function</code>

<a name="module_TerminusDB..create"></a>

### TerminusDB~create(todo)
Create Todo

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| todo | <code>TodoCreated</code> | Todo Created |

**Example**  
```js
create({
 id: "doc:todo1",
 title: "Taste TerminusDB"
})
```
<a name="module_TerminusDB..alter"></a>

### TerminusDB~alter(data)
Alter Todo

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>TodoAlteredTitle</code> \| <code>TodoAlteredCompleted</code> | Todo Title or Completed Alteration |

<a name="module_TerminusDB..remove"></a>

### TerminusDB~remove(data)
Remove Todo

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.id | <code>string</code> | Todo ID |

<a name="module_TerminusDB..toggle"></a>

### TerminusDB~toggle(data)
Toggle All Todos

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.completed | <code>boolean</code> | Todo completed |

<a name="module_TerminusDB..clear"></a>

### TerminusDB~clear()
Clear Completed Todos

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  
<a name="module_TerminusDB..state"></a>

### TerminusDB~state(callback)
Get all Todos

**Kind**: inner method of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>callback</code> | callback to recieve state |

<a name="module_TerminusDB..TodoCreated"></a>

### TerminusDB~TodoCreated : <code>Object</code>
Todo Created

**Kind**: inner typedef of [<code>TerminusDB</code>](#module_TerminusDB)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoCreated.id | <code>string</code> | Todo ID |
| TodoCreated.title | <code>string</code> | Todo Title |

<a name="module_TerminusDB..TodoAlteredTitle"></a>

### TerminusDB~TodoAlteredTitle : <code>Object</code>
Todo Title Altered

**Kind**: inner typedef of [<code>TerminusDB</code>](#module_TerminusDB)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoAlteredTitle.key | <code>&#x27;title&#x27;</code> | string "title" |
| TodoAlteredTitle.value | <code>string</code> | Todo Title |
| TodoAlteredTitle.id | <code>string</code> | Todo Document Id to Alter |

<a name="module_TerminusDB..TodoAlteredCompleted"></a>

### TerminusDB~TodoAlteredCompleted : <code>Object</code>
Todo Completed Altered

**Kind**: inner typedef of [<code>TerminusDB</code>](#module_TerminusDB)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoAlteredCompleted.key | <code>&#x27;completed&#x27;</code> | string "completed" |
| TodoAlteredCompleted.value | <code>boolean</code> | Todo Completed |
| TodoAlteredCompleted.id | <code>string</code> | Todo Document Id to Alter |

<a name="module_TerminusDB..callback"></a>

### TerminusDB~callback : <code>function</code>
Response Callback

**Kind**: inner typedef of [<code>TerminusDB</code>](#module_TerminusDB)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error Object |
| response | <code>Array</code> | Response Array |

