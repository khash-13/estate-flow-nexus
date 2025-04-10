
import CustomerStats from "./CustomerStats";
import FeaturedProperties from "./FeaturedProperties";
import UpcomingSiteVisits from "./UpcomingSiteVisits";
import ApplicationStatus from "./ApplicationStatus";

const ProspectCustomerContent = () => {
  return (
    <>
      <CustomerStats isPurchasedCustomer={false} />
      <FeaturedProperties />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingSiteVisits />
        <ApplicationStatus />
      </div>
    </>
  );
};

export default ProspectCustomerContent;
