const mongoose=require('mongoose')
const mongoURI = "mongodb+srv://ahmadhashmi1304:xt2kut17@cluster0.oe36p.mongodb.net/EcomDatabase";
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=>{console.log("connected Successfully")}).catch((err)=>{console.log(err)})
}
module.exports=connectToMongo;
