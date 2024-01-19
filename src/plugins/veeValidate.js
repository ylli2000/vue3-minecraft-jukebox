import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  email,
  numeric,
  min,
  max,
  min_value,
  max_value,
  alpha_spaces,
  not_one_of,
  confirmed,
  regex
} from '@vee-validate/rules'
//to keep things lean vee-validate separates the rules into separate package.
//use 'defineRule' to add the rules you need to your project
export default {
  install(app) {
    //, options) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('email', email)
    defineRule('numeric', numeric)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('confirmed', confirmed)
    defineRule('excluded', not_one_of)
    //this is an example to show how to use rules on different fields
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('email_format', regex)
    defineRule('password_format', regex)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          tos: `You must accept the Terms of Service.`,
          required: `The field ${ctx.field} is required.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetic characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          numeric: `The field ${ctx.field} may only contain numeric characters.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          confirmed: `The field ${ctx.field} does not match.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          //this is an example to show how to use rules on different fields
          email_format: `The field ${ctx.field} is not valid.`,
          password_format: `The field ${ctx.field} is not valid.`
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
        return message
      },

      validateOnInput: false, // to validate on each input event
      validateOnChange: true, // to validate on each input/change event
      validateOnBlur: true, // to validate on each blur event
      validateOnModelUpdate: true // to validate on each model update
    })
  }
}
