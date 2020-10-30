<a name="module_TerminusDB"></a>

## TerminusDB
TerminusDB TodoMVC Methods

<a name="module_TerminusDB..create"></a>

### TerminusDB~create(todo)
Create Todo


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


| Param | Type | Description |
| --- | --- | --- |
| data | <code>TodoAlteredTitle</code> \| <code>TodoAlteredCompleted</code> | Todo Title or Completed Alteration |

**Example**  
```js
alter({id: 'doc:todo1', key: 'title', value: 'walk the dinasaur'})
alter({id: 'doc:todo1', key: 'completed', value: true})
```
<a name="module_TerminusDB..remove"></a>

### TerminusDB~remove(data)
Remove Todo


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.id | <code>string</code> | Todo ID |

**Example**  
```js
remove({id: 'doc:todo1'})
```
<a name="module_TerminusDB..toggle"></a>

### TerminusDB~toggle(data)
Toggle All Todos


| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.completed | <code>boolean</code> | Todo completed |

**Example**  
```js
toggle({completed: true})
```
<a name="module_TerminusDB..clear"></a>

### TerminusDB~clear()
Clear Completed Todos

**Example**  
```js
clear()
```
<a name="module_TerminusDB..state"></a>

### TerminusDB~state(callback)
Get all Todos


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>callback</code> | callback to recieve state |

**Example**  
```js
let todos = []
state((err, data) => {
  if (err) console.log('read error', err)
  else {
    todos = data
  }
})
```
<a name="module_TerminusDB..TodoCreated"></a>

### TerminusDB~TodoCreated : <code>Object</code>
Todo Created

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoCreated.id | <code>string</code> | Todo ID |
| TodoCreated.title | <code>string</code> | Todo Title |

<a name="module_TerminusDB..TodoAlteredTitle"></a>

### TerminusDB~TodoAlteredTitle : <code>Object</code>
Todo Title Altered

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoAlteredTitle.id | <code>string</code> | Todo Document Id to Alter |
| TodoAlteredTitle.key | <code>&#x27;title&#x27;</code> | string "title" |
| TodoAlteredTitle.value | <code>string</code> | Todo Title |

<a name="module_TerminusDB..TodoAlteredCompleted"></a>

### TerminusDB~TodoAlteredCompleted : <code>Object</code>
Todo Completed Altered

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TodoAlteredTitle.id | <code>string</code> | Todo Document Id to Alter |
| TodoAlteredCompleted.key | <code>&#x27;completed&#x27;</code> | string "completed" |
| TodoAlteredCompleted.value | <code>boolean</code> | Todo Completed |
| TodoAlteredCompleted.id | <code>string</code> | Todo Document Id to Alter |

<a name="module_TerminusDB..callback"></a>

### TerminusDB~callback : <code>function</code>
Response Callback


| Param | Type | Description |
| --- | --- | --- |
| error | <code>Error</code> | Error Object |
| response | <code>Array</code> | Response Array |

