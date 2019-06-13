-module (sw_core_type).
-export(execute/4).

-spec execute(Ctx, Obj, Field, Args) -> {ok, Result} } | {error, Reason}
	when
		Ctx :: context(), 
		Obj :: term(),
		Field :: binary(),
		Args :: #{ binary() => term()}
		Type :: atom(),
		Reason :: term().

execute( _Ctx, #store{id = Id} = Store, Field, Args) -> 
	case Field of 
			<<"id">> -> {ok, sw_core_id:encode({'Store', Store#store.id})};
			<<"description">> -> {ok, sw_core_id:encode({'Store', Store#store.description})};
			<<"price">> -> {ok, sw_core_id:encode({'Store', Store#store.price})};
			<<"rating">> -> {ok, sw_core_id:encode({'Store', Store#store.rating})};
			<<"published">> -> {ok, sw_core_id:encode({'Store', Store#store.published})};

execute(_Ctx, #{ store := #store{id = Id} = Store,
                 process := Process }, Field, Args) ->
    case Field of
        <<"id">> ->
            {ok, sw_core_id:encode({'Store', Store#item.id})};
        <<"name">> -> {ok, Store#item.name};
        <<"description">> -> {ok, Store#item.description};
        <<"rating">> -> {ok, Store#item.item};
        <<"price">> -> {ok, floatify(Store#item.price)};
        <<"published">> -> {ok, Store#item.published};
        <<"bought_from">> -> {ok, Purchased#item.bought_from};
        <<"refundable">> ->
            Result = case Purchased#item.refundable of
                         undefined -> null;
                         P -> P
                     end,
            {ok, Result};
        <<"timestamp">> -> {ok, [{ok, M} || M <- Purchased#item.timestamp]};
        <<"response">> ->
            {ok, Process#item.response};
        <<"ack">> ->
            {ok, Process#item.ack};
        <<"accept">> ->
            {ok, Process#item.accept};
        <<"buy">> ->
            {ok, Process#item.buy};
        <<"refund">> -> {ok,
                              case Process#item.refund of
                                  undefined -> null;
                                  V -> V
                              end};
        <<"pending">> -> {ok, Process#item.pending};
        <<"deliviring">> ->  {ok, Process#item.deliviring};

        load_node(Types, ID) when is_binary(ID) ->
	    case sw_core_id:decode(ID) of
	        {ok, Decoded} ->
	            load_node_(Types, Decoded);
	        {error, Reason} ->
	            {error, Reason}
	    end.

		load_node_(any, {Type, MID}) ->
		    sw_core_db:load(Type, MID);
		load_node_(TypeList, {Type, MID}) ->
		    case lists:member(Type, TypeList) of
		        true ->
		            sw_core_db:load(Type, MID);
		        false ->
		            {error, wrong_type}
	    end.


        execute(_Ctx, _DummyObj, <<"node">>, #{ <<"id">> := ID}) ->
        	load_node(any, ID);


        record_of('Stand') -> stand;
        record_of('Misc') -> misc;
        record_of('Accessory') -> accessory;
        record_of('Instrument') -> instrument;

        load(Type, ID) ->
		    MType = record_of(Type),
		    F = fun() ->
		                [Obj] = mnesia:read(MType, ID, read),
		                Obj
		        end,
		    txn(F).

		%% @doc txn/1 turns a mnesia transaction into a GraphQL friendly return
		%% @end
		txn(F) ->
		    case mnesia:transaction(F) of
		        {atomic, Res} ->
		            {ok, Res};

		        {aborted, {{badmatch,[]}, _}} ->
		            {error, not_found};

		        {aborted, Reason} ->
		            {error, Reason}
		    end.


		    load('Store', ID) ->
		    	F = fun() -> 
		    			[Process] = mnesia:read(process, ID, read),
		    			[Store] = mnesia:read(store, ID, read),
		    			#{store => Store,
		    			process => Process}
		    		end,
		    		txn(F);