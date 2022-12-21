import React, { useState } from 'react'
import axios from "axios"

export default function AddNewTopic(props) {

    // defining state variable for open popup
    const [open, setOpen] = useState(false)

    //state variale for data
    const [topicData, setTopicData] = useState({ name: "", desc: "", isDescriptionCategorised: false, _id: props._id })

    //storing delimiters
    const delimiters = [",", "-", "()", "[]", '{}', "''", '""', "/", ';', ':', "?", '.', "|", ".", '\n', "\\"]

    //making backgound dark
    if (open) {
        document.body.style.background = 'rgba(0, 0, 0, 0.2)'
    } else {
        document.body.style.background = "transparent"
    }


    async function submitHandler(e) {
        e.preventDefault()

        // checking errors 
        if (topicData.name === "")
            setTopicData({ ...topicData, error: "Kindly enter topic name" })
        else if (topicData.desc === "")
            setTopicData({ ...topicData, error: "Kindly enter topic description" })

            // if no error then proceed  and categorise the message
        else if (!topicData.isDescriptionCategorised) {

            let descArray = []

            let desc = topicData.desc, startIndex = 0;

            for (let i = 0; i < desc.length; i++) {

                if (delimiters.includes(desc[i])) {
                    descArray.push({ text: desc.substring(startIndex, i), seperatedBy: desc.substring(i, ++i), rating: 0, ratingName: "" })
                    startIndex = i;
                } else if (i === desc.length - 1) {
                    descArray.push({ text: desc.substring(startIndex, i + 1), seperatedBy: "", rating: 0, ratingName: "" })
                }

            }            

            setTopicData({ ...topicData, isDescriptionCategorised: true, descArray, error: "" })


        } else {
            // if message is categorised then save it in mongodb

            const { data } = await axios.post("/api/topic/save", topicData)
            if (data) {
                props.updateTopicData(data.insertedTopicData.value.data)
                setOpen(false)
                setTopicData({ ...topicData, name: "", desc: "", isDescriptionCategorised: false, descArray: [] })
            }

        }


    }

    //function will be used to get random color hexcode
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //this function will close all category popups
    function closeCategoryPopup() {

        let els = document.getElementsByClassName("popuptext");
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove("show")
        }

        els = document.getElementsByClassName("popup")
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove("border")
        }
    }

    //this function will open category popup
    function openCategoryPopup(id1, id2) {

        closeCategoryPopup()

        document.getElementById(id1).classList.toggle("show");
        document.getElementById(id2).classList.toggle("border");

    }

    //this function will set textpreferences
    function setTextPreference(i, val) {

        let tempData = topicData.descArray;

        switch (val) {
            case "UNDERSTOOD": tempData[i].rating = 4; tempData[i].ratingName = "UNDERSTOOD"; break;
            case "SOMEWHAT UNDERSTOOD": tempData[i].rating = 3; tempData[i].ratingName = "SOMEWHAT UNDERSTOOD"; break;
            case "NOT CLEAR": tempData[i].rating = 2; tempData[i].ratingName = "NOT CLEAR"; break;
            case "WHAT RUBBISH": tempData[i].rating = 1; tempData[i].ratingName = "WHAT RUBBISH"; break;
        }

        setTopicData({ ...topicData, descArray: tempData })
        closeCategoryPopup()

    }


    return (
        <div style={{ position: "relative" }}>
            <div className='row center' onClick={() => setOpen(!open)} style={{ justifyContent: "center", alignItems: "center", cursor: "pointer", border: "1px solid black" }}>
                <p >Add New</p>
                <i style={{ fontSize: "2rem", marginLeft: "1rem" }} class="fa fa-plus" aria-hidden="true" ></i>
            </div>

            {/* this is the main popup that will open while clicking on Add New button  */}
            {open &&
                <div className='popupModel'>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Add Topic</h3>
                        <p className='close' onClick={() => setOpen(false)}></p>
                    </div>

                    {topicData.error && <div style={{ padding: "10px", textAlign: "center", color: "red", backgroundColor: "#ffdadb" }}>{topicData.error}</div>}
                    <form className='form' onSubmit={submitHandler}>

                        <label>Topic Name</label>
                        <input type="text" className="input" placeholder="Kindly enter topic name" value={topicData.name} onChange={(e) => setTopicData({ ...topicData, name: e.target.value })}></input>

                        <label>Topic Description</label>
                        {topicData.isDescriptionCategorised
                            ?
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "flex-start", flexWrap: "wrap", cursor: "pointer" }}>
                                {topicData.descArray.map((x, i) => (

                                    <div key={i} className='popup' id={`popup_main${i}`} style={{ color: getRandomColor() }}> {/*this is sencond popup and will open when click on colored text */}

                                        <span onClick={() => openCategoryPopup(`popup${i}`, `popup_main${i}`)}>{x.text}<span style={{ color: "black" }}>{x.seperatedBy}</span></span>

                                        <div class="popuptext" id={`popup${i}`} >
                                            <span onClick={() => setTextPreference(i, "UNDERSTOOD")} style={{ width: "200px", padding: "5px", margin: "5px 4px", background: "green" }}>UNDERSTOOD</span>
                                            <span onClick={() => setTextPreference(i, "SOMEWHAT UNDERSTOOD")} style={{ width: "200px", padding: "5px", margin: "5px 4px", background: "#F6BE00" }}>SOMEWHAT UNDERSTOOD</span>
                                            <span onClick={() => setTextPreference(i, "NOT CLEAR")} style={{ width: "200px", padding: "5px", margin: "5px 4px", background: "blue" }}>NOT CLEAR</span>
                                            <span onClick={() => setTextPreference(i, "WHAT RUBBISH")} style={{ width: "200px", padding: "5px", margin: "5px 4px", background: "red" }}>WHAT RUBBISH</span>
                                        </div>
                                    </div>
                                ))}

                            </div>
                            :
                            <>
                                <textarea className='input' rows={5} value={topicData.desc} onChange={(e) => setTopicData({ ...topicData, desc: e.target.value })} placeholder="Kindly enter topic description"></textarea>
                            </>
                        }


                        <button className='button'>{topicData.isDescriptionCategorised ? "SAVE" : "PROCEED"}</button>

                    </form>
                </div>
            }


        </div>
    )
}
