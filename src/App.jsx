import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(1);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";

    //string which is used in password
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~`@#$%^&*()+={}?";

    //iterating on string
    for (var i = 1; i <= range; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [range, numberAllowed, charAllowed, setPassword]);
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
  };

  //Calling useEffect
  useEffect(() => {
    passwordGenerator();
  }, [range, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="">
      <h1 className="text-center text-white text-3xl m-4">
        Password Generator
      </h1>
      <div className=" bg-gray-800 text-orange-700 m-auto p-10 w-2/3 h-auto ">
        {" "}
        <div className="flex justify-center items-center">
          <input
            placeholder="Password..."
            className="w-[80%] bg-slate-100 rounded-md p-2"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className="bg-blue-800 text-white p-2 rounded-md "
            onClick={copyToClipboard()}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center mt-4 gap-x-3 ">
          <input
            type="range"
            className="cursor-pointer"
            min={0}
            max={30}
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
            }}
          />
          length:{range}
          <input
            type="checkbox"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />{" "}
          number
          <input
            type="checkbox"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />{" "}
          character
        </div>
      </div>
    </div>
  );
};

export default App;
