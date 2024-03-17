export const setAuthToken = (token) =>{
    localStorage.setItem("setToken", token)
}

export const removeAuthToken = () =>{
    localStorage.removeItem("setToken")
    localStorage.removeItem("isAdmin")
}

export const getAuthToken = () => {
    return localStorage.getItem("setToken")
}


export const setAdmin = (Admin) =>{
    localStorage.setItem("isAdmin", JSON.stringify(Admin))
}

export const getAdmin = () => {
    return JSON.parse(localStorage.getItem("isAdmin"))
}

