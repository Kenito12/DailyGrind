import mongoose from 'mongoose'
  
// To make your own Schema, check the documentation Here:
// https://mongoosejs.com/docs/guide.html#definition
// You can also try a Schema Generator like this one:
// https://bender.sheridanc.on.ca/system-design/schema-generator 

const ListCollection = 'EspressoRecipe' 

const schema = new mongoose.Schema({ 
  "BeansName": { "type": "String" },
  "GrinderName": { "type": "String"},
  "GrindSize": { "type": "Decimal128"},
  "BrewtimeSec": { "type": "Int32" },
  "YieldVolume": { "type": "Decimal128"},
  "Dose": { "type": "Decimal128"},
  "Taste": { "type": "Int32"},
  "RoastLevel": { "type": "String"},
  "Date": { "type": "Date"},
  "Username": { "type": "String"}
}) 

const Item = mongoose.model('Items', schema,ListCollection);
  

export { Item };