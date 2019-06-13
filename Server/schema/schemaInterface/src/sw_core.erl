-module (sw_core).
-export ([load_schema/0]).

load_schema() ->
    {ok, SchemaFile} = application:get_env(sw_core, schema_file),
    PrivDir = code:priv_dir(sw_core),
    {ok, SchemaData} = file:read_file(filename:join(PrivDir, SchemaFile)),
    Mapping = mapping_rules(),
    ok = graphql:load_schema(Mapping, SchemaData),
    ok = setup_root(),
    ok = graphql:validate_schema(),
    ok.