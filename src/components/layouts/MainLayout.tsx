import React from "react";

const MainLayout = () => {

    return (
        <div className="bg-white text-black">
           <div className="text-3xl py-4 px-2 border border-red-500 ">header </div> 
           <div className=" text-4xl py-20 px-5 flex justify-center items-center border border-green-700">Main Body </div> 
           <div className="text-4xl py-20 px-5 flex justify-center items-center border border-blue-700">Footer </div> 
        </div>
    );
};

export default MainLayout;