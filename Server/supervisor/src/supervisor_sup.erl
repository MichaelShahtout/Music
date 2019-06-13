-module(supervisor_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({global,?MODULE}, ?MODULE, []).

init([]) ->
    {ok, {{simple_one_for_one, 1, 10},
          [{supervisor,
            {supervisor_serv, start_link, []},
            permanent,
            5000,
            worker,
            [supervisor_serv]
          }]}}.
