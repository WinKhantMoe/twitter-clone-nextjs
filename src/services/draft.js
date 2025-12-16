const url = process.env.NEXT_PUBLIC_DATABASE_URL ;

export const saveDraft = (data,token) =>{
    fetch(url + "/drafts/saveDraft",{
        method:"POST",
        body:JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json",
          Accept : "*/*",
          Authorization : `Bearer ${token}`

        }
      })
}
export const fetchDrafts = (key,token) =>{
  return fetch(key,{
    method:"GET",
    headers : {
      "Content-Type" : "application/json",
      Accept : "*/*",
      Authorization : `Bearer ${token}`
    }
  }).then(res => res.json())
}
export const deleteDrafts = (data,token) =>{
    fetch(url + "/drafts/deleteDrafts",{
        method:"DELETE",
        body:JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json",
          Accept : "*/*",
          Authorization : `Bearer ${token}`

        }
      })
}
export const deleteSingleDraft = (data,token) =>{
    fetch(url + "/drafts/deleteSingleDraft",{
        method:"DELETE",
        body:JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json",
          Accept : "*/*",
          Authorization : `Bearer ${token}`

        }
      })
}