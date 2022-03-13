import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/model/user";
import { reset, save } from "./user.actions";

export const initialState = new User();

export const userReducer = createReducer(initialState,
        on(save, (state, {payload}) => {
            return payload;
        }),
        on(reset, (state) => new User())
    );