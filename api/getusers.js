export function getUsers(){
    let api = fetch("http://3.109.162.131:3000/user/get_by_email?email=riyayadav7112@gmail.com")
    api.then((response)=>{
        return response.json()
    }).then((response2)=>{
        console.log(response2)
    })
}
