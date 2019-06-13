-module(schema).
-behaviour(application).
-include_lib("stdlib/include/ms_transform.hrl").
-include_lib("stdlib/include/qlc.hrl").
-export([start/2, stop/1]).
-export([install/1]).
-export([add_friend/4, friend_by_name/1, friend_by_expertise/1,
         add_service/4, debts/1]).
-export([add_enemy/2, find_enemy/1, enemy_killed/1]).

-export([create_schema/0, create_fixture/2, create_tables/1]).

create_schema() ->
    mnesia:create_schema([node()]),
    application:ensure_all_started(mnesia),
    ok = create_fixture(disc_copies, "fixtures"),
    mnesia:backup("FALLBACK.BUP"),
    mnesia:install_fallback("FALLBACK.BUP"),
    application:stop(mnesia).


create_fixture(Type, BaseDir) -> 
    ok =  create_tables(Type),
    ok = populate_tables(BaseDir),
    ok.

create_tables(Type) -> 
    {atomic, ok} =
        mnesia:create_table(
                purchased,
                [{Type, [node()]},
                {type, set},
                {attributes, record_info(fields, user)}
            ]),
    {atomic, ok} =
        mnesia:create_table(
                store,
                [{Type, [node()]},
                {type, set},
                {attributes, record_info(fields, store)}
            ]),

-record(store, {
         id :: integer(),     
         description :: binary(),
         price :: integer(),
         rating :: integer(),
         name :: binary()
				}).

-record(purchased, {
        timestamp :: calendar:datetime(),
        id :: integer(),
        name :: binary(),
        bought_from :: integer(),
        price :: integer() | nan,
        refundable: true
    }).

json_to_purchased(
        #{ <<"pk">> := ID,
            <<"fields">> := #{
                <<"timestamp">> := Timestamp,
                <<"name">> := Name,
                <<"bought_from">> := BoughtFrom,
                <<"price">> := Price,
                <<"refundable">> := Refundable

            }
        }
    ) -> 

    #purchased{
        id= ID,
        timestamp = datetime(Timestamp),
        name = Name,
        bought_from = BoughtFrom,
        price = number_like(Price),
        refundable = Refundable
    }.

    retrieve_purchased(Terms) -> 
        Purchased = [json_to_purchased(P) || <- Terms],
        Txn = fun() -> 
            [mnesia:write(P) || P <- Purchased],
            ok
        end,
        {atomic, ok} = mnesia:transaction(Txn), 
        ok.

    add_purchased(File, Fun) -> 
        {ok, Data} = file:read_file(File),
        Terms = jsx:decode(Data, [return_maps]),
        Fun(Terms).

    purchased_tables(BaseDir) -> 
        purchased(filename:join(BaseDir, "stands.json"),
            fun populate_stands/1
            ),
        purchased(filename:join(BaseDir, "instruments.json"),
            fun populate_stands/1
            ),
        purchased(filename:join(BaseDir, "tuners.json"),
            fun populate_stands/1
            ),
        purchased(filename:join(BaseDir, "accessories.json"),
            fun populate_stands/1
            ),
        purchased(filename:join(BaseDir, "miscellaneous.json"),
            fun populate_stands/1
            ),
        setup_sequences(),
        ok.

    encode({Tag, ID}) -> 
        BinTag = atom_to_binary(Tag, utf8),
        IDStr = integer_to_binary(ID),
        base64:encode(<<BinTag/binary, ":", IDStr/binary>>).

    decode(Input) -> 
        try 
            Decoded = base64:decode(Input),
            case binary:split(Decoded, <<":">>) of 
                [BinTag, IDStr] -> 
                    {ok, binary_to_existing_atom(BinTag, utf8),

       binary_to_integer(IDStr)}; 

            _ -> 
                exit(invalid)
            end

        catch 
            _:_ -> 
                {error, invalid_decode}
        end.

mapping_rules() ->
    #{
       scalars => #{ default => sw_core_scalar },
       interfaces => #{ default => sw_core_type },
       unions => #{ default => sw_core_type },
       enums => #{ 'Misc' => sw_core_enum,
                    'Accesory' => sw_core_enum,
                    'Instrument' => sw_core_enum,
                    'Stand' => sw_core_enum,
                   default   => sw_core_enum },
       objects => #{
         'id' => sw_core_id,
         'description' => sw_core_description,
         'price' => sw_core_price,
         'rating' => sw_core_rating,
         'name' => sw_core_name,
         'bought_from' => sw_core_bought_from,

         'refundable' => sw_core_refundable,

         'Query' => sw_core_query,
         'Mutation' => sw_core_mutation,
         default => sw_core_object }
     }.




start(normal, []) ->
    mnesia:wait_for_tables([store, purchased], 5000),
    mafiapp_sup:start_link().

stop(_) -> ok.

install(Nodes) ->
    ok = mnesia:create_schema(Nodes),
    rpc:multicall(Nodes, application, start, [mnesia]),
    mnesia:create_table(purchased,
                        [{attributes, record_info(fields, purchased)},
                         {index, [#purchased.id]},
                         {disc_copies, Nodes}]),
    mnesia:create_table(store,
                        [{attributes, record_info(fields, store)},
                         {index, [#store.id]},
                         {disc_copies, Nodes},
                         {type, bag}]),
    rpc:multicall(Nodes, application, stop, [mnesia]).


%%%%%%%%%%%%%%%
%%% PRIVATE %%%
%%%%%%%%%%%%%%%

find_services(Name) ->
    Match = ets:fun2ms(
            fun(#database_event{from=tutorPid, to=tuteePid, date= #database_time.timestamp, description=Info})
                when From =:= Name ->
                    {to, To, D, Desc};
               (#database_event{from=From, to=To, date=D, description=Desc})
                when To =:= Name ->
                    {from, From, D, Desc}
            end
    ),
    mnesia:select(database_event, Match).
