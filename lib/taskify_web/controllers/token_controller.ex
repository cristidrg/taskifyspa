defmodule TaskifyWeb.TokenController do
  use TaskifyWeb, :controller
  alias Taskify.Users.User

  action_fallback TaskifyWeb.FallbackController

  def create(conn, %{"email" => email, "pass" => pass}) do
    with {:ok, %User{} = user} <- Taskify.Users.get_and_auth_user(email, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
