export default function login_validate(values){
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      //Vakudation for password

      if(!values.password) {
        errors.password = "Required";

      }else if(values.password.length < 8 || values.password.length>20) {
        errors.password = "Minimo 8 caracteres y maximo 20 "
      }else if(values.password.includes(" ")){
        errors.password = "Invalid password"
      }


      return errors;

}

export function registerValidate(values){
    const errors={};

    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      //Vakudation for password

      if(!values.password) {
        errors.password = "Required";

      }else if(values.password.length < 8 || values.password.length>20) {
        errors.password = "Minimo 8 caracteres y maximo 20 "
      }else if(values.password.includes(" ")){
        errors.password = "Invalid password"
      }

      //Validate confirm password
      if(!values.cpassword){
        errors.cpassword = "Required";

      }else if(values.password !== values.cpassword){
        errors.cpassword = "Las contraseñas no coinciden"
      }else if(values.cpassword.includes(" ")){
        errors.cpassword = "Invalid password"
      }

      return errors; 

}