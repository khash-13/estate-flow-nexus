
import { useAuth } from "@/contexts/AuthContext";
import PurchasedCustomerContent from "@/components/dashboard/customer/PurchasedCustomerContent";
import ProspectCustomerContent from "@/components/dashboard/customer/ProspectCustomerContent";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const isPurchasedCustomer = user?.role === "customer_purchased";
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isPurchasedCustomer ? "My Properties Dashboard" : "Property Finder Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isPurchasedCustomer 
            ? "Manage your properties and track construction progress" 
            : "Find your perfect property and track your applications"}
        </p>
      </div>

      {isPurchasedCustomer ? (
        <PurchasedCustomerContent />
      ) : (
        <ProspectCustomerContent />
      )}
    </div>
  );
};

export default CustomerDashboard;
