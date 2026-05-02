import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
const initialState = {
    loading: false,
    error: null,
    stories: [],
    storiesByEpic: {},
    storiesByProject: {},
    projectStats: {
        totalStories: 0,
        totalPoints: 0,
    },
    story: null,
    success: false,
    successMessage: null,
};

export const createStoryAction = createAsyncThunk(
    "story/create",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const token =
                getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.post(
                `${baseUrl}/stories/create-story`,
                payload,
                config
            );

            return res.data.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error.message
            );
        }
    }
);

// fetch all stories action
export const fetchStoriesAction = createAsyncThunk(
    "story/fetchAll",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/stories/all-stories`, config);
            // console.log(res.data, "Stories data");

            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// fetch all stories action
export const fetchStoriesByEpicIdAction = createAsyncThunk(
    "stories/fetchByEpic",
    async (epicId, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/stories/stories-by-epic/${epicId}`, config);
            // console.log(res.data, "Stories data");
            console.log(res.data);

            return res.data.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);
// get stories by projectId before
// export const fetchStoriesByProjectAction = createAsyncThunk(
//     "stories/fetchByProject",
//     async (projectId, { rejectWithValue, getState }) => {
//         try {
//             const token = getState()?.users?.userAuth?.userInfo?.message?.token;

//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             const { data } = await axios.get(
//                 `${baseUrl}/stories/stories-by-project/${projectId}`,
//                 config
//             );
//             console.log(data, "stories");


//             return { projectId, stories: data.data };
//         } catch (error) {
//             return rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );
export const fetchStoriesByProjectAction = createAsyncThunk(
    "stories/fetchByProject",
    async (projectId, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(
                `${baseUrl}/stories/project/${projectId}`, // ✅ FIXED ROUTE
                config
            );

            return {
                projectId: String(projectId),
                stories: data?.data || [],
            };
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error.message
            );
        }
    }
);

// status update
export const updateStoryStatusAction = createAsyncThunk(
    "stories/updateStatus",
    async ({ storyId, status }, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.put(
                `${baseUrl}/stories/update-status/${storyId}`,
                { status },
                config
            );

            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// stats
export const fetchProjectStatsAction = createAsyncThunk(
    "stories/fetchProjectStats",
    async (projectId, { rejectWithValue, getState }) => {
        try {
            const token =
                getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(
                `${baseUrl}/stories/project-stats/${projectId}`,
                config
            );

            return data.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error.message
            );
        }
    }
);

// fetch stories by project
// export const fetchStoriesByProject = createAsyncThunk(
//     "story/fetchByProject",
//     async (projectId, { rejectWithValue }) => {
//         try {
//             const { data } = await axios.get(
//                 `${baseUrl}/stories/stories-by-project/${projectId}`
//             );

//             return data.data; // backend returns { status, data }
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || error.message);
//         }
//     }
// );

const storySlice = createSlice({
    name: "stories",
    initialState,
    clearStories: (state) => {
        state.stories = [];
    },

    extraReducers: (builder) => {
        // Create Project
        builder.addCase(createStoryAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // builder.addCase(createStoryAction.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.success = true;
        //     state.successMessage = action.payload?.message || action.payload?.messsage || "Story created";
        //     const storyData = action.payload?.data || action.payload?.messsage || action.payload?.message || null;
        //     state.story = storyData;
        //     if (storyData) {
        //         state.stories.push(storyData);
        //     }
        // });


        builder.addCase(createStoryAction.fulfilled, (state, action) => {
            const newStory = action.payload;

            console.log("REDUX STORY:", newStory);

            const epicId = newStory?.epicId || newStory?.epic;

            if (!epicId) {
                console.warn("Missing epicId in story:", newStory);
                return;
            }

            // 1. Update storiesByEpic (source of truth)
            if (!state.storiesByEpic[epicId]) {
                state.storiesByEpic[epicId] = [];
            }

            state.storiesByEpic[epicId].push(newStory);

            // 2. Update epics count safely
            const epic = state.epics?.find(e => e._id === epicId);

            if (epic) {
                if (!epic.stories) epic.stories = [];
                epic.stories.push(newStory);
            }
        });

        // builder.addCase(createStoryAction.fulfilled, (state, action) => {
        //     const newStory = action.payload;

        //     if (!Array.isArray(state.epics)) return; // ✅ safety guard

        //     const epic = state.epics.find(
        //         (e) => e._id === newStory.epic
        //     );

        //     if (epic) {
        //         epic.stories = epic.stories || [];
        //         epic.stories.push(newStory);
        //     }
        // });
        builder.addCase(createStoryAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // fetch stories by epic id
        builder.addCase(fetchStoriesByEpicIdAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchStoriesByEpicIdAction.fulfilled, (state, action) => {
            const { epicId, stories } = action.payload;

            state.storiesByEpic[epicId] = stories;
        });
        // builder.addCase(fetchStoriesByEpicIdAction.fulfilled, (state, action) => {
        //     const epicId = String(action.meta.arg);
        //     console.log("STORING FOR EPIC:", epicId);
        //     console.log("PAYLOAD:", action.payload);
        //     state.storiesByEpic[epicId] = action.payload || [];
        // });
        // builder.addCase(fetchStoriesByEpicIdAction.fulfilled, (state, action) => {
        //     const epicId = action.meta.arg;

        //     state.storiesByEpic[epicId] = Array.isArray(action.payload)
        //         ? action.payload
        //         : action.payload.stories;
        // });
        builder.addCase(fetchStoriesByEpicIdAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
        // Fetch all stories
        // builder.addCase(fetchStoriesAction.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(fetchStoriesAction.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.stories = action.payload?.message || [];
        //     state.error = null;
        // });
        // builder.addCase(fetchStoriesAction.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });

        // get stories by projectId
        builder.addCase(fetchStoriesByProjectAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchStoriesByProjectAction.fulfilled, (state, action) => {
            state.loading = false;

            const { projectId, stories } = action.payload;

            // 🔥 IMPORTANT: normalize key
            state.storiesByProject[String(projectId)] = stories;
        })

        builder.addCase(fetchStoriesByProjectAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // builder.addCase(fetchStoriesByProjectAction.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });

        // builder.addCase(fetchStoriesByProjectAction.fulfilled, (state, action) => {
        //     state.loading = false;

        //     const { projectId, stories } = action.payload;

        //     // ✅ store globally
        //     state.stories = stories;

        //     // optional: cache by project
        //     state.storiesByProject[projectId] = stories;
        // });

        // builder.addCase(fetchStoriesByProjectAction.fulfilled, (state, action) => {
        //     state.loading = false;

        //     const { projectId, stories } = action.payload;

        //     if (!state.storiesByProject) {
        //         state.storiesByProject = {};
        //     }

        //     // 🔥 overwrite ONLY this project key
        //     // state.storiesByProject[projectId] = [...stories];
        //     state.storiesByProject[String(projectId)] = [...stories];
        // });


        builder.addCase(updateStoryStatusAction.fulfilled, (state, action) => {
            const updatedStory = action.payload;

            if (!state.storiesByProject) return;

            Object.keys(state.storiesByProject).forEach((projectId) => {
                const stories = state.storiesByProject[projectId];

                if (!stories) return;

                state.storiesByProject[projectId] = stories.map((story) =>
                    story._id === updatedStory._id ? updatedStory : story
                );
            });
        });

        // builder.addCase(fetchStoriesByProjectAction.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });

        // update status 
        // builder.addCase(updateStoryStatusAction.fulfilled, (state, action) => {
        //     const updatedStory = action.payload;

        //     // update global stories
        //     state.stories = state.stories.map((story) =>
        //         story._id === updatedStory._id ? updatedStory : story
        //     );

        //     // update per project safely
        //     Object.keys(state.storiesByProject).forEach((projectId) => {
        //         const projectStories = state.storiesByProject[projectId];

        //         if (projectStories) {
        //             state.storiesByProject[projectId] = projectStories.map((story) =>
        //                 story._id === updatedStory._id ? updatedStory : story
        //             );
        //         }
        //     });
        // });
        // fetch all stories by project

        // builder.addCase(fetchStoriesByProject.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // builder.addCase(fetchStoriesByProject.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.stories = action.payload;
        // })
        // builder.addCase(fetchStoriesByProject.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });

        // stats
        builder.addCase(fetchProjectStatsAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchProjectStatsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.projectStats = action.payload;
        });

        builder.addCase(fetchProjectStatsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        // Reset error and success
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(resetSuccessAction.pending, (state) => {
            state.success = false;
            state.successMessage = null;
        });
    }
});
export const { clearStories } = storySlice.actions;
const storyReducers = storySlice.reducer;

export default storyReducers;