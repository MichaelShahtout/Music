def application do
    [
      mod: {phoenix_app, []},
      applications: [:grpc]
    ]
end