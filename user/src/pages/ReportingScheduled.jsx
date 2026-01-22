import { useMemo, useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { PiPlusBold } from "react-icons/pi";
import ReportSettings from "./ReportingGeneration";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";
import ScheduleReportTable from "../user/ScheduleReportTable";
import scheduleReportData from "../utils/scheduleReportData";

const SUB_TABS = [
  { id: "report-generating", label: "Report Generating Setting" },
  { id: "scheduled-reports", label: "Scheduled Reports" },
];

export default function ReportingAndScheduled() {
  const [activeSubTab, setActiveSubTab] = useState("report-generating");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const data = useMemo(() => {
    if (!search.trim()) return scheduleReportData;
    const q = search.toLowerCase();
    return scheduleReportData.filter(
      (r) =>
        r.reportName.toLowerCase().includes(q) ||
        r.frequency.toLowerCase().includes(q) ||
        r.format.toLowerCase().includes(q) ||
        r.recipients.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-center gap-10 mb-6">
          {SUB_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-1 ${
                activeSubTab === tab.id
                  ? "text-blue-600 font-medium border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeSubTab === "scheduled-reports" ? (
          <TableWrapper
            actions={
              <>
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by Keywords"
                />
                <Button variant="ghost" className="px-3 border border-blue-500">
                  <CiSliderHorizontal className="text-blue-600" />
                </Button>
                <Button className="whitespace-nowrap gap-2 flex items-center">
                  <PiPlusBold size={25} /> Create Report
                </Button>

                <div className="text-sm text-slate-600 ml-auto">
                  {data.length > 0
                    ? `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        data.length
                      )} of ${data.length}`
                    : "0-0 of 0"}
                </div>

                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || data.length === 0}
                  className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || data.length === 0}
                  className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaAngleRight />
                </button>
              </>
            }
          >
            <ScheduleReportTable data={paginatedData} />
          </TableWrapper>
        ) : (
          <ReportSettings />
        )}
      </div>
    </div>
  );
}
