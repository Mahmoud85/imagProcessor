import express from 'express'

const port = 3000;
const app = express();

app.get('/api', (req,res)=>{
 return res.send ('This is get api')
})
app.listen(port,(req,res)=>{
console.log(`Server is runing on port : http://localhost:${port}`)
})