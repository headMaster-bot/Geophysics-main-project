import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slice/user/usersSlice";
import { PROJECT_STATUS } from "../../utils/status";

const DashboardCard = ({ Cards }) => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    // SAFE DATA EXTRACTION
    const projects = profile?.message?.projects || [];
    const surveys = profile?.message?.survey || []; // 👈 FIXED (use correct path)

    console.log("PROJECT STATUSES:", projects);
    console.log("SURVEY STATUSES:", surveys);

    // NORMALIZER (fixes mismatch between project + survey)
    const normalize = (item, type) => ({
        type,
        status: (
            item?.status ||
            item?.surveyStatus ||
            item?.state ||
            ""
        ).toLowerCase(),
    });

    // const normalize = (item, type) => {
    //     let rawStatus =
    //         item?.status ??
    //         item?.surveyStatus ??
    //         item?.state ??
    //         "";

    //     rawStatus = String(rawStatus).toLowerCase().trim();

    //     // 🔥 handle all draft variations
    //     if (
    //         rawStatus === "draft" ||
    //         rawStatus.includes("draft") ||
    //         item?.isDraft === true
    //     ) {
    //         rawStatus = "draft";
    //     }

    //     return {
    //         type,
    //         status: rawStatus,
    //     };
    // };

    const combinedData = useMemo(() => {
        return [
            ...projects.map(p => normalize(p, "project")),
            ...surveys.map(s => normalize(s, "survey")),
        ];
    }, [projects, surveys]);
    console.log(
        "DRAFT ITEMS:",
        combinedData.filter(i => i.status === "draft")
    );

    // COUNT EVERYTHING
    const counts = useMemo(() => {
        return combinedData.reduce(
            (acc, item) => {
                acc.total++;

                if (item.status === PROJECT_STATUS.ACTIVE) acc.active++;
                if (item.status === PROJECT_STATUS.COMPLETED) acc.completed++;
                if (item.status === PROJECT_STATUS.DRAFT) acc.draft++;

                return acc;
            },
            {
                total: 0,
                active: 0,
                completed: 0,
                draft: 0,
            }
        );
    }, [combinedData]);

    const userCards = [
        {
            id: 1,
            cardTitle: "Total",
            numb: counts.total,
            image: Cards?.[0]?.image || "",
        },
        {
            id: 2,
            cardTitle: "Active",
            numb: counts.active,
            image: Cards?.[1]?.image || "",
        },
        {
            id: 3,
            cardTitle: "Completed",
            numb: counts.completed,
            image: Cards?.[2]?.image || "",
        },
        {
            id: 4,
            cardTitle: "Drafts",
            numb: counts.draft,
            image: Cards?.[3]?.image || "",
        },
    ];

    if (loading) {
        return <p className="text-gray-500">Loading profile...</p>;
    }

    if (error) {
        return (
            <p className="text-red-500">
                Error loading profile: {error?.message || error}
            </p>
        );
    }

    return (
        <>
            {userCards.map((items) => (
                <div
                    key={items.id}
                    className="md:w-[223px] w-full mx-auto rounded-[10px] text-[#4A5565] border border-[#DADCE0] py-[20px] md:px-[25px] px-4 bg-[#FFFFFF]"
                >
                    <div className="md:w-[195px] flex justify-around items-center">
                        <div className="w-[88px]">
                            <p className="capitalize">{items.cardTitle}</p>
                            <p className="font-bold text-[20px]">
                                {items.numb}
                            </p>
                        </div>
                        <div className="w-[40px]">
                            <img
                                src={items.image}
                                alt={items.cardTitle}
                                className="object-contain w-10"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DashboardCard;