-module(supervisor_serv).
-behaviour(gen_server).
-export([start_link/0, stop/0, ask/1]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         code_change/3, terminate/2], restart/3, count/1).

%%%%%%%%%%%%%%%%%
%%% INTERFACE %%%
%%%%%%%%%%%%%%%%%
start_link() ->
    gen_server:start_link({global, ?MODULE}, ?MODULE, [], []).

stop() ->
    gen_server:call({global, ?MODULE}, stop).

%% The state of the servers, whether qeues are available and if %%nodes are done handling workers, to which they will be 
%%returned to the pool 
response(_Res) -> 

    gen_server:call({global, ?MODULE}, question).

%%%%%%%%%%%%%%%%%
%%% CALLBACKS %%%
%%%%%%%%%%%%%%%%%
init([]) ->
    <<"Starting Supervisor Server">>,
    {ok, []}.

handle_call(response, _From, State) ->
    {ok, Response} = application:get_env(supervisor, response),
    Res = Response,
    {reply, Res, State};
handle_call(stop, _From, State) ->
    {stop, normal, ok, State};
handle_call(_Call, _From, State) ->
    {noreply, State}.

handle_cast(_Cast, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

handle_info(Error, State) -> 
	
    	try(Error) {
		io:format("Panicked. Supervisor caught an 					unresponsive or dead server. Attempting manual 				restart~n").

		when {:ok, restart, self()} ! {Pid, restart) -> 
			{:ok, State},
		end %return statement when successful restart is made
}
catch(Error) {
	io:format("Unrecoverable error: ~p~n",Error ).
	exit(0). %used for now
	%optionally, can print {global, State} 
}	

code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

terminate(_Reason, _State) ->
    ok.
