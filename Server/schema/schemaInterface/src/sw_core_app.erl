-module (sw_core_app).
-export ([setup_root/0]).

setup_root() -> 
    Root = {root, 
            #{ query => 'Query', 
                mutation => 'Mutation',
                interfaces => ['Node']
                }
            },
    ok = graphql:insert_schema_definition(Root),
    ok.
