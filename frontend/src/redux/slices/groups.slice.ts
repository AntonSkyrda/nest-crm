import type {IGroup} from "../../models/IGroup.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {groupsService} from "../../services/group.service.ts";

type GroupState = {
    groups: IGroup[];
    loading: boolean;
    creating: boolean;
    error: string | null;
};

const initialState: GroupState = {
    groups: [],
    loading: false,
    creating: false,
    error: null,
};

export const fetchGroups = createAsyncThunk<
    IGroup[],
    void,
    { rejectValue: string }
>(
    "groups/fetchGroups",
    async (_, {rejectWithValue}) => {
        try {
            return await groupsService.getAllGroups();
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    }
)

export const createGroup = createAsyncThunk<
    IGroup,
    { name: string },
    { rejectValue: string }
>(
    "groups/createGroup",
    async ({ name }, { rejectWithValue }) => {
        try {
            return await groupsService.createGroup(name);
        } catch (e) {
            return rejectWithValue((e as Error).message);
        }
    }
)

const groupsSlice = createSlice({
    name: "groupsSlice",
    initialState,
    reducers: {
        resetGroupsError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.error = null;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.error = action.payload ?? "Fetch groups failed";
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.groups.push(action.payload);
                state.groups.sort((a, b) => a.name.localeCompare(b.name));
                state.error = null;
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.error = action.payload ?? "Create group failed";
            });
    },
});

const groupsReducer = groupsSlice.reducer;
const { actions } = groupsSlice;

const groupsActions = {
    ...actions,
    fetchGroups,
    createGroup,
};

export { groupsReducer, groupsActions };
