const { request, response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

var auxiliar;

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

app.listen(3333);