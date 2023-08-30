import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  updateTodo,
  sortTodo,
  toggleCompleted,
} from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.jpg";

function ToDoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");
  //   Due date functioinaluty
  const [newdueDate, setnewDueDate] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);
  // new
  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      const formattedDueDate = new Date(newdueDate).toLocaleDateString("en-CA");

      if (currentTodo) {
        dispatch(
          updateTodo({
            id: currentTodo.id,
            task: task,
            dueDate: formattedDueDate,
          })
        );
      } else {
        dispatch(
          addTodo({
            task: task,
            id: Date.now(),
            dueDate: formattedDueDate,
          })
        );
      }

      setNewTask("");
      setnewDueDate("");
      setShowModal(false);
      setCurrentTodo(null);
    }
  };

  //   const handleAddTodo = (task) => {
  //     if (task.trim().length === 0) {
  //       alert("Please enter a task");
  //     } else {
  //       const formattedDueDate = new Date(newdueDate).toLocaleDateString("en-CA");

  //       dispatch(
  //         addTodo({
  //           task: task,
  //           id: Date.now(),
  //           dueDate: formattedDueDate,
  //         })
  //       );

  //       setNewTask("");
  //       //   Due date functionality
  //       setnewDueDate("");
  //       setShowModal(true);
  //     }
  //     console.log(dueDate);
  //   };
  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      // duedate functionality
      dispatch(
        updateTodo({
          id: id,
          task: task, // Keep undefined if you're not updating the task text
          dueDate: newdueDate,
        })
      );
      //   dispatch(updateTodo({ task: task, id: id, dueDate: dueDate }));
      setShowModal(false);
    }
  };
  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria));
  }

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    // Due date functionality
    if (sortCriteria === "Overdue" && todo.overdue) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              className="w-full border p-2 rounded-md outline-none mb-8"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your task here" : "Enter your task here"
              }
            />
            {/* Due date functionality  */}
            <input
              className="w-full border p-2 rounded-md outline-none mb-8"
              type="date"
              value={newdueDate}
              onChange={(e) => setnewDueDate(e.target.value)}
              placeholder={currentTodo ? "Update due date" : "Enter a due date"}
            />
            <div className="flex justify-between md:gap-4 gap-2">
              <button
                onClick={() => handleAddTodo(newTask)}
                className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
              >
                {currentTodo ? "Update" : "Add"}
              </button>
              <button
                className="bg-Tangaroa rounded-md text-white py-3 px-10"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <div className="mb-6">
            <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] min-[250px]">
              <img src={empty} alt="" />
            </div>
            <p className="text-center text-Gray">
              You have no task to do, please add one.
            </p>
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            <div className="flex justify-center mb-6">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="p-1 outline-none text-sm"
              >
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
                {/* Due date functionality  */}
                <option value="Overdue" className="text-sm">
                  Overdue
                </option>
              </select>
            </div>
            <div>
              {sortToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4"
                >
                  <div
                    className={`${
                      todo.completed
                        ? "line-through text-greenTeal"
                        : "text-white"
                    } cursor-pointer flex gap-2`}
                    onClick={() => {
                      handleToggleCompleted(todo.id);
                    }}
                  >
                    {/* Due date functionality  */}
                    {todo.task} <p>due by: {todo.dueDate}</p>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-white p-1 rounded-md ml-2"
                      onClick={() => {
                        setShowModal(true);
                        setCurrentTodo(todo);
                        setNewTask(todo.task);
                        // Due date functionality
                        setnewDueDate(todo.dueDate);
                      }}
                    >
                      <TiPencil />
                    </button>
                    <button
                      className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
                      onClick={() => handleDeleteToDo(todo.id)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default ToDoList;
