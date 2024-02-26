import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function NewApp() {
    const [phoneValue, setPhoneInputValue] = useState("");
    const [nameValue, setNameInputValue] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [selectedData, setSelectedData] = useState(null);

    const navigate = useNavigate();


    const handlePhoneChange = (e) => {
        setPhoneInputValue(e.target.value);
    };

    const handleNameChange = (e) => {
        setNameInputValue(e.target.value);
    };


    const handlePhoneSelection = async () => {
        try {
            const url = `http://localhost:8080/phoneSelect/?phone=${phoneValue}`;
            const response = await fetch(url);
            if (!response.ok) {
                // Handle non-successful response (status other than 200)
                console.error(`Request failed with status: ${response.status}`);
                return;
            }
            const responseBody = await response.text();
            const parsedData = JSON.parse(responseBody);
            setSearchResults(parsedData);

        } catch (error) {
            console.error("Error while fetching or parsing data:", error);
        }

    };


    const handleNameSelection = async () => {
        try {
            const url = `http://localhost:8080/nameSelect/?name=${nameValue}`
            const response = await fetch(url);
            if (!response.ok) {
                // Handle non-successful response (status other than 200)
                console.error(`Request failed with status: ${response.status}`);
                return;
            }
            const responseBody = await response.text();
            const parsedData = JSON.parse(responseBody);
            setSearchResults(parsedData);

        } catch (error) {
            console.error("Error while fetching or parsing data:", error);
        }

    };


    const handleConfirmSelection = () => {
        // Navigate to the main page with the selected data
        navigate(`/${selectedData.expertId}`);
    };

    // const handleSelectPerson = (selectedPerson) => {
    //     // Handle the selection event
    //     updateDataFromNewApp(selectedPerson);
    // };


    return (
        <div>
            <input
                type="text"
                placeholder="输入手机号"
                value={phoneValue}
                onChange={handlePhoneChange}
            />
            <button onClick={handlePhoneSelection}>搜索</button>
            <h4>或者</h4>
            <input
                type="text"
                placeholder="输入姓名"
                value={nameValue}
                onChange={handleNameChange}
            />
            <button onClick={handleNameSelection}>搜索</button>

            {/* Display the search results in a table if available */}
            {searchResults && (
                <div>
                    <p>搜索结果：</p>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>专家ID</th>
                            <th>专家姓名</th>
                            <th>专家手机号</th>
                            <th>专业类别</th>
                            <th>身份证号</th>
                            <th>公司名称</th>
                            <th>备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((expert) => (
                            <tr key={expert.expertId}>
                                <td>{expert.expertId}</td>
                                <td>{expert.expertName}</td>
                                <td>{expert.expertPhone}</td>
                                <td>{expert.expertMajor}</td>
                                <td>{expert.expertCard}</td>
                                <td>{expert.expertCompany}</td>
                                <td>{expert.expertCommand || "N/A"}</td>
                                <td>
                                    <button onClick={() => handleSelectPerson(expert)}>
                                        选择
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Display selected data and confirm button */}
            {selectedData && (
                <div>
                    <p>已选择的数据：</p>
                    <pre>{JSON.stringify(selectedData, null, 2)}</pre>
                    <button onClick={handleConfirmSelection}>确认选择</button>
                </div>
            )}


        </div>
    );
}

export default NewApp;
