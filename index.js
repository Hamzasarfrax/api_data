const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require("cors");
const app = express();
app.use(cors())
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/your_db_name', { useNewUrlParser: true });
app.use(bodyParser.json());
const YourModel = mongoose.model('YourModel', {
name:String,
age:Number,
class:String
});
// const newResource = new YourModel({
//     name: '',
//     age: 20,
//     class: '12'
// });
app.get('/', (req, res) => {

  res.json({ message: "Hello, World!" });
  });
app.get('/users', (req, res) => {
YourModel.find({},(err,user)=>{
  if (err) return console.error(err);
  res.json(user);
})
});
app.get('/users/:name', (req, res) => {
  YourModel.findOne({ name: req.params.name })
  .then(resource => {
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  })
  .catch(err => res.status(500).json({ message: err.message }));

  });

app.post("/post",(req,res)=>{
  const user=new YourModel({
    name:req.body.name,
    age:req.body.age,
    class:req.body.class,   
  });
  user.save((err,user)=>{
    if(!err){
      res.json(user)
    }
    else{
      console.log(err)
    }
  }) 
});

app.patch('/users/:name', (req, res) => {
  YourModel.findOneAndUpdate({ name: req.params.name }, req.body, { new: true })
    .then(resource => {
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.json(resource);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});


app.delete('/users/:name', (req, res) => {
  YourModel.findOneAndDelete({ name: req.params.name })
    .then(resource => {
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.json({ message: 'Resource deleted successfully' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
