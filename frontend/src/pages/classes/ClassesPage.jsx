import ContentContainer from "../../components/dashboard/ContentContainer";
import PageHeader from "../../components/common/PageHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/common/FilterBar";
import DataTable from "../../components/dashboard/DataTable";
import Pagination from "../../components/dashboard/Pagination";

const stats = [
  {
    title: "Total Classes",
    value: 18,
  },
  {
    title: "Active Classes",
    value: 16,
  },
  {
    title: "Total Sections",
    value: 42,
  },
  {
    title: "Students",
    value: 1256,
  },
];

const ClassesPage = () => {
  return (
    <ContentContainer>

      <PageHeader
        title="Class Management"
        subtitle="Create, update and manage all classes."
        buttonText="Create Class"
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

        <FilterBar>

          <SearchBar
            placeholder="Search classes..."
          />

        </FilterBar>

        <div className="mt-6">

          <DataTable />

        </div>

        <div className="mt-6">

          <Pagination />

        </div>

      </div>

    </ContentContainer>
  );
};

export default ClassesPage;