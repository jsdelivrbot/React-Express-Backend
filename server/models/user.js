const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define model 
const userSchema = new Schema({
 email:{type:String,unique:true,lowercase:true},
 password:String

});
 
//create model class'
//load schema(adding userScema model) into mongoose under the collection 'user'
//ModelClass represents all users and is the class definiton

const ModelClass = mongoose.model('user',userSchema);


//export model
moduel.exports ModelClass;