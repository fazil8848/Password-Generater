import Password from "../models/passwords.js";

const uppercaseList = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps;
})();

const numberList = (() => {
  const numbers = [...Array(10)].map((val, i) => String.fromCharCode(i + 48));
  return numbers;
})();

const symbolList = "!@#$%^&*()-_+=~`[]{}|;:',.<>?";

const lowerCaseList = uppercaseList.map((val) => val.toLowerCase());

export const generatePassword = async (req, res) => {
  try {
    const { lower, upper, number, symbols, passwordLength, user } = req.body;

    let charSet = [];
    if (lower) charSet = charSet.concat(lowerCaseList);
    if (upper) charSet = charSet.concat(uppercaseList);
    if (number) charSet = charSet.concat(numberList);
    if (symbols) charSet = charSet.concat(symbolList.split(""));

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }

    await Password.create({
      password,
      user,
    });

    const allPasswords = await Password.find({ user });
    return res.status(200).json({
      allPasswords,
      genarate: true,
      password,
      message: "Password generator",
    });
  } catch (error) {
    console.log("Error While generating Pass", error.message);
    res.json({ error: "Internal Server Error" }).status(500);
  }
};

export const getPasswords = async (req, res) => {
  try {
    const { id } = req.params;

    const passwords = await Password.find({ user: id });
    return res.status(200).json({ passwords, message: "Password generator" });
  } catch (error) {
    console.log("Error While getting passwords", error.message);
    res.json({ error: "Internal Server Error" }).status(500);
  }
};

export const deletePassword = async (req, res) => {
  try {
    const { id, user } = req.params;
    await Password.findByIdAndDelete(id);
    const passwords = await Password.find({ user });
    return res.status(200).json({passwords, message: "Password Deleted" });
  } catch (error) {
    console.log("Error While getting passwords", error.message);
    res.json({ error: "Internal Server Error" }).status(500);
  }
};
