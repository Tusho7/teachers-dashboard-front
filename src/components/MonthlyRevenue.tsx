import { MonthlyRevenueData } from "../types/monthlyRevenueProps";

const MonthlyRevenue = ({
  monthlyRevenue,
}: {
  monthlyRevenue: MonthlyRevenueData | null;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      <div className="bg-gray-200 rounded-lg flex flex-col gap-10 shadow-md p-6 col-span-2">
        <h3 className="text-2xl font-semibold text-gray-800 mb-0">
          თვიური შემოსავალი
        </h3>
        <div className="flex flex-col md:flex-row  gap-4 justify-between">
          <p className="text-xl text-gray-800">
            {monthlyRevenue ? `ლარი: ${monthlyRevenue.GEL}` : "იტვირთება..."}
          </p>
          <p className="text-xl text-gray-800">
            {monthlyRevenue ? `დოლარი: ${monthlyRevenue.USD}` : "იტვირთება..."}
          </p>
          <p className="text-xl text-gray-800">
            {monthlyRevenue ? `ევრო: ${monthlyRevenue.EURO}` : "იტვირთება..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenue;
