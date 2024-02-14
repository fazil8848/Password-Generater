import React, { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deletePassword, getPassword } from "../api/userApi";

const TABLE_HEAD = ["PassWord", "Time", "Date", "Length", "Delete"];

const Table = ({ allPassWords, setAllPassWords }) => {
  const { userInfo } = useSelector((state) => state.user);

  const getPasses = async () => {
    const { data } = await getPassword(userInfo?._id);
    if (data.passwords) {
      setAllPassWords(data.passwords);
    } else {
      toast.error("Error Fetching Passwords");
    }
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await deletePassword(id, userInfo._id);
      console.log(data);
      if (data.passwords) {
        setAllPassWords(data.passwords);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getPasses();
  }, [userInfo]);
  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-4">
        Generated Passwords
      </h1>
      <div className="flex justify-center pb-10">
        <Card className="h-full w-1/2 overflow-scroll ">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPassWords.map(({ _id, password, createdAt }, index) => {
                const isLast = index === allPassWords.length - 1;
                const classes = isLast
                  ? "p-4 text-center"
                  : "p-4 border-b border-blue-gray-50 text-center";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {password}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(createdAt).toLocaleTimeString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(createdAt).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {password.length}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium flex justify-center"
                      >
                        <TrashIcon
                          className="h-6 w-6"
                          onClick={(e) => handleDelete(e, _id)}
                        />
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default Table;
