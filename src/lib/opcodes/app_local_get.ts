import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class AppLocalGet extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = encodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        if (account.locals === undefined) {
            throw new Error(`Locals not set for account "${accountName}", please add field "locals" to this account in your configuration.`);
        }
        const value = account.locals[localName];
        if (value === undefined) {
            throw new Error(`Local "${localName}" not set for account "${accountName}", please add "${localName}" field under the "locals" to this account in your configuration.`);
        }

        context.stack.push(value);
    }
}
