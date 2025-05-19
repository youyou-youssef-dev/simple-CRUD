// index.js
const express = require('express');
const app= express();
const port=3000;
app.use(express.json());
const users=[
    {id:1,name:'John', age:30},
    {id:2,name:'Jane', age:25},
    {id:3,name:'Jim', age:35}
];
app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const user = users.find(u=>u.id==req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});
app.post('/users', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const id	 = users.length + 1;
    // const user = {id,name,age};
    users.push({id,name,age});
    res.status(201).json(users);
});
app.put('/users/:id', (req, res) => {
    const user = users[req.params.id];
    if (!user) {
        return res.status(404).send('User not found');
    }
    users[req.params.id] = req.body;
    res.json(users[req.params.id]);
}); 
app.delete('/users/:id', (req, res) => {
    const user = users[req.params.id];
    if (!user) {
        return res.status(404).send('User not found');
    }
    users.splice(req.params.id, 1);
    res.status(204).send();
});
app.get('/',(req,res)=>{
    res.send('<h1 style="text-align:center; color:red;">Hello World!  </h1>');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});