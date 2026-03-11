import { FaTrash, FaPen } from "react-icons/fa";

const Notes = () => {
  return (
    <div className="max-w-5xl mx-auto mt-15 ">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Your notes</h3>
        <button className="destructive-button">clear all</button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map(() => (
          <div className="mt-5 bg-white  rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl  shadow-zinc-500">
            <h4 className=" border-b p-2 font-semibold text-lg border-zinc-300 pb-1">
              Shopping list
            </h4>
            <div className="p-2 border-b border-zinc-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
              perspiciatis et hic iusto quos doloribus recusandae modi nemo sit
              sed voluptate, odio adipisci labore sapiente! Ipsa tenetur
              incidunt explicabo fuga!
            </div>
            <div className="flex justify-between p-2">
              <button className="flex items-center gap-1 border border-zinc-300 bg-zinc-300 px-1 rounded hover:cursor-pointer hover:bg-orange-300 hover:text-white transition-all duration-300">
                <FaPen className="text-sm" />
                <div>Edit</div>
              </button>
              <button className="flex items-center gap-1 border  border-zinc-300 bg-zinc-300  px-1 rounded hover:cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300">
                <FaTrash className="text-sm" />
                <div>Delete</div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;
