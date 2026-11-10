import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import initialData from "../data/initialData";
import { IoChevronDown } from "react-icons/io5";

function Foreground() {
  const ref = useRef(null);

  // Cards data
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem("todo-cards");
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error("Error loading tasks:", error);
      return initialData;
    }
  });

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [heading, setHeading] = useState("");
  const [desp, setDesp] = useState("");
  const [editId, setEditId] = useState(null);

  // Search, filter and sort states
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  // Responsive layout state
  const [layoutVersion, setLayoutVersion] = useState(0);

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem("todo-cards", JSON.stringify(data));
  }, [data]);

  // Detect screen resize
  useEffect(() => {
    let resizeTimer;

    function handleResize() {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        setLayoutVersion((prev) => prev + 1);
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Update card status
  function updateStatus(id, status) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isDone: status } : item,
      ),
    );
  }

  // Delete card
  function deleteCard(id) {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  }

  // Open Add Card form
  function openAddForm() {
    setEditId(null);
    setHeading("");
    setDesp("");
    setShowForm(true);
  }

  // Open Edit Card form
  function openEditForm(item) {
    setEditId(item.id);
    setHeading(item.heading);
    setDesp(item.desp);
    setShowForm(true);
  }

  // Add new card
  function addCard(e) {
    e.preventDefault();

    if (!heading.trim() || !desp.trim()) return;

    const newCard = {
      id: Date.now(),
      heading: heading.trim(),
      desp: desp.trim(),
      isDone: undefined,
    };

    setData((prevData) => [...prevData, newCard]);
    closeForm();
  }

  // Edit existing card
  function editCard(e) {
    e.preventDefault();

    if (!heading.trim() || !desp.trim()) return;

    setData((prevData) =>
      prevData.map((item) =>
        item.id === editId
          ? {
              ...item,
              heading: heading.trim(),
              desp: desp.trim(),
            }
          : item,
      ),
    );

    closeForm();
  }

  // Close form
  function closeForm() {
    setShowForm(false);
    setEditId(null);
    setHeading("");
    setDesp("");
  }

  // Search + Filter + Sort
  const visibleData = data
    .filter((item) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        item.heading.toLowerCase().includes(searchText) ||
        item.desp.toLowerCase().includes(searchText);

      const matchesFilter =
        filter === "all" ||
        (filter === "processing" && item.isDone === undefined) ||
        (filter === "completed" && item.isDone === true) ||
        (filter === "stopped" && item.isDone === false);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "newest") return Number(b.id) - Number(a.id);

      if (sort === "oldest") return Number(a.id) - Number(b.id);

      if (sort === "az") {
        return a.heading.localeCompare(b.heading);
      }

      return 0;
    });

  return (
    <>
      {/* Add Card Button */}
      <button
        type="button"
        onClick={openAddForm}
        className="fixed top-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:px-5 rounded-xl font-semibold cursor-pointer text-sm sm:text-base"
      >
        + Add Card
      </button>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex justify-center items-center p-4">
          <form
            onSubmit={editId !== null ? editCard : addCard}
            className="w-full max-w-md bg-zinc-900 text-white p-5 sm:p-6 rounded-2xl flex flex-col gap-4"
          >
            <h2 className="text-2xl font-semibold">
              {editId !== null ? "Edit Task" : "Create New Task"}
            </h2>

            <input
              type="text"
              placeholder="Enter task title"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full bg-zinc-800 p-3 rounded-lg outline-none border border-zinc-700"
              required
            />

            <textarea
              placeholder="Enter task description"
              value={desp}
              onChange={(e) => setDesp(e.target.value)}
              className="w-full bg-zinc-800 p-3 rounded-lg outline-none border border-zinc-700 resize-none"
              rows="3"
              required
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold cursor-pointer"
              >
                {editId !== null ? "Save Changes" : "Add Task"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-lg font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards Container */}
      <div className="fixed top-24 left-0 z-[3] h-[calc(100dvh-6rem)] w-full overflow-y-auto overflow-x-hidden p-4">
        {/* Search, Filter and Sort */}
        <div className="sticky top-0 z-40 bg-zinc-800 rounded-xl p-3 mb-6 flex flex-col sm:flex-row gap-3 shadow-lg border border-zinc-700">
          {/* Search */}
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 min-w-0 bg-zinc-900 text-white px-4 py-3 rounded-lg outline-none border border-zinc-700 focus:border-blue-500"
          />

          {/* Filter */}
          <div className="relative w-full sm:w-44">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full bg-zinc-900 text-white px-3 pr-10 py-3 rounded-lg outline-none border border-zinc-700 cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="stopped">Stopped</option>
            </select>

            <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
          </div>

          {/* Sort */}
          <div className="relative w-full sm:w-44">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full bg-zinc-900 text-white px-3 pr-10 py-3 rounded-lg outline-none border border-zinc-700 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A - Z</option>
            </select>

            <IoChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white" />
          </div>
        </div>

        {/* Cards Grid */}
        {visibleData.length > 0 ? (
          <div
            ref={ref}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6 justify-items-center pt-2"
          >
            {visibleData.map((item) => (
              <Card
                key={`${item.id}-${layoutVersion}`}
                data={item}
                reference={ref}
                updateStatus={updateStatus}
                deleteCard={deleteCard}
                openEditForm={openEditForm}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-zinc-400 py-16">
            <h2 className="text-2xl font-semibold">No tasks found!</h2>

            <p className="text-sm mt-2">
              Try another search or change your filter.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Foreground;
