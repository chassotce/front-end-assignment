import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { User } from "../shared/model/user";
import { persistMetaReducer } from "./persist/persist.reducer";
import { userReducer } from "./user/user.reducer";

export interface RootState {
  user: User
}

export const reducers: ActionReducerMap<RootState> = {
  user: userReducer
}

export const metaReducers: MetaReducer[] = [
  persistMetaReducer
]