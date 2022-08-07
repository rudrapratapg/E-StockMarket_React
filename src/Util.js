const at_least_one_upper_case = /^(?=.*?[A-Z])$/;
const at_least_one_upper_case_helperText = 'at_least_one_upper_case';

const at_least_one_lower_case_English_letter = /^(?=.*?[a-z])$/;
const at_least_one_lower_case_English_letter_helperText = 'at_least_one_lower_case_English_letter';

const at_least_one_digit = /^(?=.*?[0-9])$/;
const at_least_one_digit_helperText = 'at_least_one_digit';

const at_least_one_special_character = /^(?=.*?[#?!@$%^&*-])$/;
const at_least_one_special_character_helperText = 'at_least_one_special_character';

const minimum_eight_in_length = /^.{8,}$/;
const minimum_eight_in_length_helperText = 'minimum_eight_in_length';

const regexJson ={
    "at_least_one_upper_case":{pattern:at_least_one_upper_case , helperText:at_least_one_upper_case_helperText},
    "at_least_one_lower_case_English_letter":{pattern:at_least_one_lower_case_English_letter , helperText:at_least_one_lower_case_English_letter_helperText},
    "at_least_one_digit":{pattern:at_least_one_digit , helperText:at_least_one_digit_helperText},
    "at_least_one_special_character":{pattern:at_least_one_special_character , helperText:at_least_one_special_character_helperText},
    "minimum_eight_in_length":{pattern:minimum_eight_in_length , helperText:minimum_eight_in_length_helperText},
};

export const validatePassword = (passwordStr)=> {
    for(var regexJsonKey in regexJson){
        //console.log('regexJsonKey :: ',regexJsonKey,'| json :: ',regexJson[regexJsonKey]);
        var tempJson = regexJson[regexJsonKey];
        var regex = tempJson.pattern;
        var helperText = tempJson.helperText;
        //console.log('regex :: ',regex , '| helperText :: ',helperText);
        console.log('Password :: ',passwordStr,' | Result : ',regex.test(passwordStr),' | helperText : ',helperText);
        if(!regex.test(passwordStr)){
            return helperText;
        }
        return true;
    }
}
//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$
//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

export const validatePassword2= (passwordStr)=> {
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(!regex.test(passwordStr)){
        return false;
    }
    return true;
}

export const validateEmail =(emailStr)=>{
    var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    console.log('validateEmail:: '+emailStr+':',(regex.test(emailStr)))
    if(!regex.test(emailStr)){
        return false;
    }
    return true;
}

export const validateUserFullName =(fullNameStr)=>{
    var regex = /^[A-Za-z ]+$/;
    if(!regex.test(fullNameStr)){
        return false;
    }
    return true;
}