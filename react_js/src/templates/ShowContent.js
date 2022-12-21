import React from 'react'

export default function ShowContent(props) {

    let topicData = props.topicData;

    // it will calculate the Percentage of understanding
    function calculatePercentage(descArray) {

        const pointsSum = descArray.reduce((a, c) => a + c.rating, 0)
        const percentage = pointsSum / (descArray.length * 4) * 100        
        return percentage.toFixed(2) + " %"

    }

    return (
        <div>
            <div className='row center' style={{ justifyContent: "center", alignItems: "center", cursor: "pointer", border: "1px solid black", marginTop: "1rem", flexDirection: "column" }}>
                <p >TOPIC LIST:</p>

                {/* showing all topics using map method  */}
                {topicData && topicData.map((x, i) => (
                    <p key={i}>{x.name} : {calculatePercentage(x.descArray)}</p>
                ))}

            </div>

        </div>
    )
}
