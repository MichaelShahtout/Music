-module(sw_core_enum).

-export([input/2, output/2]).

%% Input mapping 
input(<<"Item">>, <<"Stand">>) -> {ok, 'Stand'};
input(<<"Item">>, <<"Accessory">>)  -> {ok, 'Accessory'};
input(<<"Item">>, <<"Instrument">>)    -> {ok, 'Instrument'};
input(<<"Item">>, <<"Misc">>) -> {ok, 'Misc'};


%% Output mapping 
output(<<"Item">>, Item) ->
    {ok, atom_to_binary(Item, utf8)}.
