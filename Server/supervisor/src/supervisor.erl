-module(supervisor).
-behaviour(application).
-export([start/2, stop/1]).
-export([response/1]).

%%%%%%%%%%%%%%%%%
%%% CALLBACKS %%%
%%%%%%%%%%%%%%%%%

%% start({failover, Node}, Args) is only called
%% when a start_phase key is defined.
start(normal, []) ->
    supervisor_sup:start_link();
start({takeover, _OtherNode}, []) ->
    supervisor_sup:start_link().

stop(_State) ->
    ok.

%%%%%%%%%%%%%%%%%
%%% INTERFACE %%%
%%%%%%%%%%%%%%%%%
response(Res) ->
    supervisor_serv:response(Res).
