import express from 'express';
import { balanceAdd, trasnfer, balanceDeduct } from './updateAccount';


//const userId = addUser("ahmed","31/1/1998","akamal98@gmail.com","010012345678");
//run();

// async function myRun() {    
//    // let res = await createUser("Ahmed Elsayed Mohamed Mohamed","12/12/1995","ahmed@outlook.com","01555255222",100000)
//     //console.log(await getUser({_id : new ObjectId(res.toString())}));
//     console.log(await getAccount({UserId:'618d12638f934c4e70f101dd'}));
//    // console.log(await trasnfer());
// }
//myRun();
//console.log(userId);

const app = express();

// app.get('/', (req, res) => {
//     res.send('This is a test web page!');
// })

app.use(express.json());
app.post('/', balanceAdd);

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
    