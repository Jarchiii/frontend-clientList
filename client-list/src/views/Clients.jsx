import React,  {useState, useEffect} from 'react'
import APIHandler from "../api/APIHandler";
import ClientsList from "../components/ClientsList";



export default function Clients() {
    console.log("ici")
    const [clients , setClients] = useState([{
        genre: "Mr",
        firstname: "Jonathan",
        lastname: "Oreja",
        mail: "a@a.com",
        address: "blabla",
    },
])

console.log("ici2")
    useEffect(()=> {
    
        APIHandler.get("/clients")
        .then(apiRes => {
            // const data = [...apiRes.data]
            setClients(apiRes.data)
        })
        .catch(apiErr => console.log(apiErr));
        return () => {};
    }, []);

    console.log("làààà", setClients)
    
    return (
        <div>
            <div className="fullScreen">
              <ClientsList clientsList={clients} handleClients={setClients}/>
            </div>
        </div>
    )
}
