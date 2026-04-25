import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../../redux/slice/user/usersSlice';
import { PROJECT_STATUS } from '../../utils/status';

const DashboardCard = ({ Cards }) => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.users);
    const surveyCounts = profile?.surveys
    // const projectCounts = profile?.surveys

    // combine data
    const combinedData = [
        ...(surveyCounts || []),
        // ...(projectCounts || [])
    ];

    // Fetch user profile on component mount
    useEffect(() => {
        dispatch(getUserProfileAction());
    }, [dispatch]);

    // const activeProjects = projects.filter(
    //     (p) => p.status === PROJECT_STATUS.ACTIVE
    // ).length;

    // Calculate project counts from profile
    const calculateProjectCounts = () => {
        if (!profile?.message?.projects || profile.message.projects.length === 0) {
            return {
                totalProjects: 0,
                completedProjects: 0,
                draftProjects: 0,
                isActive: false
            };
        }

        const projects = profile.message.projects;
        const completedProjects = projects.filter(p => p.status === 'completed').length;
        const draftProjects = projects.filter(p => p.status === 'draft').length;

        return {
            totalProjects: projects.length,
            completedProjects,
            draftProjects,
            isActive: profile.message.isActive || false
        };
    };

    const projectCounts = calculateProjectCounts();
    // Create cards data from user profile
    const userCards = profile?.message ? [
        {
            id: 1,
            cardTitle: "Total Projects",
            numb: projectCounts.totalProjects,
            image: Cards?.[0]?.image || ""
        },
        {
            id: 2,
            cardTitle: "Active",
            numb:
                profile?.message?.projects?.filter(
                    (p) => p?.status === "active"
                ).length || 0,
            image: Cards?.[1]?.image || ""
        },
        {
            id: 3,
            cardTitle: "Completed",
            numb: projectCounts.completedProjects,
            image: Cards?.[2]?.image || ""
        },
        {
            id: 4,
            cardTitle: "Drafts",
            numb: projectCounts.draftProjects,
            image: Cards?.[3]?.image || ""
        }
    ] : Cards || [];

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">Error loading profile: {error?.message || error}</p>
            </div>
        );
    }

    return (
        <>
            {userCards.map(items => (
                <div
                    className="md:w-[223px] w-full mx-auto rounded-[10px] text-[#4A5565] border border-[#DADCE0] py-[20px] md:px-[25px] px-4 bg-[#FFFFFF]"
                    id={items.id}
                    key={items.id}
                >
                    <div className="md:w-[195px] flex justify-around items-center">
                        <div className="w-[88px]">
                            <p className="font-instrument md:text-[14px] leading-[20px] tracking-[-0.15px] font-normal capitalize">{items.cardTitle}</p>
                            <p className="font-instrument font-bold md:text-[28px] text-[20px] leading-[36px] tracking-[0.4px]">{items.numb}</p>
                        </div>
                        <div className="w-[40px]">
                            <img src={items.image} alt={items.cardTitle} className="object-contain w-10" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default DashboardCard;