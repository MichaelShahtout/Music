config :hello_create_react_app, HelloCreateReactApp.Endpoint,

watchers: [npm ["start", cd: Path.expand("priv/hello_create_react_app/")]]