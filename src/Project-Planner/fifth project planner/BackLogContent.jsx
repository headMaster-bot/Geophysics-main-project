// import React, { useState } from "react";
// import Plus from "../../Backend Component/image/Plus.jpg";
// import UserStoryModalValidation from "./UserStoryModalValidation";
// import UseStoryTable from "./UseStoryTable";

// export default function BackLogContent({ epicId, projectId }) {
//   console.log("EPIC:", epicId);
//     console.log("PROJECT:", projectId);
//     console.log(projectId, "PARENT PROJECT ID");
//   const [openUserStoryModal, setOpenUserStoryModal] = useState(false);
//   const [selectedEpicId, setSelectedEpicId] = useState(null);
//   const [selectedProjectId, setSelectedProjectId] = useState(null);

//   // ✅ OPEN MODAL WITH EPIC ID
//   // const openUserModal = (id) => {
//   //   setSelectedEpicId(id);
//   //   setOpenUserStoryModal(true);
//   // };

//   const openUserModal = (epicId, projectId) => {
//     setSelectedEpicId(epicId);
//     setSelectedProjectId(projectId);
//     setOpenUserStoryModal(true);
//   };
//   // ✅ CLOSE MODAL
//   const closeUserStoryModal = () => {
//     setOpenUserStoryModal(false);
//     setSelectedEpicId(null);
//     setSelectedProjectId(null);
//   };

  

//   return (
//     <>
//       <div className="flex justify-between items-center mt-10 mb-5 px-5">
//         <div className="w-full">
//           <p className="text-[#364153] text-sm font-medium">
//             User Stories
//           </p>
//         </div>

//         <div className="w-full flex justify-end">
//           <button
//             type="button"
//             onClick={() => openUserModal(epicId, projectId)}  // ✅ FIXED HERE
//             className="border-2 border-[#DADCE0] px-4 py-2 flex items-center gap-2 rounded-[10px]"
//           >
//             <img src={Plus} alt="plus" className="w-[16px]" />
//             <span>Add Story</span>
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <UseStoryTable epicId={epicId} />

//       {/* MODAL */}
//       {openUserStoryModal && (
//         <UserStoryModalValidation
//           closeUserStoryModal={closeUserStoryModal}
//           epicId={selectedEpicId}
//           // projectId={projectId}
//           projectId={selectedProjectId}
//         />
//       )}
//     </>
//   );
// }

import React, { useState } from "react";
import Plus from "../../Backend Component/image/Plus.jpg";
import UserStoryModalValidation from "./UserStoryModalValidation";
import UseStoryTable from "./UseStoryTable";

export default function BackLogContent({ epicId, projectId }) {
  console.log("EPIC:", epicId);
// <<<<<<< HEAD
  console.log("PROJECT id fetched:", projectId);
// =======
  console.log("PROJECT:", projectId);
// >>>>>>> c82ddb3 (fetch to stories by projectId)

  const [openUserStoryModal, setOpenUserStoryModal] = useState(false);
  const [selectedEpicId, setSelectedEpicId] = useState(null);

  // ✅ OPEN MODAL
  const openUserModal = () => {
    setSelectedEpicId(epicId);
    setOpenUserStoryModal(true);
  };

  // ✅ CLOSE MODAL
  const closeUserStoryModal = () => {
    setOpenUserStoryModal(false);
    setSelectedEpicId(null);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-10 mb-5 px-5">
        <div className="w-full">
          <p className="text-[#364153] text-sm font-medium">
            User Stories
          </p>
        </div>

        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={openUserModal}
            className="border-2 border-[#DADCE0] px-4 py-2 flex items-center gap-2 rounded-[10px]"
          >
            <img src={Plus} alt="plus" className="w-[16px]" />
            <span>Add Story</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <UseStoryTable epicId={epicId} />

      {/* MODAL */}
      {openUserStoryModal && (
        <UserStoryModalValidation
          closeUserStoryModal={closeUserStoryModal}
          epicId={selectedEpicId}
          projectId={projectId}   // ✅ direct from props (SAFE)
        />
      )}
    </>
  );
}