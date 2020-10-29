const fs = require('fs')
const jsdoc2md = require('jsdoc-to-markdown')

jsdoc2md.render({ files: 'src/main.js' })
  .then(output =>
    fs.writeFileSync('API/main.js.md', output))


jsdoc2md.render({ files: 'src/terminusdb.js' })
  .then(output =>
    fs.writeFileSync('API/terminusdb.js.md', output))
