const url = process.env.NEXT_PUBLIC_DATABASE_URL ;

export const createTweet = (data,token) =>{
    fetch(url + "/tweets/createTweet",{
        method:"POST",
        body:JSON.stringify(data),
        headers : {
          "Content-Type" : "application/json",
          Accept : "*/*",
          Authorization : `Bearer ${token}`

        }
      })
}
export const fetchTweets = (key,token) =>{
  return fetch(key,{
    method:"GET",
    headers : {
      "Content-Type" : "application/json",
      Accept : "*/*",
      Authorization : `Bearer ${token}`
    }
  }).then(res => res.json())
}