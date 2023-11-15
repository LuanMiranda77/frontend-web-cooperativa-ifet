// const express = require('express')
// const {resolve} = require('path')
// const app = express()


// app.use('/', express.static(
//   resolve(__dirname,'./build')
// ))

// app.listen(process.env.PORT || 3000, (err)=>{
//   if(err){
//     return console.log(err);
//   }
//   console.log('Biuld com sucesso')
// })

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);