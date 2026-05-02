// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";
// import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// // initialState
// const initialState = {
//     loading: false,
//     error: null,
//     epics: [],
//     epic: null,
//     success: false,
//     successMessage: null,
// };

// export const createEpicAction = createAsyncThunk(
//     "epic/create",
//     async ({ title, description, priority, project }, { rejectWithValue, getState, dispatch }) => {
//         try {
//             const token = getState()?.users?.userAuth?.userInfo?.message?.token;
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const res = await axios.post(`${baseUrl}/epics/create-epic`, 
                
//                 {
//                     title, description, priority, project
//                 }, config);
//             console.log(res.data, "epic data");
            
//             if (!res.data) {
//                 throw new Error(res.data.message || "Failed to create epic");
//             }
            
//             return res.data.data;
//         } catch (error) {
//             return rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );

// // fetch all epics action
// export const fetchEpicsAction = createAsyncThunk(
//     "epic/fetchAll",
//     async (projectId, { rejectWithValue, getState, dispatch }) => {
//         try {
//             const token = getState()?.users?.userAuth?.userInfo?.message?.token;
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const res = await axios.get(`${baseUrl}/epics/all-epics`, config);
//             // console.log(res.data, "Epics data");
            
//             return res.data;
//         } catch (error) {
//             return rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );



// const epicSlice = createSlice({
//     name: "epics",
//     initialState,
//     extraReducers: (builder) => {
//         // Create Project
//         builder.addCase(createEpicAction.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(createEpicAction.fulfilled, (state, action) => {
//             state.loading = false;
//             state.success = true;
//             state.successMessage = action.payload?.message || action.payload?.messsage || "Epic created";
//             const epicData = action.payload?.data || action.payload?.messsage || action.payload?.message || null;
//             state.epic = epicData;
//             if (epicData) {
//                 state.epics.push(epicData);
//             }
//         });
//         builder.addCase(createEpicAction.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//             state.success = false;
//         });

//         // Fetch all epics
//         builder.addCase(fetchEpicsAction.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         });
//         builder.addCase(fetchEpicsAction.fulfilled, (state, action) => {
//             state.loading = false;
//             state.epics = action.payload?.message || [];
//             state.error = null;
//         });
//         builder.addCase(fetchEpicsAction.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         });

//         // Reset error and success
//         builder.addCase(resetErrAction.pending, (state) => {
//             state.error = null;
//         });
//         builder.addCase(resetSuccessAction.pending, (state) => {
//             state.success = false;
//             state.successMessage = null;
//         });
//     }
// });

// const epicReducers = epicSlice.reducer;

// export default epicReducers;


//  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//  import axios from "axios";
//  import baseUrl from "../../../utils/baseUrl";

//  const initialState = {
//    loading: false,
//    error: null,
//    epics: [],
//  };

//  /* ================= CREATE EPIC ================= */
//  export const createEpicAction = createAsyncThunk(
//    "epic/create",
//    async (data, { rejectWithValue, getState }) => {
//      try {
//        const token =
//          getState()?.users?.userAuth?.userInfo?.message?.token;

//        const res = await axios.post(
//          `${baseUrl}/epics/create-epic`,
//          data,
//          {
//            headers: {
//              Authorization: `Bearer ${token}`,
//            },
//          }
//        );

//        return res.data.data; // ✅ single epic
//      } catch (error) {
//        return rejectWithValue(error.message);
//      }
//    }
//  );

//  /* ================= FETCH BY PROJECT ================= */
//  export const fetchEpicsAction = createAsyncThunk(
//    "epic/fetch",
//    async (projectId, { rejectWithValue, getState }) => {
//      try {
//        const token =
//          getState()?.users?.userAuth?.userInfo?.message?.token;

//        const res = await axios.get(
//          `${baseUrl}/epics/project/${projectId}`,
//          {
//            headers: {
//              Authorization: `Bearer ${token}`,
//            },
//          }
//        );

//        return res.data.data; // ✅ array
//      } catch (error) {
//        return rejectWithValue(error.message);
//      }
//    }
//  );

//  const epicSlice = createSlice({
//    name: "epics",
//    initialState,
//    reducers: {},

//    extraReducers: (builder) => {
//      builder
//        /* CREATE */
//        .addCase(createEpicAction.fulfilled, (state, action) => {
//          state.epics.push(action.payload); // ✅ instant UI update
//        })

//        /* FETCH */
//        .addCase(fetchEpicsAction.fulfilled, (state, action) => {
//          state.epics = action.payload || []; // ✅ refresh fix
//        });
//    },
//  });

//  export default epicSlice.reducer;


// redux/slice/epic/epicSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";

// const initialState = {
//   loading: false,
//   error: null,
//   epics: [],
// };

// /* ================= FETCH BY PROJECT ================= */
// export const fetchEpicsAction = createAsyncThunk(
//   "epic/fetchByProject",
//   async (projectId, { rejectWithValue, getState }) => {
//     try {
//       const token =
//         getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.get(
//         `${baseUrl}/epics/project/${projectId}`, // ✅ MUST be project-specific
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.data; // array
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// /* ================= CREATE ================= */
// export const createEpicAction = createAsyncThunk(
//   "epic/create",
//   async (data, { rejectWithValue, getState }) => {
//     try {
//       const token =
//         getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.post(
//         `${baseUrl}/epics/create-epic`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.data; // single epic
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const epicSlice = createSlice({
//   name: "epics",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEpicsAction.fulfilled, (state, action) => {
//         state.epics = action.payload || [];
//       })
//       .addCase(createEpicAction.fulfilled, (state, action) => {
//         state.epics.push(action.payload);
//       });
//   },
// });

// export default epicSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";
// import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
// const initialState = {
//   loading: false,
//   error: null,
//   epics: [],
//   epic: null,
//   success: false,
//   successMessage: null,
// };

// /* ================= CREATE EPIC ================= */
// export const createEpicAction = createAsyncThunk(
//   "epic/create",
//   async ({ title, description, priority, project }, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.post(
//         `${baseUrl}/epics/create-epic`,
//         { title, description, priority, project },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ return ONLY the epic object
//       return res.data.data;

//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// /* ================= FETCH EPICS ================= */
// export const fetchEpicsAction = createAsyncThunk(
//   "epic/fetchAll",
//   async (projectId, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.get(
//         `${baseUrl}/epics/project/${projectId}`, // ✅ use projectId if needed
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ return array of epics
//       return res.data.data;

//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// const epicSlice = createSlice({
//   name: "epics",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       /* CREATE */
//       .addCase(createEpicAction.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(createEpicAction.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.successMessage = "Epic created successfully";

//         // ✅ payload is already the epic object
//         state.epic = action.payload;

//         // ✅ update UI instantly
//         state.epics.push(action.payload);
//       })

//       .addCase(createEpicAction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })

//       /* FETCH */
//       .addCase(fetchEpicsAction.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchEpicsAction.fulfilled, (state, action) => {
//         state.loading = false;

//         // ✅ set fresh data from backend
//         state.epics = action.payload || [];
//       })

//       .addCase(fetchEpicsAction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* RESET */
//       .addCase(resetErrAction.pending, (state) => {
//         state.error = null;
//       })

//       .addCase(resetSuccessAction.pending, (state) => {
//         state.success = false;
//         state.successMessage = null;
//       });
//   },
// });

// export default epicSlice.reducer;




// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseUrl from "../../../utils/baseUrl";
// import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// // initialState
// const initialState = {
//   loading: false,
//   error: null,
//   epics: [],
//   epic: null,
//   success: false,
//   successMessage: null,
// };

// /* ================= CREATE EPIC ================= */
// export const createEpicAction = createAsyncThunk(
//   "epic/create",
//   async ({ title, description, priority, project }, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.post(
//         `${baseUrl}/epics/create-epic`,
//         { title, description, priority, project },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ FIX: return only the actual epic object
//       return res.data.data;

//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// /* ================= FETCH EPICS ================= */
// export const fetchEpicsAction = createAsyncThunk(
//   "epic/fetchAll",
//   async (projectId, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.message?.token;

//       const res = await axios.get(
//         `${baseUrl}/epics/project/${projectId}`, // ✅ FIX: use project endpoint
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ FIX: return array directly
//       return res.data.data;

//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message || error.message
//       );
//     }
//   }
// );

// const epicSlice = createSlice({
//   name: "epics",
//   initialState,

//   extraReducers: (builder) => {

//     /* ================= CREATE ================= */
//     builder.addCase(createEpicAction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(createEpicAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.success = true;
//       state.successMessage = "Epic created";

//       // ✅ FIX: payload is already the epic object
//       state.epic = action.payload;

//       // ✅ instant UI update
//       state.epics.push(action.payload);
//     });

//     builder.addCase(createEpicAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.success = false;
//     });

//     /* ================= FETCH ================= */
//     builder.addCase(fetchEpicsAction.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });

//     builder.addCase(fetchEpicsAction.fulfilled, (state, action) => {
//       state.loading = false;

//       // ✅ FIX: use correct data
//       state.epics = action.payload || [];
//     });

//     builder.addCase(fetchEpicsAction.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });

//     /* ================= RESET ================= */
//     builder.addCase(resetErrAction.pending, (state) => {
//       state.error = null;
//     });

//     builder.addCase(resetSuccessAction.pending, (state) => {
//       state.success = false;
//       state.successMessage = null;
//     });
//   },
// });

// export default epicSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

const initialState = {
  loading: false,
  error: null,
  epics: [],
  epic: null,
  success: false,
  successMessage: null,
};

/* ================= CREATE EPIC ================= */
export const createEpicAction = createAsyncThunk(
  "epic/create",
  async ({ title, description, priority, project }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.message?.token;

      const res = await axios.post(
        `${baseUrl}/epics/create-epic`,
        { title, description, priority, project },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data; // ✅ actual epic object
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

/* ================= FETCH EPICS ================= */
export const fetchEpicsAction = createAsyncThunk(
  "epic/fetchAll",
  async (projectId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.message?.token;

      const res = await axios.get(
        `${baseUrl}/epics/project/${projectId}`, // ✅ correct endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data; // ✅ array of epics
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const epicSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createEpicAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEpicAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage = "Epic created";

        state.epic = action.payload;
        state.epics.push(action.payload); // ✅ instant UI
      })
      .addCase(createEpicAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchEpicsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEpicsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.epics = action.payload || [];
      })
      .addCase(fetchEpicsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetErrAction.pending, (state) => {
        state.error = null;
      })
      .addCase(resetSuccessAction.pending, (state) => {
        state.success = false;
        state.successMessage = null;
      });
  },
});

export default epicSlice.reducer;