import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
const initialState = {
    loading: false,
    error: null,
    projects: [],
    project: null,
    success: false,
    successMessage: null,
};

// Create Project
export const createProjectAction = createAsyncThunk(
    "projects/create",
    async (projectData, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.post(`${baseUrl}/projects/create-project`, projectData, config);
            console.log(res.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Get User Projects
export const getUserProjectsAction = createAsyncThunk(
    "projects/getUserProjects",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/projects/all-projects`, config);
            console.log(res.data, "Project-planner");
            return res.data;

        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Get Single Project
export const getProjectAction = createAsyncThunk(
    "projects/getProject",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/projects/single-project/${id}`, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Update Project
export const updateProjectAction = createAsyncThunk(
    "projects/update",
    async ({ id, projectData }, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.put(`${baseUrl}/projects/update/${id}`, projectData, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Delete Project
export const deleteProjectAction = createAsyncThunk(
    "projects/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.delete(`${baseUrl}/projects/delete/${id}`, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);
// save to draft
export const saveDraftAction = createAsyncThunk(
    "project/saveDraft",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                `${baseUrl}/projects/save-to-draft`,
                payload,
                config
            );
            console.log(data);


            return data; // { survey: {...} }
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const projectSlice = createSlice({
    name: "projects",
    initialState,
    extraReducers: (builder) => {
        // Create Project
        builder.addCase(createProjectAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProjectAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload?.message || "Project created";
            // Backend returns response with 'data' field, not 'project'
            state.project = action.payload?.data || null;
            if (action.payload?.data) {
                state.projects.push(action.payload.data);
            }
        });
        builder.addCase(createProjectAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // Get User Projects
        builder.addCase(getUserProjectsAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserProjectsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload?.message || [];
        });
        builder.addCase(getUserProjectsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Single Project
        builder.addCase(getProjectAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProjectAction.fulfilled, (state, action) => {
            state.loading = false;
            state.project = action.payload?.data || action.payload?.message || null;
        });
        builder.addCase(getProjectAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Project
        builder.addCase(updateProjectAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProjectAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload?.message || "Project updated";
            // Backend may return 'data' or 'project' field
            const project = action.payload?.data || action.payload?.project || null;
            if (project) {
                state.project = project;
                const idx = state.projects.findIndex((p) => p._id === project._id);
                if (idx !== -1) {
                    state.projects[idx] = project;
                }
            }
        });
        builder.addCase(updateProjectAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // Delete Project
        builder.addCase(deleteProjectAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProjectAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload?.message || "Project deleted";
            state.projects = state.projects.filter((p) => p._id !== action.meta.arg);
        });
        builder.addCase(deleteProjectAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
        // save to draft
         builder.addCase(saveDraftAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(saveDraftAction.fulfilled, (state, action) => {
            state.loading = false;
            state.survey = action.payload.survey; // ✅ must be survey
        });
        builder.addCase(saveDraftAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

    // Reset error and success
    builder.addCase(resetErrAction.pending, (state) => {
        state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state) => {
        state.success = false;
        state.successMessage = null;
    });
},
});

// Generate reducers
const projectReducers = projectSlice.reducer;

export default projectReducers;