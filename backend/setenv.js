import fs from 'fs';
import readline from 'readline-sync';

try {
let dbkey = await String(readline.question("Enter DB key: "));
updateEnv("DB_URI", dbkey);
updateEnv("PORT", 3001);
let jwtkey = await String(readline.question("Choose a JWT private key: "));
updateEnv("JWT_KEY", jwtkey);
console.log("All .env parameters set.");
} catch (err) { console.log(err); }

function updateEnv(key, value) {
    //read contents of .env
    let text;
    try {
        text = fs.readFileSync('.env', 'utf8');
    }
    catch (err) {
        console.log("File read failed.");
        text = '';
    }
    if (key.trim().length === 0 ){
        console.error('Empty key.');
        return;
    }

    //split env variables into newlines
    const vars = text.split('\n');
    let varExists = false;
    //go through all lines. If key is found, update its value to $value
    for (let i=0; i<vars.length; i++) {
        if (vars[i].startsWith(`${key}=`)) {
            vars[i] = `${key}=${value}`;
            varExists = true;
            break;
        }
    }
    //if variable not in env file, create it 
    if (!varExists)
        vars.push(`${key}=${value}`);
    //update .env with new variables
    fs.writeFileSync('.env', vars.join('\n'), 'utf-8');
}