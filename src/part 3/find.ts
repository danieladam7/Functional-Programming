import { find, values } from "ramda";
import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred:(x:T) => boolean, a:T[]): Result<T> =>{
    try{
        const x = findOrThrow(pred,a);
        const ret:Result<T> = {tag:"Ok",value:x};
        return ret;
    }
    catch(e){
        const ret:Result<T> = {tag:"Failure",message:"You don't always get what you want."};
        return ret;
    }
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> =>
    bind(findResult((x:number) => x%2==0,a),(x:number) => {
        const ret:Result<number> = {tag:"Ok", value: x*x};
        return ret;
    });

export const returnSquaredIfFoundEven_v3 = (a: number[]): number =>
    either(findResult((x:number) => x%2==0,a),(x:number) => x*x, (x:string) => -1);