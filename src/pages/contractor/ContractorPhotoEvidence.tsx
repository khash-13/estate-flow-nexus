
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ContractorPhotoEvidence from "@/components/dashboard/contractor/ContractorPhotoEvidence";

const ContractorPhotoEvidencePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Evidence</h1>
          <p className="text-muted-foreground">
            Capture, upload, and manage construction progress photos
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <ContractorPhotoEvidence />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ContractorPhotoEvidencePage;
