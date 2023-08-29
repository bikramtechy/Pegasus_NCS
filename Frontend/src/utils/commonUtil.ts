import { decrypt } from "./encryptDecrypt";


export function authToken() {
    let item = localStorage.getItem("item")
    item = decrypt(item)
    if (!item) { return false }
    let token = JSON.parse(item).token
    if (token) { return token }
    return false
}

export function bmiCalc(weight={value:0,measureType:"kg"},height={value:0,measureType:"m"}){
    let newValue = 0;
    let weightValue = Number(weight.value);
    let heightValue = Number(height.value);
    if (weightValue <= 0 && heightValue <= 0) {
       newValue = 0;
    } else {
       if (weight.measureType === "lbs") {
          // lbs into kg
          weightValue = weightValue / 2.2046
       }
       if (height.measureType === "in") {
          // in into m
          heightValue = heightValue / 39.370
       }
       // Formula: weight (kg) / [height (m)]2
       newValue = weightValue / Math.pow(heightValue, 2);
    }
    return newValue;
 };