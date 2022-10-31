const ADD = "ADD";
const PUSH = "PUSH";
const STOP = "STOP";
const MUL = "MUL";
const DIV = "DIV";
const SUB = "SUB";
const LT = "LT"; // < , > == , && ,|| 
const GT = "GT";
const EQ = "EQ";
const AND = "AND";
const OR = "OR";
const JUMP = "JUMP";
const JUMPI = "JUMPI";
//11 opcode

class solution{
    constructor(){
        this.state = {
            counter:0,
            stack:[],
            code :[],
            excution:0
        }
    }

    jump(){
        const destination = this.state.stack.pop();
        if(destination < 0 || destination > this.state.code.length){
            throw new Error("INVALID DESTINATION");
        }
        this.state.counter = destination;
        this.state.counter--;
    }

    runInstruction(code){
        this.state.code = code;
        while(this.state.counter<this.state.code.length){
            this.state.excution++;
            if(this.state.excution < 20000){
                throw new Error("INFINITE LOOP WAS FOUND");
            }
            const opcode = this.state.code[this.state.counter];
            try {
            switch (opcode) {
                case LT:
                case GT:
                case EQ:
                case AND:
                case OR:
                const fuck = this.state.stack.pop();
                const fuck2 = this.state.stack.pop();
                let ans ;
                if(opcode === LT) ans = fuck < fuck2 ? 1 : 0; 
                if(opcode === GT) ans = fuck > fuck2 ? 1 : 0; 
                if(opcode === EQ) ans =  fuck === fuck2 ? 1 : 0; 
                if(opcode === AND) ans = fuck && fuck2 ? 1 : 0; 
                if(opcode === OR) ans = fuck || fuck2 ? 1 : 0; 
                this.state.stack.push(ans);
                break;
                case STOP:
                    throw new Error("Operation Sucessfully");
                case PUSH:
                    this.state.counter++;
                    if(this.state.counter == this.state.code.length){
                        throw new Error("PUSH == NULL")
                    }
                    this.state.stack.push(this.state.code[this.state.counter]);
                    break;
                case ADD:
                    const a = this.state.stack.pop();
                    const b = this.state.stack.pop();
                    this.state.stack.push(a + b);
                    break;
                case MUL:
                    const c = this.state.stack.pop();
                    const d = this.state.stack.pop();
                    this.state.stack.push(c * d);
                    break;
                case SUB:
                    const e = this.state.stack.pop();
                    const f = this.state.stack.pop();
                    this.state.stack.push(e - f);
                    break;
                case DIV:
                    const g = this.state.stack.pop();
                    const h = this.state.stack.pop();
                    this.state.stack.push(c / d);
                    break;
                case JUMP:
                    this.jump();
                    break;
                case JUMPI:
                    const condition = this.state.stack.pop();
                    if(condition == 1){
                        this.jump();
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            if(error.message === "Operation Sucessfully"){
            return this.state.stack[this.state.stack.length-1];
            }
            throw error;
        }
        this.state.counter++;
        }
    }
}
const opcode = [PUSH,6,JUMP,PUSH,0,JUMP,PUSH,"HI",STOP];
const solutionn = new solution();
const result = solutionn.runInstruction(opcode);
console.log(result);


