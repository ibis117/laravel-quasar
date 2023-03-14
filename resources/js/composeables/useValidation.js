
export function useValidation() {
    

    const rules = {
        required: value => required(value) ,
        minLength: (val, number) => validateMinLength(val, number),
    }

    const required = (value) => {
        return !!value || 'required'
    }

    const validateMinLength = (value, rule=5) => {
        let isSatisfied = ''
        if (value.length > rule) {
            isSatisfied =  true
        } else {
            isSatisfied = 'at-least ${rule} characters'
        }



        return isSatisfied;
    }

    return {rules}

    // return {
    //   required: value => !!value || 'required',
    //   minLength: value => value && value.length > 5 || 'Phone no should be at-least 6 characters' || true,
    //   // futureDate: value => moment(value).isAfter(moment.now()) || 'Invalid Date.',
    //   // passportValidityDate: value => moment(value).isAfter(moment.now()) || 'Validity Date cannot be of past.',
    //   // dobValidityDate: value => moment(value).isBefore(moment.now()) || 'Date of birth cannot be of the future ',
    //   // certificationDate: value => moment(value).isBefore(moment.now()) || 'Certification date cannot be of the future ',
    //   // maximumDays: value => value && parseInt(value) < 9999 || 'Maximum days is 9999',
    //   // multipleFileRequired: value => {
    //   //   let message = 'Required'
    //   //   if (value.length > 0) {
    //   //     message = true
    //   //   }
    //   //   return message
    //   // },
    //   // fileRequired: value => {
    //   //   let message = 'Required'
    //   //   if (value) {
    //   //     if (value.name !== undefined) {
    //   //       message = true
    //   //     }
    //   //   }
    //   //   return message
    //   // },
    //   // email: [v => !!v || 'E-mail is required', v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'],
    //   // mobileNumberValidation: value => /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(value) || 'Number must be valid',
    //   // validPhoneNumber: v => /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/.test(v) || 'Phone Number must be valid',
    //   // dobValidation: value => /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value) || 'DOB must be valid',
    //   // emptyString: value => trim(value) !== '' || 'Please insert some text. Empty spaces are not allowed.',
    //   // positiveNumbers: value => value && value >= 0 || 'Please enter positive number',
    //   // positiveNullableNumbers: value => !value || (value && (value >= 0)) || 'Please enter positive number.',
    //   // max255Characters: value => /^[\s\D\w.]{1,255}$/.test(value) || 'Please enter less than or equals to 255 characters.',
    //   // max1000Characters: value => /^[\s\D\w.]{1,1000}$/.test(value) || 'Please enter less than or equals to 1000 characters.',
    //   // nullableMax50Characters: value => !value || (value && /^[\s\D\w.]{1,50}$/.test(value)) || 'Please enter less than or equals to 50 characters.',
    //   // nullableMax255Characters: value => !value || (value && /^[\s\D\w.]{1,255}$/.test(value)) || 'Please enter less than or equals to 255 characters.',
    //   // nullableMax1000Characters: value => !value || (value && /^[\s\D\w.]{1,1000}$/.test(value)) || 'Please enter less than or equals to 1000 characters.',
    // }
}

