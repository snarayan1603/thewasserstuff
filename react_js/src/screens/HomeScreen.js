import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function HomeScreen() {

    // defining state variable for username and setting initial value to empty
    const [userName, setUserName] = useState("")

    //defining naviagate used for changing the screen or content of the page as per url
    const navigate = useNavigate()


    // onSubmit the form this function will be called
    const submitHandler = async (e) => {
        e.preventDefault()

        const { data } = await axios.post("/api/user/check-usernanme", { userName })
        console.log(data)
        if (data && data._id)
            navigate(`/user/${data._id}`)

    }

    return (
        <div className='row'>
            <div className='mainDiv'>
                <form onSubmit={submitHandler} className="form">

                    <label>User Name</label>
                    <input type="text" className="input" placeholder="Kindly enter user name" value={userName} onChange={(e) => setUserName(e.target.value)}></input>

                    <button className='button'>Submit</button>

                </form>
            </div>
        </div>
    )
}
