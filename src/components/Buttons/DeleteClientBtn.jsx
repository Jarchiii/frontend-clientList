import React from 'react'
import APIHandler from '../../api/APIHandler'

function DeleteClientBtn({clientToDelete, handleClients}) {
    console.log("handleclient",handleClients)

    const handleSubmit = async evt => {
        evt.preventDefault();
        console.log(clientToDelete)
        try {
          const apiRes = await APIHandler.delete(
            `/clients/${clientToDelete._id}`
          );
        } catch (apiErr) {
          console.log(apiErr);
        }
        try {
             await APIHandler.get('/clients')
            .then((apiRes) => {
                console.log(apiRes.data)
                handleClients(apiRes.data)});

        } catch (apiErr) {
            console.log(apiErr);
          }
      };

    return (
        <div>
          <form   onSubmit={handleSubmit}>
              <button>-</button>
          </form>
            
        </div>
    )
}

export default DeleteClientBtn