const url = process.env.NEXT_PUBLIC_DATABASE_URL ;

export const toggleLike = (data,token) =>{
     return fetch(url + "/likes/toggleLike",{
          method:"POST",
          body:JSON.stringify(data),
          headers : {
            "Content-Type" : "application/json",
            Accept : "*/*",
            Authorization : `Bearer ${token}`
  
          }
        })
}