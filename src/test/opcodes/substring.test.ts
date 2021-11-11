import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Substring } from "../../lib/opcodes/substring";

describe("substring opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "1",
                "3",
            ],
        };
        const opcode = new Substring(token, opcodeDefs.substring);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([2, 3]);        
    });
});