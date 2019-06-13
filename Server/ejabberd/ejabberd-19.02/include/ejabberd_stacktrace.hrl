%%%----------------------------------------------------------------------
%%%
%%% ejabberd, Copyright (C) 2002-2019   ProcessOne
%%%
%%% This program is free software; you can redistribute it and/or
%%% modify it under the terms of the GNU General Public License as
%%% published by the Free Software Foundation; either version 2 of the
%%% License, or (at your option) any later version.
%%%
%%% This program is distributed in the hope that it will be useful,
%%% but WITHOUT ANY WARRANTY; without even the implied warranty of
%%% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
%%% General Public License for more details.
%%%
%%% You should have received a copy of the GNU General Public License along
%%% with this program; if not, write to the Free Software Foundation, Inc.,
%%% 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
%%%
%%%----------------------------------------------------------------------

-ifdef(DEPRECATED_GET_STACKTRACE).
-define(EX_RULE(Class, Reason, Stack), Class:Reason:Stack).
-define(EX_STACK(Stack), Stack).
-else.
-define(EX_RULE(Class, Reason, _), Class:Reason).
-define(EX_STACK(_), erlang:get_stacktrace()).
-endif.
