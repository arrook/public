export const validate = {
  email: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  phone: (phone: string) => {
    const regex = /^1[3-9]\d{9}$/
    return regex.test(phone)
  },

  password: (password: string) => {
    return password.length >= 6
  }
}