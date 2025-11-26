import useAccountStore from "@/stores/useAccountStore"



export const fetch3Users = async (key,token) =>{
  
  const res = await fetch(key,{
    method:"GET",
    headers : {
      "Content-Type" : "application/json",
      Accept : "*/*",
      Authorization : `Bearer ${token}`
    }
    })

    if(!res.ok){throw new Error('Failed to fetch data');}

    return res.json();
}


export const fetchSingleUserId = async (id,token) =>{
    return await fetch(process.env.NEXT_PUBLIC_DATABASE_URL + "/users/" + id,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json",
        Accept : "*/*",
        Authorization : `Bearer ${token}`
      }
    })
}