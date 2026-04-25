import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteAccountAction, deleteAllProjectsAction } from '../redux/slice/user/usersSlice';

export default function DangerZone() {
  // dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // delete account function
  const handleDeleteAccount = () => {
    console.log("working");

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteAccountAction()).unwrap();

          // clear local storage
          localStorage.removeItem("userInfo");

          Swal.fire("Deleted!", "Your account has been deleted.", "success");

          navigate("/login");
        } catch (err) {
          Swal.fire("Error", err.message || "Something went wrong", "error");
        }
      }
    });
  };

  // delete projects
  const handleDeleteAll = async () => {
    Swal.fire({
      title: "Delete ALL projects?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteAllProjectsAction()).unwrap();

          Swal.fire("Deleted!", "All projects removed.", "success");
        } catch (err) {
          Swal.fire("Error", err.message || "Failed", "error");
        }
      }
    });
  };
  return (
    <div className='border border-[#DADCE0] rounded-[10px] pt-[25px] pb-[1px] px-[25px]'>
      <div className="text-[#E7000B] pb-8">
        <p className="capitalize font-instrument font-bold text-[20px] leading-[27px] tracking-[-0.44px]">danger zone</p>
      </div>
      <div className="border-2 w-[917] bg-[#FEF2F2] rounded-[10px] border-[#FFC9C9] px-[16px] py-[18px] flex justify-between items-center">
        <div>
          <p className="text-[#101828] pye-4 font-instrument font-bold text-[18px] leading-[20px] tracking-[-0.15px] capitalize">Delete All Projects</p>
          <p className="font-instrument font-medium text-[14px] leading-[20px] tracking-[-0.15px] capitalize text-[#4A5565]">Permanently delete all your projects and data</p>

        </div>
        <div>
          <button className="bg-[#E7000B] text-[#ffffff] rounded-[10px] py-[6px] px-[12px] capitalize" onClick={handleDeleteAll}>
            delete all
          </button>
        </div>
      </div>

      <div className="border-2 w-[917] my-4 bg-[#FEF2F2] rounded-[10px] border-[#FFC9C9] px-[16px] py-[18px] flex justify-between items-center">
        <div>
          <p className="text-[#101828] pye-4 font-instrument font-bold text-[18px] leading-[20px] tracking-[-0.15px] capitalize">Delete Account</p>
          <p className="font-instrument font-medium text-[14px] leading-[20px] tracking-[-0.15px] capitalize text-[#4A5565]">Permanently delete your account</p>
        </div>
        <div>
          <button className="bg-[#E7000B] text-[#ffffff] rounded-[10px] py-[6px] px-[12px] capitalize" onClick={handleDeleteAccount}>
            delete account
          </button>
        </div>
      </div>

    </div>
  )
}
