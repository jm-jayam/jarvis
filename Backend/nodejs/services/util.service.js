const { to } = require('await-to-js');
// const fast2sms = require("fast-two-sms");
// const newOTP = require("otp-generators");

module.exports.to = async(promise)=>{
    let err,res;
    [err, res] = await to(promise);
    if (err) return [err, null];
    return [null, res];
}

module.exports.ReS=function(res,data,code){
    let send_data = { success: true };
    if (typeof data === 'object') send_data = Object.assign(data, send_data);
    if (typeof code !== 'undefined') res.statusCode = code;
    else { res.statusCode = 400 }
    return res.json(send_data);
}

module.exports.ReE=function(res,err,code){
    if (typeof err === 'object' && err.message !== 'undefined') err = err.message;
    if (typeof code !== 'undefined') res.statusCode = code;
    return res.json({ success: false, error: err });
}

module.exports.TE = function (err_message, log) {
    if (log === true) {
        console.error(err_message)
    }
    throw new Error(err_message);
}

module.exports.isNull = function (field) {
    return (
        typeof field === 'undefined' ||
        field === 'undefined' ||
        field === "" ||
        field === null
    )
}

module.exports.isEmpty = function (obj) {
    return !Object.keys(obj).length > 0;
}

module.exports.validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// module.exports.sendOtp = async (req, res) => {
//   const phone_No = req.body.phonenumber;
//   // Production
// //   const APi_Key =
// //     "nmbAq54FwC09fzQruLIklhaxWgMSs3UYDNJcXEZvBt8Vjo6dieJFkt5TDd9mIS20vezMNwRUPA3CYr76";
//   // Developer Purpose
//   const otp = newOTP.generate(6, {
//     alphabets: false,
//     upperCase: false,
//     specialChar: false,
//   });
//   const APi_Key =
//     "NI4MfJqVnihAvSlbEUH76BDm3XzwOsaCkxPr9Z0WyTctp2eLFj7kjG1wRr0DxeQBI3gVTFS6Cc2dyWsU";
//   fast2sms
//     .sendMessage({
//       authorization: `${APi_Key}`,
//       message: `Your Password Manager OTP is ${otp} `,
//       numbers: [phone_No],
//     })
//     .then(() => {
//         this.ReS(res,{phone_No, code: otp},200);
//     })
//     .catch((err) => this.ReE(res, err, 500));
// };

module.exports.containsSpecialChars = (str) => {
    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;  
    const result = specialChars.split('').some(specialChar => {
      if (str.includes(specialChar)) {
        return true;
      }
  
      return false;
    });
    return result;
}