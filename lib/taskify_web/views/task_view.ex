defmodule TaskifyWeb.TaskView do
  use TaskifyWeb, :view
  alias TaskifyWeb.TaskView
  alias TaskifyWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      time_spent: task.time_spent,
      user: render_one(task.user, UserView, "user.json"),
      creator: render_one(task.creator, UserView, "user.json")
    }
  end
end
