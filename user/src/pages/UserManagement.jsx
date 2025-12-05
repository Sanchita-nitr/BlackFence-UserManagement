import { useMemo, useState } from "react";
import Button from "../components/ui/Button";
import SearchInput from "../components/ui/SearchInput";
import TableWrapper from "../components/ui/TableWrapper";
import UserTable from "../user/UserTable";
import sampleData from "../utils/sampleData";

export default function UserManagement() {
  const [search, setSearch] = useState("");

  const data = useMemo(() => {
    if (!search.trim()) return sampleData;
    const q = search.toLowerCase();
    return sampleData.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.username.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1500px] mx-auto">
        <TableWrapper
          title="User Management"
          actions={
            <>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search by Keywords"
              />
              <Button
                onClick={() => alert("Open Add User modal (implement)")}
                className="whitespace-nowrap"
              >
                + Add New User
              </Button>
            </>
          }
        >
          <UserTable data={data} />
        </TableWrapper>
      </div>
    </div>
  );
}
