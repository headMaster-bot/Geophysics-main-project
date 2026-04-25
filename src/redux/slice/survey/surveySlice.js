import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

// initialState
const initialState = {
    loading: false,
    error: null,
    drafts: [],
    completes: [],
    surveys: [],
    surveyss: [],
    survey: null,
    success: false,
    successMessage: null,
    recommendedMethods: [],  // ✅ ADDED: Was missing!
};

// Create Survey Action
export const createSurveyAction = createAsyncThunk(
    "surveys/create",
    async (surveyData, { rejectWithValue, getState, dispatch }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;

            console.log('📤 Redux createSurveyAction: Starting survey creation');
            console.log('  Token exists?', !!token);
            console.log('  Survey data:', surveyData);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            console.log('  Sending POST to:', `${baseUrl}/surveys/create-survey`);

            const res = await axios.post(`${baseUrl}/surveys/create-survey`, surveyData, config);

            // console.log('📥 createSurveyAction Response:', res.data);
            const surveyId = res.data.surveyCreated?._id || res.data.survey?._id;
            // console.log('  Survey created with ID:', surveyId);

            return res.data;
        } catch (error) {
            console.error('❌ createSurveyAction Error:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                message: error.response?.data?.message || error.message,
                fullError: error.response?.data
            });
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Get User Surveys Action
export const getUserSurveysAction = createAsyncThunk(
    "surveys/getUserSurveys",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/surveys`, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Get Single Survey Action
export const getSurveyAction = createAsyncThunk(
    "surveys/getSurvey",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${baseUrl}/surveys/${id}`, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Update Survey Action
// export const updateSurveyAction = createAsyncThunk(
//     "surveys/update",
//     async (payload, { rejectWithValue, getState }) => {
//         try {
//             const { id, surveyData } = payload;
//             const {
//                 surveyName,
//                 description,
//                 surveyObjective,
//                 latitude,
//                 longitude,
//                 vegetationDensity,
//                 geologicalSetting,
//                 minDepth,
//                 maxDepth,
//                 siteConstraints,
//                 ambientNoise,
//                 layoutPattern,
//                 stationSpacing,
//                 lineSpacing,
//             } = surveyData;

//             const token = getState()?.users?.userAuth?.userInfo?.message?.token;
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             console.log('📤 Redux updateSurveyAction: Sending to backend:', {
//                 url: `${baseUrl}/surveys/update/${id}`,
//                 surveyObjective,
//                 geologicalSetting,
//                 minDepth,
//                 maxDepth
//             });

//             const res = await axios.put(`${baseUrl}/surveys/update/${id}`, {
//                 surveyObjective,
//                 latitude,
//                 longitude,
//                 vegetationDensity,
//                 geologicalSetting,
//                 minDepth,
//                 maxDepth,
//                 siteConstraints,
//                 ambientNoise,
//                 layoutPattern,
//                 stationSpacing,
//                 lineSpacing,
//             }, config);

//             console.log('📥 Redux updateSurveyAction: Response received:', res.data);
//             console.log('  Survey saved:', res.data.survey?._id);
//             console.log('  Recommended methods:', res.data.recommendedMethods);

//             return {
//                 survey: res.data.survey,
//                 recommendedMethods: res.data.recommendedMethods
//             };
//         } catch (error) {
//             console.error('❌ Redux updateSurveyAction Error:', {
//                 status: error.response?.status,
//                 message: error.response?.data?.message || error.message,
//                 fullError: error.response?.data
//             });
//             return rejectWithValue(error?.response?.data?.message || error.message);
//         }
//     }
// );

export const updateSurveyAction = createAsyncThunk(
    "surveys/update",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { id, surveyData } = payload || {};

            if (!id) {
                throw new Error("Survey ID is required");
            }

            if (!surveyData || typeof surveyData !== "object") {
                throw new Error("surveyData is missing or invalid");
            }

            // Remove undefined values (VERY IMPORTANT)
            const updateData = Object.fromEntries(
                Object.entries(surveyData).filter(
                    ([_, value]) => value !== undefined && value !== null
                )
            );

            const token =
                getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            console.log("Sending CLEAN payload:", {
                url: `${baseUrl}/surveys/update/${id}`,
                updateData,
            });

            const res = await axios.put(
                `${baseUrl}/surveys/update/${id}`,
                updateData, // ONLY CLEAN DATA
                config
            );

            console.log("Response:", res.data);

            return {
                survey: res.data.survey,
                recommendedMethods: res.data.recommendedMethods || [],
                message: res.data.message,
            };
        } catch (error) {
            console.error("updateSurveyAction Error:", {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
                fullError: error.response?.data,
            });

            return rejectWithValue(
                error?.response?.data?.message || error.message
            );
        }
    }
);

// Delete Survey Action
export const deleteSurveyAction = createAsyncThunk(
    "surveys/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.delete(`${baseUrl}/surveys/${id}`, config);
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);
// update survey status
export const updateSurveyStatusAction = createAsyncThunk(
    "survey/status",
    async ({ surveyId, status }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${baseUrl}/surveys/update-status`, {
                surveyId,
                status
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);
// create draft action 
export const saveDraftAction = createAsyncThunk(
    "survey/saveDraft",
    async (surveyData, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.post(
                `${baseUrl}/surveys/save-to-draft`,
                surveyData,
                config
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
// fetch all status action
export const fetchDraftsAction = createAsyncThunk(
    "survey/fetchDrafts",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/surveys/gets-status?status=draft`,
                config
            );

            console.log(data, "yess");


            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// get draft
export const fetchDraftAction = createAsyncThunk(
    "survey/fetchDraft",
    async (surveyId, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/surveys/draft/${surveyId}`,
                config
            );
            console.log(data, "get draft");

            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// Survey complete button
export const completeSurveyAction = createAsyncThunk(
    "survey/complete",
    async (surveyId, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("completed button", `${baseUrl}/surveys/completed/${surveyId}`);

            const { data } = await axios.put(
                `${baseUrl}/surveys/completed/${surveyId}`,
                {},
                config
            );
            console.log(data, "Surveyslice");


            return data;

        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// fetch all complete survey action
export const fetchCompleteAction = createAsyncThunk(
    "survey/fetchComplete",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.message?.token;
            console.log(token, "kkkkkkkk");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("URL:", `${baseUrl}/surveys/gets-draft?status=completed`, "hhhfffcook");

            const { data } = await axios.get(
                `${baseUrl}/surveys/gets-draft?status=completed`,
                config
            );

            console.log(data, "complete");


            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

//both draft and complete
export const fetchSurveyByStatusAction = createAsyncThunk(
    "survey/fetchByStatus",
    async (statuses, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const query = statuses.join(",");

            const { data } = await axios.get(
                `${baseUrl}/surveys?status=${query}`,
                config
            );
            console.log(data, "yesnnnnnn");


            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const surveySlice = createSlice({
    name: "surveys",
    initialState,
    extraReducers: (builder) => {
        // Create Survey
        builder.addCase(createSurveyAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createSurveyAction.fulfilled, (state, action) => {
            console.log('=== REDUX: createSurveyAction.fulfilled ===');
            console.log('Full action.payload:', action.payload);

            state.loading = false;
            state.success = true;
            state.successMessage = action.payload.message;

            // ✅ CLEAR OLD RECOMMENDATIONS WHEN NEW SURVEY IS CREATED
            state.recommendedMethods = [];
            console.log('🧹 Cleared old recommendedMethods for new survey');

            // Backend returns surveyCreated, not survey
            const surveyData = action.payload.surveyCreated || action.payload.survey;
            console.log('Survey data found:', surveyData);

            if (surveyData) {
                state.survey = surveyData;
                state.surveys.push(surveyData);
                console.log('✅ Survey stored in Redux:', surveyData._id);
            } else {
                console.log('❌ No survey in response to store!');
                console.log('Response keys:', Object.keys(action.payload));
            }
        });
        builder.addCase(createSurveyAction.rejected, (state, action) => {
            console.log('❌ createSurveyAction.rejected:', action.payload);
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // Get User Surveys
        builder.addCase(getUserSurveysAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getUserSurveysAction.fulfilled, (state, action) => {
            state.loading = false;
            state.surveys = action.payload.message;
        });
        builder.addCase(getUserSurveysAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Get Single Survey
        builder.addCase(getSurveyAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSurveyAction.fulfilled, (state, action) => {
            state.loading = false;
            state.survey = action.payload.message;
        });
        builder.addCase(getSurveyAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Survey
        builder.addCase(updateSurveyAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateSurveyAction.fulfilled, (state, action) => {
            console.log('=== REDUX: updateSurveyAction.fulfilled ===');
            console.log('Full action.payload:', action.payload);
            console.log('recommendedMethods from payload:', action.payload.recommendedMethods);
            console.log('Type:', typeof action.payload.recommendedMethods);
            console.log('Is array?', Array.isArray(action.payload.recommendedMethods));

            state.loading = false;
            state.success = true;
            state.successMessage = action.payload.message || "Survey updated successfully";

            // ✅ ENSURE recommendedMethods is ALWAYS an array
            state.recommendedMethods = Array.isArray(action.payload.recommendedMethods)
                ? action.payload.recommendedMethods
                : [];

            console.log('State after update - recommendedMethods:', state.recommendedMethods);
            console.log('✅ Recommendations cleared/updated for survey objective');

            if (action.payload.survey) {
                state.survey = action.payload.survey;
                // Update in surveys array - only find if survey has _id
                if (action.payload.survey._id) {
                    const index = state.surveys.findIndex(s => s && s._id === action.payload.survey._id);
                    if (index !== -1) {
                        state.surveys[index] = action.payload.survey;
                    }
                }
            }
        });
        builder.addCase(updateSurveyAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });

        // Delete Survey
        builder.addCase(deleteSurveyAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteSurveyAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.successMessage = action.payload.message;
            // Remove from surveys array - safely filter out deleted survey
            state.surveys = state.surveys.filter(s => s && s._id && s._id !== action.meta.arg);
        });
        builder.addCase(deleteSurveyAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        });
        // update survey status 
        // builder

        // 🔄 PENDING
        builder.addCase(updateSurveyStatusAction.pending, (state) => {
            state.loading = true;
        })

        // ✅ SUCCESS
        builder.addCase(updateSurveyStatusAction.fulfilled, (state, action) => {
            const updatedSurvey = action.payload.data;

            state.profile.message.survey =
                state.profile.message.survey.map((survey) =>
                    survey._id === updatedSurvey._id ? updatedSurvey : survey
                );
        });

        // ❌ ERROR
        builder.addCase(updateSurveyStatusAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
        });
        // create draft
        builder.addCase(saveDraftAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(saveDraftAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;

            // update or insert draft
            const index = state.drafts.findIndex(
                (d) => d._id === action.payload._id
            );

            if (index !== -1) {
                state.drafts[index] = action.payload;
            } else {
                state.drafts.unshift(action.payload);
            }

            state.currentDraft = action.payload;
        });
        builder.addCase(saveDraftAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // FETCH DRAFTS
        // =========================
        builder.addCase(fetchDraftsAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchDraftsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.drafts = action.payload;
        })
        builder.addCase(fetchDraftsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // get draft
        builder.addCase(fetchDraftAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchDraftAction.fulfilled, (state, action) => {
            state.loading = false;
            state.survey = action.payload.survey;
        })
        builder.addCase(fetchDraftAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        });

        // complete Survey
        builder.addCase(completeSurveyAction.pending, (state) => {
            state.loadingSurvey = true;
        });

        builder.addCase(completeSurveyAction.fulfilled, (state, action) => {
            state.loading = false;
            state.survey = action.payload.survey;
            state.success = true;
        });

        builder.addCase(completeSurveyAction.rejected, (state, action) => {
            state.loadingSurvey = false;
            state.error = action.payload?.message;
        });

        // complete button survey action
        builder.addCase(fetchCompleteAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCompleteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.completes = action.payload;

        })
        builder.addCase(fetchCompleteAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        // both

        builder.addCase(fetchSurveyByStatusAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchSurveyByStatusAction.fulfilled, (state, action) => {
            state.loading = false;
            state.surveys = action.payload || [];
        });

        builder.addCase(fetchSurveyByStatusAction.rejected, (state, action) => {
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
    },
});

// Generate reducers
const surveyReducers = surveySlice.reducer;

export default surveyReducers;