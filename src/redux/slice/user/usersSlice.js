import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";
// import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: null,
    success: false, // ✅ add this
    successMessage: null,
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
    }
}

// register Action
export const registerUserAction = createAsyncThunk("users/register",
    async ({ fullName, email, password, organisation, role }, { rejectWithValue, getState, dispatch }) => {
        try {
            // make the http request
            const res = await axios.post(`${baseUrl}/users/register`, {
                fullName,
                email,
                password,
                organisation,
                role,
            });
            // return the response data
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// login Action
export const loginUserAction = createAsyncThunk(
    "users/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${baseUrl}/users/login`, { email, password }, {
                headers: { "Content-Type": "application/json" },
            });
            // Save in localStorage
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data; // ✅ must return the whole data object
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

export const userProfileUpdateAction = createAsyncThunk(
    "updateUser/profile",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const state = getState();
            console.log("Full Redux state:", state);

            // Get token and userId from Redux state
            const userInfo = state?.users?.userAuth?.userInfo;
            const token = userInfo?.message?.token;
            const userId = userInfo?.message?.id;

            console.log("User Info:", userInfo);
            console.log("Token:", token);
            console.log("UserId:", userId);
            console.log("Payload:", payload);

            if (!userInfo) {
                return rejectWithValue("User not logged in. Please login first.");
            }

            if (!token) {
                return rejectWithValue("Authentication token not found. Please login again.");
            }

            if (!userId) {
                return rejectWithValue("User ID not found. Please login again.");
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make PUT request to update user profile
            const res = await axios.put(
                `${baseUrl}/users/update/profile/${userId}`,
                payload,
                config
            );

            console.log("API Response:", res.data);
            return res.data;
        } catch (error) {
            console.error("Update Error:", error);
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// get user profile Action
export const getUserProfileAction = createAsyncThunk("users/profile",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            // token authenticated
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            console.log(token, "profile");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            // console.log(config);

            // make the http request
            const res = await axios.get(`${baseUrl}/users/profile`, config);
            // console.log(res.data);

            // save user to local storage
            return res.data
        } catch (error) {
            console.log(error);

            return rejectWithValue(error?.response?.data);
        }
    }
);

// delete account
export const deleteAccountAction = createAsyncThunk(
    "users/delete-account",
    async (_, { rejectWithValue, getState }) => {
        try {
            //   const token = getState().users.userAuth?.token;
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;


            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.delete(
                `${baseUrl}/users/delete/account`,
                config
            );

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// delete projects
export const deleteAllProjectsAction = createAsyncThunk(
    "projects/delete-all",
    async (_, { rejectWithValue, getState }) => {
        try {
            //   const token = getState().users.userAuth?.token;
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;


            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.delete(
                `${baseUrl}/users/delete/all-projects`,
                config
            );

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        // handle Action

        // register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.user = action.payload.user; // user data
            state.successMessage = action.payload.message; // success message
            state.loading = false;
            state.success = true;
            state.error = null; // clear any previous errors
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
            state.loading = false;
            state.success = false;
            state.successMessage = null;
        });

        // login
        builder.addCase(loginUserAction.pending, (state) => {
            state.userAuth.error = null; // clear previous errors
        });

        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.userAuth.error = null;
            state.userAuth.success = true;
        });

        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload || action.error.message;
            state.userAuth.success = false;
        });

        // reset Err Action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null
        });

        builder.addCase(resetSuccessAction.pending, (state) => {
            state.error = null
        });

        // get user profile
        builder.addCase(getUserProfileAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(getUserProfileAction.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
            state.loading = false;
        });

        // update user profile
        builder.addCase(userProfileUpdateAction.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });

        builder.addCase(userProfileUpdateAction.fulfilled, (state, action) => {
            state.profile = action.payload.message;
            state.loading = false;
            state.error = null;
            state.success = true;
            state.successMessage = action.payload.message || "Profile updated successfully";
        });

        builder.addCase(userProfileUpdateAction.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
            state.loading = false;
            state.success = false;
        });

        // delete account

        builder.addCase(deleteAccountAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteAccountAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(deleteAccountAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // delete projects

        builder.addCase(deleteAllProjectsAction.pending, (state) => {
            state.loadingDeleteAll = true;
            state.successDeleteAll = false;
            state.errorDeleteAll = null;
        })
        builder.addCase(deleteAllProjectsAction.fulfilled, (state) => {
            state.loadingDeleteAll = false;
            state.successDeleteAll = true;
            state.projects = [];
            state.completeProjects = [];
            state.projectDrafts = [];
            state.stories = [];
            state.sprints = [];
        })
        builder.addCase(deleteAllProjectsAction.rejected, (state, action) => {
            state.loadingDeleteAll = false;
            state.errorDeleteAll = action.payload;
        });
    }
})
// generate reducers
const usersReducers = usersSlice.reducer;

export default usersReducers;