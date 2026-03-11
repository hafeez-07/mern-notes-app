import React from "react";

const NoteForm = () => {
  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;

    el.style.height = "auto";

    el.style.height = el.scrollHeight + 4 + "px";
    console.log(el.scrollHeight);
  };

  return (
    <div className="max-w-5xl border mx-auto bg-white border-white rounded-xl">
      <h2 className="text-2xl font-semibold border-b py-2 px-4 border-zinc-200">
        Create a Note
      </h2>

      <form className="flex flex-col gap-2  p-4 ">
        <input
          type="text"
          name="title"
          className="input-field"
          placeholder="Title"
        />
        <textarea
        
          className="input-field resize-none max-h-60 "
          onChange={textAreaHandler}
          placeholder="write your note here.."
          rows={3}
        ></textarea>
        <input
          className="border border-orange-400 bg-orange-500 font-semibold text-white rounded py-1 cursor-pointer"
          type="submit"
          value="Save Note"
        />
      </form>
    </div>
  );
};

export default NoteForm;
