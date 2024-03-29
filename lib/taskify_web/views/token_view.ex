defmodule TaskifyWeb.TokenView do
  use TaskifyWeb, :view

  # Taken from Nat's lecture notes
  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_name: user.name,
      token: token
    }
  end
end
