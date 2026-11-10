import React from "react";
import { LuListTodo } from "react-icons/lu";
import { IoCheckmarkDoneSharp, IoReloadOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { motion } from "motion/react";

function Card({ data, reference, updateStatus, deleteCard, openEditForm }) {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      dragElastic={0.08}
      dragMomentum={true}
      whileDrag={{ scale: 1.08 }}
      dragTransition={{
        power: 0.2,
        timeConstant: 250,
        bounceStiffness: 300,
        bounceDamping: 20,
      }}
      className="relative shrink-0 w-full max-w-60 min-w-0 h-70 bg-zinc-900/90 rounded-[25px] text-white py-10 px-5 flex flex-col overflow-hidden"
    >
      {/* Edit Button */}
      <button
        type="button"
        onClick={() => openEditForm(data)}
        className="absolute top-3 right-14 w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500 flex justify-center items-center cursor-pointer"
        title="Edit Card"
      >
        <MdEdit size="1.1em" color="#fff" />
      </button>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => deleteCard(data.id)}
        className="absolute top-3 right-4 w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500 flex justify-center items-center cursor-pointer"
        title="Delete Card"
      >
        <RiDeleteBin6Line size="1.1em" color="#fff" />
      </button>

      {/* Card Heading */}
      <span className="flex items-center font-semibold gap-1 text-xl">
        <LuListTodo />
        {data.heading}
      </span>

      {/* Card Description */}
      <p className="mt-3 text-sm leading-tight overflow-auto h-[55%]">
        {data.desp}
      </p>

      {/* Card Footer */}
      <div className="footer absolute bottom-0 left-0 w-full flex justify-center flex-col">
        {/* Completed */}
        {data.isDone === true && (
          <>
            <div className="flex justify-center items-center mb-3 gap-8">
              <button
                type="button"
                onClick={() => updateStatus(data.id, undefined)}
                className="w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center cursor-pointer border-0 p-0"
                title="Repeat"
              >
                <IoReloadOutline size="1em" color="#fff" />
              </button>
            </div>

            <div className="tag w-full h-10 bg-green-500 flex justify-center items-center">
              <h3 className="text-xl font-semibold">Completed</h3>
            </div>
          </>
        )}

        {/* Stopped */}
        {data.isDone === false && (
          <>
            <div className="flex justify-center items-center mb-3 gap-8">
              <button
                type="button"
                onClick={() => updateStatus(data.id, undefined)}
                className="w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center cursor-pointer border-0 p-0"
                title="Repeat"
              >
                <IoReloadOutline size="1em" color="#fff" />
              </button>
            </div>

            <div className="tag w-full h-10 bg-red-500 flex justify-center items-center">
              <h3 className="text-xl font-semibold">Stopped</h3>
            </div>
          </>
        )}

        {/* Processing */}
        {data.isDone === undefined && (
          <>
            <div className="flex justify-center items-center mb-3 gap-8">
              {/* Done Button */}
              <button
                type="button"
                onClick={() => updateStatus(data.id, true)}
                className="w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center cursor-pointer border-0 p-0"
                title="Complete Task"
              >
                <IoCheckmarkDoneSharp size="1em" color="#fff" />
              </button>

              {/* Stop Button */}
              <button
                type="button"
                onClick={() => updateStatus(data.id, false)}
                className="w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center cursor-pointer border-0 p-0"
                title="Stop Task"
              >
                <ImCross size="0.8em" color="#fff" />
              </button>
            </div>

            <div className="tag w-full h-10 bg-blue-500 flex justify-center items-center">
              <h3 className="text-xl font-semibold">Processing...</h3>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
