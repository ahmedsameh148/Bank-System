






async function addAccount(UserId: any, AccountNumber: number, Balnce: number){
    
    return await insert( "Account",  {UserId: UserId, AccountNumber: AccountNumber, Balnce: Balnce})
}

async function getAccount(data : object){
    
    return await get("Account", data) 
}

async function addCard(AccountID: any, CardNumber: number, CardHolderName: string, ExpireDate: string,CVV: number, Status: string){

    return await insert( "Card",  {AccountID: AccountID, CardNumber: CardNumber, CardHolderName: CardHolderName, ExpireDate: ExpireDate,CVV: CVV,Status: Status})
}

async function getCard(data : object){
    
    return await get("Card", data)
}

async function addTransaction(FromAccount: string, ToAccount: string, Amount: string, Status: string){

    return await insert( "Transaction",  {FromAccount: FromAccount, ToAccount: ToAccount, Amount: Amount, Status: Status})
}

async function getTransaction(data : object){
    
    return await get("Transaction", data)
}

async function addGateway(userId: any, userName: string, password: string, passwordExpireDate: string){

    return await insert( "Gateway",  {userId: userId, userName: userName, password: password, passwordExpireDate: passwordExpireDate})
}

async function getGateway(data : object){
    
    return await get("Gateway", data)
}

async function createUser( Name: string, BirthDate: string, Email: string, Mobile: string, Balnce: number){
    const userid = await addUser(Name,BirthDate,Email,Mobile);
    const accountID = await addAccount(userid,Math.floor(Math.random()*1E16),Balnce)
    let count=0;
    for (let i=0;i<Name.length;i++)
    {
        if (Name[i]==' ')
           {count++;
            if (count==2)
            {
                count=i
                break
            }
        }
    }
    if (count<2)
        count=Name.length
    let cardID = await addCard(accountID,Math.floor(Math.random()*1E16),Name.substring(0,count),"11/24",Math.floor(Math.random()*1E3),"Active")
    return userid;
}

async function createGateway (Name: string, Email: string, Mobile: string){
    const userID = await createUser(Name,"1/1/2021",Email,Mobile,0)
    var user=Name.split(" ").join("");
    var pass=Math.random().toString(36).slice(-8)
    var today = new Date()
    var mm = String(today.getMonth() + 1).padStart(2, '0') 
    var yyyy = today.getFullYear()+1
    var expir = mm + '/' + yyyy
    addGateway(userID,user,pass,expir)
    
}

async function run() {
    
    let res = await createUser("Ahmed Elsayed Mohamed Mohamed","12/12/1995","ahmed@outlook.com","01555255222",100000)
    console.log(await getUser({_id : new ObjectId(res.toString())}));
}

module.exports = {createUser, createGateway, getUser, getAccount, getCard, getGateway, getTransaction};
//run();
//creategateway("Team 2","team2@gmail.com","0111111111")
//addTransaction("8287392010546621","7423399946407152","1000","accepted")
//getUser("61867f8f6e08ea4335e0f280")
//getAccount("1111111")
//getCard("7423399946407152")
//getGateway("Team2")
//getTransaction("7423399946407152")
