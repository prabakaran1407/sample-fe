// For nested and nested type


export type TObj = Record<string,  unknown | unknown >

export type TNormal = number | string | boolean | [] | typeof Object 

export type TNRArray = Array<number> | Array<string> | Array<boolean> 

export type TArrayObj =  Array<Record<string, TObj>>  

export type TNestedObj = Record<string, 
unknown | 
Record<string, unknown> | 
Record<string, unknown>[] | 
number | 
boolean |
string |
[] |
TNormal >


export type IConfig = Record<string, string | Array<Record<string, unknown>> | boolean | number | Record<string, unknown>>

export type Ipayload = Record<string, string | Array<Record<string, unknown>> | boolean | Date | number | Record<string, unknown>> | Record<string, string | Array<Record<string, unknown>> | boolean | number | Record<string, unknown> | typeof Date>[] | FormData

export const getTypeOfData = (value: unknown | TNormal) => typeof value