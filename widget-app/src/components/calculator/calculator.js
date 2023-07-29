import React, { useState } from "react";

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");

    const handleButtonClick = (value) => {
        if (value === "=") {
            try {
                setResult(eval(expression).toString());
            } catch (error) {
                setResult("Error");
            }
            setExpression("");
        } else if (value === "C") {
            setExpression("");
            setResult("");
        } else {
            setExpression((prev) => prev + value);
        }
    };

    return (
        <div className="calculator">
            <div className="calculator-display">{expression ? expression : result ? result : "0"}</div>
            <div className="calculator-buttons">
                <button onClick={() => handleButtonClick("7")}>7</button>
                <button onClick={() => handleButtonClick("8")}>8</button>
                <button onClick={() => handleButtonClick("9")}>9</button>
                <button onClick={() => handleButtonClick("+")}>+</button>
                <button onClick={() => handleButtonClick("4")}>4</button>
                <button onClick={() => handleButtonClick("5")}>5</button>
                <button onClick={() => handleButtonClick("6")}>6</button>
                <button onClick={() => handleButtonClick("-")}>-</button>
                <button onClick={() => handleButtonClick("1")}>1</button>
                <button onClick={() => handleButtonClick("2")}>2</button>
                <button onClick={() => handleButtonClick("3")}>3</button>
                <button onClick={() => handleButtonClick("*")}>*</button>
                <button onClick={() => handleButtonClick("0")}>0</button>
                <button onClick={() => handleButtonClick(".")}>.</button>
                <button onClick={() => handleButtonClick("=")}>=</button>
                <button onClick={() => handleButtonClick("C")}>C</button>
                <button onClick={() => handleButtonClick("/")}>/</button>
            </div>
        </div>
    );
};

export default Calculator;
