import "./App.css"
import {
  MdOutlineDeleteForever,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked
} from "react-icons/md"
import { useEffect, useState } from "react"

const Task = ({
  id,
  content,
  date,
  check,
  handleCheckTask,
  handleRemoveTask
}: any) => {
  return (
    <div className={`item${check ? " completed" : ""}`}>
      <div className="action-bar">
        <div
          className="action"
          onClick={() => {
            handleRemoveTask(id)
          }}
        >
          <MdOutlineDeleteForever />
        </div>
        <div
          className="action"
          onClick={() => {
            handleCheckTask(id)
          }}
        >
          {check ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
        </div>
      </div>
      <div className="content-field">
        <div className="date">{date.toString()}</div>
        <div className="content">{content}</div>
      </div>
    </div>
  )
}

interface TaskType {
  id: number
  content: string
  date: Date
  check: boolean
}

const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [addTaskContent, setAddTaskContent] = useState<string>("")

  const handleUpdateAddTaskContent = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAddTaskContent(target.value)
  }

  const saveTasks = (tasks: TaskType[]): TaskType[] => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    return tasks
  }

  const handleAddTask = () => {
    if (!addTaskContent.trim()) {
      setAddTaskContent("")
      return
    }
    setTasks((prev: TaskType[]): TaskType[] => {
      return saveTasks([
        ...prev,
        {
          id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0,
          content: addTaskContent,
          date: new Date(),
          check: false
        }
      ])
    })
    setAddTaskContent("")
  }

  const handleCheckTask = (id: number) => {
    setTasks((prev: TaskType[]): TaskType[] => {
      return saveTasks(
        prev.map((task: TaskType) => {
          if (task.id === id) {
            return { ...task, check: !task.check }
          }
          return task
        })
      )
    })
  }
  const handleRemoveTask = (id: number) => {
    setTasks((prev: TaskType[]): TaskType[] => {
      return saveTasks(prev.filter((task: TaskType) => task.id !== id))
    })
  }

  useEffect(() => {
    setTasks(() => {
      return JSON.parse(localStorage.getItem("tasks") || "[]")
    })
  }, [])

  return (
    <div id="App">
      <div id="Header">TODO APP</div>
      <div id="Item-creator">
        <input
          value={addTaskContent}
          onChange={(e) => {
            handleUpdateAddTaskContent(e)
          }}
          type="text"
          placeholder="Enter your task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="item-list">
        {tasks.map((task: TaskType) => {
          return (
            <Task
              key={`task_${task.id}`}
              {...task}
              handleCheckTask={handleCheckTask}
              handleRemoveTask={handleRemoveTask}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
