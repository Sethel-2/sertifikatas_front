export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const matches = emailRegex.test(email)
    return { isValid: matches, error: 'Neteisingai įvestas el. paštas' }
}

export const validatePhone = (phone) => {
    const phoneRegex = /^\+370\d{8}$/
    const matches = phoneRegex.test(phone)
    return { isValid: matches, error: 'Neteisingai įvestas telefono numeris'}
}

export const validateOnlyLetters = (value, error) => {
    const letterRegex = /^[A-Za-ząčęėįšųūž]+$/
    const matches = letterRegex.test(value)
    return { isValid: matches, error }
}

export const validatePassword = (password) => {
    const isValid = password.length >= 8 && password.length <= 20
    return { isValid, error: 'Neteisingas slaptažodžio ilgis, turi būti tarp 8 ir 20 simbolių' }
}

export const validateRepeatPassword = (password, repeatPassword) => {
    return { isValid: password === repeatPassword && password !== '', error: 'Slaptažodžiai nesutampa' }
}