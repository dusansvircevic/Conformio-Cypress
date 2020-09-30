//random email function is the function for generating random email
export let randomEmail = Math.random().toString(36).substring(2, 7) + '@test.com';

//random email function is the function for generating random password
export let randomPassword = Math.random().toString(36).substring(2, 9);

//random string function is the function for generating random alphabetical string
export let randomAlphabeticalString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
