const { validateRoute } = require("express-ajv-middleware");
const { INTEGER } = require("sequelize");
const signInValidator = () => {
  return validateRoute({
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          nullable: false,
          minLength: 3,
          maxLength: 100,
          errorMessage: "User Name is not valid",
        },
        password: {
          type: "string",
          nullable: false,
          minLength: 5,
          maxLength: 100,
          errorMessage: "Password is not valid",
        },
        deviceToken: {
          type: "string",
          nullable: false,
          errorMessage: "Device Tokens is not valid",
        },
      },
      additionalProperties: false,
    },
  });
};

const signUpValidatorUser = () => {
  return validateRoute({
    body: {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "password",
        "email",
        "phone",
        "userName",
        "userType",
      ],
      additionalProperties: false,
      properties: {
        firstName: {
          type: "string",
          nullable: false,
          minLength: 2,
          maxLength: 100,
          errorMessage: "First Name is not valid",
        },
        lastName: {
          type: "string",
          nullable: false,
          minLength: 2,
          maxLength: 100,
          errorMessage: "Last Name is not valid",
        },
        userName: {
          type: "string",
          nullable: false,
          minLength: 2,
          maxLength: 100,
          errorMessage: { message: "userName is Not Valid" },
        },
        email: {
          type: "string",
          nullable: false,
        },
        password: {
          type: "string",
          nullable: false,
          minLength: 5,
          maxLength: 100,
          errorMessage: "Password is not valid",
        },
        userType: {
          type: "string",
          nullable: false,
          errorMessage: "userType is not valid",
        },
        phone: {
          type: "string",
          nullable: true,
          errorMessage: "userType is not valid",
        },
      },
    },
  });
};
const signUpValidatorCoach = () => {
  return validateRoute({
    body: {
      type: "object",
      required: ["firstName", "lastName", "email"],
      additionalProperties: false,
      properties: {
        firstName: {
          type: "string",
          nullable: false,
          minLength: 2,
          maxLength: 100,
          errorMessage: "First Name is not valid",
        },
        lastName: {
          type: "string",
          nullable: false,
          minLength: 2,
          maxLength: 100,
          errorMessage: "Last Name is not valid",
        },
        email: {
          type: "string",
          nullable: false,
        },
      },
    },
  });
};

module.exports = {
  signInValidator,
  signUpValidatorUser,
  signUpValidatorCoach,
};
