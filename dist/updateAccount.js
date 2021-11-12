"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceDeduct = exports.balanceAdd = exports.trasnfer = void 0;
const DB_1 = require("./DB");
async function trasnfer(req, res) {
    if (!req?.body?.incAccount || !req?.body?.outAccount || !req?.body?.value)
        return res.status(204).json({ msg: 'Please enter a valid body' });
    const outID = req?.body?.outAccount;
    const incID = req?.body?.incAccount;
    const valueOfTransaction = Number(req?.body?.value);
    const accountTransferOut = await (0, DB_1.getAccount)({ UserId: outID });
    //If there is a Balnce available for transfer...
    let transferWithdraw;
    if (accountTransferOut[0]?.Balnce >= valueOfTransaction) {
        transferWithdraw = accountTransferOut[0]?.Balnce - valueOfTransaction;
    }
    else {
        return res.status(400).json({ msg: 'There is no Balnce available for the transaction to complete.' });
    }
    const accountTransferInc = await (0, DB_1.getAccount)({ UserId: incID });
    let transferDeposit = accountTransferInc[0]?.Balnce + valueOfTransaction;
    try {
        await (0, DB_1.updateAccount)({ _id: accountTransferOut[0]._id }, { $set: { Balnce: transferWithdraw } });
        await (0, DB_1.updateAccount)({ _id: accountTransferInc[0]._id }, { $set: { Balnce: transferDeposit } });
        res.status(200).json({ msg: 'Transfer performed successfully.' });
    }
    catch (err) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' });
    }
}
exports.trasnfer = trasnfer;
/////////////////////
/**
 *
 {
    "accountID": "618d12638f934c4e70f101dd",
    "value": "550"
}
 */
async function balanceAdd(req, res) {
    if (!req?.body?.accountID && !req?.body?.value)
        return res.status(204).json({ msg: 'Please enter a valid body' });
    const account = await (0, DB_1.getAccount)({ UserId: req?.body?.accountID });
    const Balnce = parseInt(account[0].Balnce);
    const valueAfterDeposit = Balnce + Number(req?.body?.value);
    try {
        await (0, DB_1.updateAccount)({ _id: account[0]._id }, { $set: { Balnce: valueAfterDeposit } });
        res.status(200).json({ msg: 'Deposit executed successfully.' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' });
    }
}
exports.balanceAdd = balanceAdd;
////////////////////////////
/**
 *
 {
    "accountID": "618d12638f934c4e70f101dd",
    "value": "550"
}
 */
async function balanceDeduct(req, res) {
    if (!req?.body?.accountID && !req?.body?.value)
        return res.status(204).json({ msg: 'Please enter a valid body.' });
    let accountToSearch = req?.body?.accountID;
    const accountSearched = await (0, DB_1.getAccount)({ UserId: accountToSearch });
    const balance = parseInt(accountSearched[0].Balnce);
    const valueAfterWithdraw = balance - Number(req.body.value);
    try {
        await (0, DB_1.updateAccount)({ _id: accountSearched[0]._id }, { $set: { Balnce: valueAfterWithdraw } });
        res.status(200).json({ msg: 'Successfully executed service.' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Internal Error. Please contact the administrator' });
    }
}
exports.balanceDeduct = balanceDeduct;
