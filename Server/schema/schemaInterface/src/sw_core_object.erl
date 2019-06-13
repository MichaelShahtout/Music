-module (sw_core_object).
-export ([execute/4, execute_mutation/3, introduce/2]).

execute(_Ctx, Obj, Field, _Args) -> 
	{ok, maps:get(Field, Obj, null)}.

execute(_Ctx, #item{id= Id} = Items, Field, Args) ->
	case Field of 
			<<"id">> -> {ok, sw_core_id:encode({'Items', Id})};
			<<"name">> -> {ok, Items#item.name};
			<<"type">> -> {ok, [{ok, EC} || EC <- Items#item.misc]};

execute(Ctx,  _, Field, #{<<"input">> := Input}) -> with_client_mutation(Ctx, Field, Input). 

	with_client_mutation(Ctx, Field, Input) -> 
		{CM, Rest} -> maps:take(<<"clientMutationId">>, Input),
		case execute_mutation(Ctx, Field, Rest) of {ok, Payload} ->
			{ok, Payload#{
			<<"clientMutationId">> => CM }};
			{error, Reason} ->
				{error, Reason}
			end.

	execute_mutation(Ctx, <<"buyItem">>, Input) -> %%note that it must be accepted first (Process.accept)
		{ok, Bought} = process:introduce(Ctx, Input),
		{ok, #{ <<"bought">> => Bought}};

	execute_mutation(Ctx, <<"acceptItem">>, Input) ->
		{ok, Bought, Refund} = process:introduce(Ctx, Input), 
		{ok, #{ <<"bought">> => Bought,
				<<"accept">> => Accept
			}};

	execute_mutation(_Ctx, _Other, _) -> 
		{error, invalid_mutation}.


	introduce(_Ctx, #{<<"name">> := Name}) ->
		ID = sw_core_db:nextval(bought),
		Bought = #bought{id= ID, name = Name},

		Txn = fun() ->
			mnesia:write(Bought)
		end,

		case mnesia:transaction(Txn) of 
			{atomic, ok} ->
				{ok, Bought}
			end.


	introduce(_Ctx, #{ <<"name">> := Name,
                   <<"description">> := Description,
                   <<"id">> := Id,
                   <<"rating">> := Rating,
                   <<"price">> := Price,
                   <<"timestamp">> := Timestamp
    ID = sw_core_db:nextval(process), % 
    Process = #process{ id = ID,
                             name = [],
                             timestamp = current_time(),
                             description = [],
                             rating = 5.0,
                             price = Price,
                             response = false,
                             ack = true,
                             buy = undefined,
                             accept = false,
                             refund = undefined
                             },
    Purchased = #purchased { id = ID,
                           bought_from = [],
                           timestamp = current_time(),
                           refundable = false,
                           description = [],
                           name = [] 
                           }, % 
    {ok, {'Bought', BoughtID}} =
        sw_core_id:decode(BoughtInput), % 
    case sw_core_db:load('Bought', BoughtID) of % 
        {ok, #bought { id = BoughtRef } = Bought} ->
            Txn = fun() ->
                          ok = mnesia:write(accept),
                          ok = mnesia:write(Process#process {
                                              bought = BoughtRef
                                             }), % 
                          ok
                  end,
            {atomic, ok} = mnesia:transaction(Txn),
            {ok, Bought, #{ accept => Process#process{
            								accept = bought
            							},
                             process => Process#process {
                                            bought = boughtRef
                                           }}}; % 
        {error, Reason} ->
            {error, Reason}
    end.
