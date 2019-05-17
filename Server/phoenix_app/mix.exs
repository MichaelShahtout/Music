defmodule PhoenixApp.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_app,
      version: "0.1.0",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
        {:absinthe_ecto, "~> 0.1.0"},
        {:absinthe_plug, "~> 1.3.0"},
        # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
        {:cowboy, [env: :prod, git: "https://github.com/ninenines/cowboy.git", tag: "2.2.0", override: true, manager: :make]},
        {:ranch, [env: :prod, git: "https://github.com/ninenines/ranch.git", override: true, manager: :make]},
        {:grpc, github: "tony612/grpc-elixir"}
    ]
  end
end
