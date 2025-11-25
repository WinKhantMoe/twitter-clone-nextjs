export const Register = (data) =>{
  
  return fetch(process.env.NEXT_PUBLIC_DATABASE_URL + "/auth/register",{
    method:"POST",
    body:JSON.stringify(data),
    headers : {
      "Content-Type" : "application/json",
      Accept : "*/*"
    }
  })
}

export const Login = (data) =>{
  return fetch(process.env.NEXT_PUBLIC_DATABASE_URL + "/auth/login",{
    method:"POST",
    body:JSON.stringify(data),
    headers : {
      "Content-Type" : "application/json",
      Accept : "*/*"
    }
  })
}