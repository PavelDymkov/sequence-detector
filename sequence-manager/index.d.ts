import { EventEmitter } from "events";

export declare class SequenceManager extends EventEmitter {
    add(name: string | symbol, sequence: any[]): void;
    push(value: any): void;
}
export declare function timeout(ms: number);
