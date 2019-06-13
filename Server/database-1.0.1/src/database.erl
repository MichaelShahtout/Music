-module(database).
-behaviour(application).
-include_lib("stdlib/include/ms_transform.hrl").
-include_lib("stdlib/include/qlc.hrl").
-export([start/2, stop/1]).
-export([install/1]).
-export([add_friend/4, friend_by_name/1, friend_by_expertise/1,
         add_service/4, debts/1]).
-export([add_enemy/2, find_enemy/1, enemy_killed/1]).


-record(database_time, {timestamp,
                          year=[],
                          month=[],
                          day=[],
				          start=[],	

					%%%although it may seem redundant to separate the year, month, and day, it allows for better and quicker search results... assuming we are using a "bag" method.
					       end=[] 
					%%% note that it must be in the form hour for start and end dates 
 
				  }).
-record(database_location, {latitude=[],
                           longitude=[],
                           zipCode=[],
                           address=[]}).
-record(database_event, {name,
                          info=[]}).

start(normal, []) ->
    mnesia:wait_for_tables([database_tutee,
                            database_time,
                            database_location,
                            database_event], 5000),
    mafiapp_sup:start_link().

stop(_) -> ok.

install(Nodes) ->
    ok = mnesia:create_schema(Nodes),
    rpc:multicall(Nodes, application, start, [mnesia]),
    mnesia:create_table(mafiapp_friends,
                        [{attributes, record_info(fields, mafiapp_friends)},
                         {index, [#mafiapp_friends.expertise]},
                         {disc_copies, Nodes}]),
    mnesia:create_table(mafiapp_services,
                        [{attributes, record_info(fields, mafiapp_services)},
                         {index, [#mafiapp_services.to]},
                         {disc_copies, Nodes},
                         {type, bag}]),
    mnesia:create_table(mafiapp_enemies,
                        [{attributes, record_info(fields, mafiapp_enemies)},
                         {disc_copies, Nodes},
                         {local_content, true}]),
    rpc:multicall(Nodes, application, stop, [mnesia]).

add_friend(Name, Contact, Info, Expertise) ->
    F = fun() ->
        mnesia:write(#database_tutee{name=Name,
                                      contact=Contact,
                                      info=Info,
                                      expertise=Expertise})
    end,
    mnesia:activity(transaction, F).

friend_by_name(Name) ->
    F = fun() ->
        case mnesia:read({database_tutee, Name}) of
            [#database_tutee{contact=C, info=I, expertise=E}] ->
                {Name,C,I,E,find_services(Name)};
            [] ->
                undefined
        end
    end,
    mnesia:activity(transaction, F).

friend_by_expertise(Expertise) ->
    F = fun() ->
        qlc:eval(qlc:q(
            [{Name,C,I,E,find_services(Name)} ||
             #database_tutee{name=Name,
                              contact=C,
                              info=I,
                              expertise=E} <- mnesia:table(database_tutee),
             E =:= Expertise]))
    end,
    mnesia:activity(transaction, F).

%% Adding validation is left to the reader
add_service(From, To, Date, Description) ->
    F = fun() ->
            case mnesia:read({database_tutee, From}) =:= [] orelse
                 mnesia:read({database_tutee, To}) =:= [] of
                true ->
                    {error, unknown_};
                false ->
                    mnesia:write(#database_event{from=tutorPid,
                                                   to=tuteePid,
                                                   date= #database_time.timestamp,
                                                   description=info})
            end
    end,
    mnesia:activity(transaction,F).

debts(Name) ->
    F = fun() ->
        QH = qlc:q(
            [if Name =:= To -> {From,1};
                Name =:= From -> {To,-1}
             end || #database_event{from=From, to=To} <-
                      mnesia:table(database_event),
                   Name =:= To orelse Name =:= From]),
        qlc:fold(fun({Person,N}, Dict) ->
                  dict:update(Person, fun(X) -> X + N end, N, Dict)
                 end,
                 dict:new(),
                 QH)
    end,
    lists:sort([{V,K} || {K,V} <- dict:to_list(mnesia:activity(transaction, F))]).

add_location(latitude, longitude) ->
    F = fun() -> mnesia:write(#database_location{latitude=latitude, longitude=longitude}) end,
    mnesia:activity(transaction, F).

fetch_location(Name) ->
    F = fun() -> mnesia:read({database_location, latitude, longitude}) end,
    case mnesia:activity(transaction, F) of
        [] -> undefined;
        [#database_location{latitude=A, longitude=O}] -> {A,O}
    end.

delete_locaation(Name) ->
    F = fun() -> mnesia:delete({database_location, latitude, longitude}) end,
    mnesia:activity(transaction, F).

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
