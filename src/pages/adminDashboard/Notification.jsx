import React from "react";
import validator from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const Notification = () => {
  const required = (value) => {
    if (!value.toString().trim().length) {
      // We can return string or jsx as the 'error' prop for the validated Component
      return "require";
    }
  };

  const email = (value) => {
    if (!validator.isEmail(value)) {
      return `${value} is not a valid email.`;
    }
  };

  //   const lt = (value, props) => {
  //     // get the maxLength from component's props
  //     if (!value.toString().trim().length > props.maxLength) {
  //       // Return jsx
  //       return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  //     }
  //   };

  //   const password = (value, props, components) => {
  //     // NOTE: Tricky place. The 'value' argument is always current component's value.
  //     // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  //     // But if we're changing 'confirm' component - the condition will always be true
  //     // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  //     if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
  //       // 'confirm' - name of input
  //       // components['confirm'] - array of same-name components because of checkboxes and radios
  //       return <span className="error">Passwords are not equal.</span>
  //     }
  //   };
  return (
    <>
      <div className="text-3xl font-bold text-gray-800 pt-5">Notification</div>
      <Form>
        <div className="grid gap-6 mb-6  lg:grid-cols-3 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <Input
              validations={[required, email]}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <button
              className="btn  h-[40px] text-white bg-[#3051A0] rounded-xl hover:bg-blue-800 "
              onClick={() => console.log("clicked")}
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Notification;
