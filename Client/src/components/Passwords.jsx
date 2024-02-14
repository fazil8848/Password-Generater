import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Loader } from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { generatePass } from "../api/userApi";
import Header from "./Header";
import Table from "./Table";

const Passwords = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);
  const [password, setPassword] = useState("");
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allPassWords, setAllPassWords] = useState([]);

  const [passwordLength, setPasswordLength] = useState(8);

  const handlePassword = async (e) => {
    e.preventDefault();

    try {
      if (!lower && !upper && !number && !symbols) {
        toast.error("Please add input!");
      } else {
        setLoading(true);
        const { data } = await generatePass({
          lower,
          upper,
          number,
          symbols,
          passwordLength,
          user: userInfo._id,
        });

        console.log(data);
        if (data.genarate) {
          setPassword(data.password);
          setAllPassWords(data.allPasswords);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (password) {
      toast.success("Copied..");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className=" flex justify-center items-center min-h-[80vh] ">
        <div className="w-max mx-auto text-black   p-5 border-2 border-blue-gray-600 rounded-tl-2xl rounded-br-2xl">
          <form action="" onSubmit={handlePassword}>
            <h2 className="text-lg font-medium text-center mb-4">
              Password Generator
            </h2>
            <div className="password-wrapper">
              <div className="password-area">
                <div
                  className={`flex password bg-blue-gray-100 p-4 rounded-md shadow-md`}
                >
                  <>
                    <input
                      type="text"
                      defaultValue={password}
                      className="w-full bg-transparent outline-none"
                    />
                    <XMarkIcon
                      className="w-8 cursor-pointer"
                      onClick={() => setPassword("")}
                    />
                  </>
                </div>
              </div>
            </div>
            <div className="setting mt-6">
              <h3 className="text-md font-semibold mb-2">
                Customize your password
              </h3>
              <div className="">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="lower"
                    className="mr-2"
                    defaultChecked={lower}
                    onClick={() => setLower(!lower)}
                  />
                  <label htmlFor="lower">Include LowerCase (a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="upper"
                    className="mr-2"
                    defaultChecked={upper}
                    onClick={() => setUpper(!upper)}
                  />
                  <label htmlFor="upper">Include UpperCase (A-Z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="numbers"
                    className="mr-2"
                    defaultChecked={number}
                    onClick={() => setNumber(!number)}
                  />
                  <label htmlFor="numbers">Include Numbers (0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="symbols"
                    className="mr-2"
                    defaultChecked={symbols}
                    onClick={() => setSymbols(!symbols)}
                  />
                  <label htmlFor="symbols">Include Symbols (&-#)</label>
                </div>
              </div>
            </div>
            <div className="password-length mt-6">
              <h3 className="text-md font-semibold mb-2">Password Length</h3>
              <div className="flex items-center">
                <p className="rangeValue text-sm">{passwordLength}</p>
                <div className="flex-1 ml-4">
                  <input
                    type="range"
                    min={8}
                    max={40}
                    defaultValue={passwordLength}
                    onChange={(e) => setPasswordLength(e.currentTarget.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="buttons mt-6">
              <CopyToClipboard onCopy={handleCopy} text={password}>
                <button
                  type="button"
                  className="py-2 px-4 bg-white text-black hover:text-white hover:bg-black border hover:shadow-lg rounded-md shadow-md mr-4"
                >
                  Copy Password
                </button>
              </CopyToClipboard>

              <button
                type="submit"
                className="py-2 px-4 bg-black text-white hover:text-black hover:bg-white hover:shadow-lg border rounded-md shadow-md"
              >
                Generate Password
              </button>
            </div>
          </form>
          <Toaster />
        </div>
      </div>
      <Table allPassWords={allPassWords} setAllPassWords={setAllPassWords} />
    </>
  );
};

export default Passwords;
