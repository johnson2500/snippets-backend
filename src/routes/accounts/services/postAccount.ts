import Account from '../../../models/Accounts/accounts';
import reponseTransformer from '../../../helpers/reponseTransformer';
import { Request, Response} from 'express'

export default async (req: Request, res: Response): Promise<void> => {
  try {

    const { ownerId, body } = req;

    const account: Account = new Account(ownerId);
  
    await account.addAccount(body);
  
    res.send(reponseTransformer(req, { ...body, id: ownerId }));
  } catch (error: any) {
    console.log(error);

    res.status(500).send(reponseTransformer(req, { error: error.message }));
  }
};
