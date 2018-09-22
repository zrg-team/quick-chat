export const MODULE_NAME = 'user'

export const signupValidate = {
  'email': {
    presence: true,
    email: true
  },
  'password': {
    length: {minimum: 6}
  }
}

export const emailValidate = {
  'email': {
    presence: true,
    email: true
  }
}

export const passwordValidate = {
  'password': {
    length: {minimum: 6}
  }
}
