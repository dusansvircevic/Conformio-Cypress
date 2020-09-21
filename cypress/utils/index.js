//radnom email function is the function for generating random email
const randomEmail = () => {
    return (
        Math.random()
        .toString(36)
        .substr(2, 4) + '@test.com'
    );
}

export var email = randomEmail()



//random string function is the function for generating random string
const randomString = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 export var companyName = randomString(5)