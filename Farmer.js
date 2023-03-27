const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.listen(3000,()=>console.log('Server started'));

const farmeRouter=express.Router();
app.use('/farmer',farmeRouter);

farmeRouter
 .route('')
 .get(getFarmer)
 .post(addFarmer)
 .post(newSlot)
 .post(addFactory)

const factoryRouter=express.Router();
app.use('/factory',factoryRouter)

factoryRouter
    .route('')
    .post(addFactory)
    .get(getFactory)
 
 const link =
 'mongodb+srv://Vaibhav:Mahajan@cluster0.9pgunri.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(link)
.then(function(db){
    console.log('Connected to MongoDB');
})
.catch(function(err){   
    console.log('Error connecting to MongoDB',err);
});

//SCHEMA
var farmerSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
     password:{
        type:String,
        required:true,
        minLength:6,
     },
     village:{
        type:String,
        required:true
     },
     taluka:{
        type:String,
        required:true
     }
    });

var factorySchema=new mongoose.Schema({
    isfactory:{
        type:Boolean,
        required:true,
    },
    factory:{
        type:String,
        required:true,
       unique:true,
    },
    address:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    }
});

var logSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    amt:{
        type:Number,
        required:true,
        minvalue:0.5,
    },
    date:{
        type:Date,
        required:true,
    }

});

const modelFarmer=mongoose.model('modelFarmer',farmerSchema);
const modelFactory=mongoose.model('modelFactory',factorySchema);
const modelLog=mongoose.model('modelLog',logSchema);
async function addFactory(req,res){
  let body=req.body;
  let data=await modelFactory.create(body);
  res.json({
    message:'Factory added successfully',
    data:data
  })
  console.log(data);
}

async function addFarmer(req,res){
    let body=req.body;
    let data=await modelFarmer.create(body);
    res.json({
        message:'Farmer added successfully',
        data:data
    })
    console.log(data);
    }

async function getFarmer(req,res){
    let data=await modelFarmer.findOne({email:this.email,password:this.password});
    res.json({
        message:'Farmer fetched successfully',
        data:data
    })
    console.log(data);
}

async function getFactory(req,res){
    let data=await modelFactory.findOne({isfactory:true})
    res.json({
        message:'Factory fetched successfully',
        data:data
    })
};

async function newSlot(req,res){
    let body=req.body;
    let data=await modelLog.create(body);
    res.json({
        message:'Farmer logged successfully',
        data:data
    })
}

