import {CardsRepository} from "../Data/Repositories/CardsRepository";

import { Card } from "../Data/Models/Card.Model";

let cardsRepo = new CardsRepository()

export class CardService {

    async  addCard(AccountID: any, CardNumber: number, CardHolderName: string, ExpireDate: string,CVV: number, Status: string){
    
        const acc=new Card(CVV,AccountID,ExpireDate,CardNumber,CardHolderName,Status)
        return cardsRepo.insert(acc);
    }
    
    async  getCard(data : object){
        
        return cardsRepo.get(data);
    }
 
}