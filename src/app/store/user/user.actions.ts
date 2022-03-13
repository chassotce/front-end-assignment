import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/model/user";

export const save = createAction('[User] save', props<{payload:User}>());
export const reset = createAction('[User] Reset');