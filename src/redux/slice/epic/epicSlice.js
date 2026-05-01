import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
const initialState = {
    loading: false,
    error: null,
    epics: [],
    epic: null,
    success: false,
    successMessage: null,
};

export const createEpicAction = createAsyncThunk(
    "epic/create",
    async ({ title, description, priority, project }, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.post(`${baseUrl}/epics/create-epic`, 
                
                {
                    title, description, priority, project
                }, config);
            console.log(res.data, "epic data");
            
            if (!res.data) {
                throw new Error(res.data.message || "Failed to create epic");
            }
            
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// fetch all epics action
export const fetchEpicsAction = createAsyncThunk(
    "epic/fetchAll",
    async (projectId, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/epics/all-epics`, config);
            // console.log(res.data, "Epics data");
            
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);



const epicSlice = createSlice({
    name: "epics",
    initialState,
    extraReducers: (builder) => {
        // Create Project
        builder.addCase(createEpicAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createEpicAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload?.message || action.payload?.messsage || "Epic created";
            const epicData = action.payload?.data || action.payload?.messsage || action.payload?.message || null;
            state.epic = epicData;
            if (epicData) {
                state.epics.push(epicData);
            }
        });
        builder.addCase(createEpicAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // Fetch all epics
        builder.addCase(fetchEpicsAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchEpicsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.epics = action.payload?.message || [];
            state.error = null;
        });
        builder.addCase(fetchEpicsAction.rejected, (state, action) => {
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

const epicReducers = epicSlice.reducer;

export default epicReducers;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";

// /* =========================
//    INITIAL STATE
// ========================= */
// const initialState = {
//   loading: false,
//   error: null,
//   epics: [],
//   epic: null,
//   success: false,
//   successMessage: null,
// };

// /* =========================
//    CREATE EPIC
// ========================= */
// export const createEpicAction = createAsyncThunk(
//   "epic/create",
//   async ({ title, description, priority, project }, { rejectWithValue, getState }) => {
//     try {
//       const token =
//         getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.post(
//         `${baseUrl}/epics/create-epic`,
//         { title, description, priority, project },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.data; // single epic object
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// /* =========================
//    FETCH EPICS BY PROJECT
//    (THIS FIXES REFRESH ISSUE)
// ========================= */
// export const fetchEpicsAction = createAsyncThunk(
//   "epic/fetchByProject",
//   async (projectId, { rejectWithValue, getState }) => {
//     try {
//       const token =
//         getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.get(
//         `${baseUrl}/epics/project/${projectId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.data; // array of epics
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// /* =========================
//    SLICE
// ========================= */
// const epicSlice = createSlice({
//   name: "epics",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {

//     /* ========= CREATE ========= */
//     builder.addCase(createEpicAction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(createEpicAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.success = true;

//       // instant UI update
//       state.epics.push(action.payload);
//     });

//     builder.addCase(createEpicAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     /* ========= FETCH ========= */
//     builder.addCase(fetchEpicsAction.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(fetchEpicsAction.fulfilled, (state, action) => {
//       state.loading = false;

//       // 🔥 CRITICAL FOR REFRESH PERSISTENCE
//       state.epics = action.payload || [];
//     });

//     builder.addCase(fetchEpicsAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

// export default epicSlice.reducer;