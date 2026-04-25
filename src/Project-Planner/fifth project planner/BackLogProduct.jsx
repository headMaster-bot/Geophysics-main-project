import BarChart from "../../Backend Component/image/barchart.png";
import Plus from "../../Backend Component/image/Plus.png";

const BackLogProduct = ({ openModal }) => {
  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between pb-24 items-center mx-8 text-[#101828]">
        <p className="w-[200px] font-instrument font-semibold text-[18px] leading-[28px]">
          Product Backlog
        </p>

        <button
          onClick={openModal}
          type="button"
          className="flex items-center text-[#ffffff] rounded-[10px] bg-[#585858] py-2 px-6"
        >
          <img src={Plus} alt="plus" className="w-[18px]" />
          <p className="font-instrument font-normal text-[14px] leading-[28px] ml-2">
            New Epic
          </p>
        </button>
      </div>

      {/* ================= EMPTY STATE ================= */}
      <div className="flex flex-col justify-center items-center">
        <img src={BarChart} alt="barchart" />

        <p className="my-10 px-6 font-instrument font-semibold text-[18px] leading-[28px] text-[#101828]">
          No Epic Created
        </p>

        <p className="font-instrument font-normal text-[16px] leading-[28px] text-[#101828] text-center">
          Start by breaking down your project into Epics and User Stories.
        </p>

        <button
          onClick={openModal}
          type="button"
          className="flex items-center text-[#ffffff] my-10 rounded-[10px] bg-[#585858] py-[15px] px-[25px]"
        >
          <img src={Plus} alt="plus" className="w-[18px]" />
          <p className="font-instrument font-normal text-[14px] leading-[28px] ml-2">
            Create New Epic
          </p>
        </button>
      </div>
    </div>
  );
};

export default BackLogProduct;