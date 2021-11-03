import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Gt extends Binary {
    
    execute(context: IExecutionContext): void {
        context.stack.push(this.a > this.b ? BigInt(1) : BigInt(0));
    }
}
