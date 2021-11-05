const { request, response } = require('express');

const express = require('express');

const app = express();

app.use(express.json());

var auxiliar;

const spawn2 = require("child_process").exec;

const iperfServer = spawn2('npm run server');


iperfServer.stderr.on('data', (data) => {
    
    console.log('foi');

    console.log(`stderr iperfServer: ${data}`);

    console.log('error');
});


iperfServer.stdout.on('data', (data) => {           

    console.log(data.toString());
});




app.get("/move", (request, response) =>  {

     return response.status(200).send("Você está conectado"); 

    

})

app.post("/move", (request, response) =>  {

    const {x,y} = request.body;

    if (x == null || y == null) {

        return response.status(400).send("Inputs incorretos");

    } else {
        
        const spawn = require("child_process").spawn;

        const pythonProcess = spawn('python', ['src/python_script/script.py', x, y]); 

        pythonProcess.stdout.on('data', (data) => {
            
            auxiliar = data.toString().replace('\n', '');

            return response.json(auxiliar.split(' '));
        });

        pythonProcess.stderr.on('data', (data) => {
            
            console.log(`stderr: ${data}`);

            return response.json(x);
        });



 
    }



})

app.listen(process.env.PORT || 5001);