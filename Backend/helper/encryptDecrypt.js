var CryptoJS = require("crypto-js");

exports.encrypt = (text)=>{
    return CryptoJS.AES.encrypt(text, process.env.REACT_APP_LOCAL_CRYPTO_SECRET).toString();
}
exports.decrypt = (text)=>{
    var bytes  = CryptoJS.AES.decrypt(text, process.env.REACT_APP_LOCAL_CRYPTO_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}