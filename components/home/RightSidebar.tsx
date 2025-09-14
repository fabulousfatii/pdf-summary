

function RightSidebar() {

    return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center md:items-start  w-28 lg:w-64 transition-all duration-300">
     <div className="h-32 bg-gray-600 w-full relative">
        <div className=" w-20 h-20 rounded-full absolute"></div>
     </div>
     <div className="h-full p-4">
       <h1>Banks </h1>
       <div className="max-w-20 h-20 bg-blue-600 "> cards</div>
     </div>
            
        </div>
    )
}

export default RightSidebar;