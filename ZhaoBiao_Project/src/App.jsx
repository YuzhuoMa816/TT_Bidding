import React, {useEffect, useState} from "react";

function App(){
    const [testData, setTestData] = useState([])


    useEffect(() => {
        fetch('http://localhost:8080/expert')
            .then(res => res.json())
            .then(data => setTestData(data))
            .catch(err => console.log(err));
    }, []);
    return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {testData.map((d, i)=>(
                    <tr key={i}>
                        <td>{d.expertId}</td>
                        <td>{d.expertName}</td>
                    </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )
}

export default App
