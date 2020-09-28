//random email function is the function for generating random email

export var randomEmail = Math.random().toString(36).substring(2, 7) + '@test.com';


//random string function is the function for generating random alphabetical string

export var randomAlphabeticalString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
