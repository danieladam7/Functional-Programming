import { mainModule } from "process";
import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */

export const checkIfLetter: (c: string) => boolean = 
    (c: string) => R.length(c) === 1 && (R.length(R.match(/[a-z]/i,c)) != 0 || R.length(R.match(/[A-Z]/i,c)) != 0) ? true : false;

export const filterLetter: (arr:string[]) => string[] =
    (arr: string[]) => arr.filter(checkIfLetter);

export const removeCapitals: (arr:string[]) => string[] =
    (arr: string[]) => arr.reduce((acc:string[],cur:string) => cur==R.toLower(cur)?R.concat(acc,[cur]):R.concat(acc,[R.toLower(cur)]),[]);


export const countLetter: (arr:string[], char:string)=>number = (arr:string[],char:string) =>
    arr.reduce((acc:number,cur:string) => cur==char?acc+1:acc,0);

export const createDict: (arr:string[]) => {} = (arr:string[]) =>
    R.fromPairs(arr.map((cur:string)=>[cur,countLetter(arr,cur)]));
    
export const countLetters: (s: string) => {} = (s: string) => 
    R.pipe(stringToArray,filterLetter,removeCapitals,createDict)(s);

/* Question 2 */
export const checkIfParent: (c: string) => boolean = 
    (c: string) => R.length(c) === 1 && R.length(R.match(/[\(,\),\{,\},\[,\]]/i,c)) != 0 ? true : false;

export const removeNonParents: (arr: string[]) => string[] = 
    (arr: string[]) => arr.filter(checkIfParent);

export const checkIfBalanced: (arr:string[], o:string, c:string) => {open:number, close:number, isGood:boolean} = 
    (arr:string[], o:string, c:string) =>
    arr.reduce((acc:{open:number,close:number,isGood:boolean},cur:string) =>
    {
        const x = {open:(cur==o?acc.open+1:acc.open),close:(cur==c?acc.close+1:acc.close),
            isGood:acc.isGood};
        if(x.open<x.close){
            return {open:x.open,close:x.close,isGood:false};
        }
        else{
            return x;
        }
    }
    ,{open:0,close:0,isGood:true});

export const checkIfAllIsBalanced: (arr:string[]) => boolean = (arr:string[]) =>
    checkIfBalanced(arr,"\(","\)").isGood == true &&
    checkIfBalanced(arr,"\[","\]").isGood == true &&
    checkIfBalanced(arr,"\{","\}").isGood == true &&
    checkIfBalanced(arr,"\(","\)").open == checkIfBalanced(arr,"\(","\)").close &&
    checkIfBalanced(arr,"\[","\]").open == checkIfBalanced(arr,"\[","\]").close &&
    checkIfBalanced(arr,"\{","\}").open == checkIfBalanced(arr,"\{","\}").close;

export const isPaired: (s: string) => boolean = (s: string) =>
    R.pipe(stringToArray,removeNonParents,checkIfAllIsBalanced)(s);

/* Question 3 */
export interface WordTree {//added export must check if this is ok
    root: string;
    children: WordTree[];
}

export const treeToArray:(t:WordTree) => string[] = (t:WordTree): string[] =>
    R.length(t.children) != 0 ? R.concat([t.root],t.children.reduce(
    (acc:string[], cur: WordTree) =>
    R.concat(acc,treeToArray(cur)),[])) : [t.root];

export const treeToSentence = (t: WordTree): string => 
    {
        const words: string[] = treeToArray(t);
        const sentence: string = R.slice(0,-1,(words.reduce((acc:string,cur:string) =>
        R.concat(acc,R.concat(cur," ")),"")));
        return sentence;
    };  