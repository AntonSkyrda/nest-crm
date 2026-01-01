import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../models/IUser";
import type { IAuth } from "../../models/IAuth";
import { authService } from "../../services/auth.service";

interface IState {
    me: IUser | null;
    error: string | null;
}

const initialState: IState = {
    me: null,
    error: null,
};

const login = createAsyncThunk<IUser, { user: IAuth }, { rejectValue: string }>(
    "authSlice/login",
    async ({ user }, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (error: unknown) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue("Login error");
        }
    }
);

const me = createAsyncThunk<IUser, void, { rejectValue: string }>(
    "authSlice/me",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.me();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue("Me error");
        }
    }
);

const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "authSlice/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error: unknown) {
            if (error instanceof Error) return rejectWithValue(error.message);
            return rejectWithValue("Logout error");
        }
    }
);

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.me = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload ?? "Login failed";
            })

            // me
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload;
                state.error = null;
            })
            .addCase(me.rejected, (state, action) => {
                state.error = action.payload ?? "Me failed";
            })

            // logout
            .addCase(logout.fulfilled, (state) => {
                state.me = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.me = null;
                state.error = action.payload ?? "Logout failed";
            });
    },
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
    ...actions,
    login,
    me,
    logout,
};

export { authActions, authReducer };
