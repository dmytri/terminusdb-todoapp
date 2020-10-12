WOQL.doctype("Todo")
  .label("Todo")
  .description("Things To Do")
  .property("title", "xsd:string").cardinality(1)
  .property("completed", "xsd:boolean").cardinality(1)

