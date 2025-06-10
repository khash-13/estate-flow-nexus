
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, Download } from "lucide-react";
import { formatIndianCurrency } from "@/lib/formatCurrency";

interface SalesReportDialogProps {
  onGenerateReport: (period: string) => void;
}

export function SalesReportDialog({ onGenerateReport }: SalesReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [reportData, setReportData] = useState<any>(null);

  // Mock report data
  const generateMockReport = (period: string) => {
    return {
      period: period,
      totalLeads: 45,
      totalValue: 15750000,
      conversionRate: 18.5,
      avgDealSize: 3500000,
      pipelineValue: 12500000,
      wonDeals: 8,
      lostDeals: 5,
      stageBreakdown: {
        prospecting: 12,
        qualification: 8,
        proposal: 6,
        negotiation: 4,
        closing: 2,
        won: 8,
        lost: 5
      }
    };
  };

  const handleGenerateReport = () => {
    const report = generateMockReport(selectedPeriod);
    setReportData(report);
    onGenerateReport(selectedPeriod);
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    const reportText = `Sales Report - ${reportData.period}
    
Total Leads: ${reportData.totalLeads}
Total Value: ${formatIndianCurrency(reportData.totalValue)}
Conversion Rate: ${reportData.conversionRate}%
Average Deal Size: ${formatIndianCurrency(reportData.avgDealSize)}
Pipeline Value: ${formatIndianCurrency(reportData.pipelineValue)}
Won Deals: ${reportData.wonDeals}
Lost Deals: ${reportData.lostDeals}

Stage Breakdown:
Prospecting: ${reportData.stageBreakdown.prospecting}
Qualification: ${reportData.stageBreakdown.qualification}
Proposal: ${reportData.stageBreakdown.proposal}
Negotiation: ${reportData.stageBreakdown.negotiation}
Closing: ${reportData.stageBreakdown.closing}
Won: ${reportData.stageBreakdown.won}
Lost: ${reportData.stageBreakdown.lost}
`;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${reportData.period}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BarChart className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Sales Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </div>

          {reportData && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Report for {reportData.period}</h3>
                <Button onClick={downloadReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{reportData.totalLeads}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(reportData.totalValue)}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{reportData.conversionRate}%</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg Deal Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{formatIndianCurrency(reportData.avgDealSize)}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pipeline Value:</span>
                      <span className="font-semibold">{formatIndianCurrency(reportData.pipelineValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Won Deals:</span>
                      <span className="font-semibold text-green-600">{reportData.wonDeals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lost Deals:</span>
                      <span className="font-semibold text-red-600">{reportData.lostDeals}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stage Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(reportData.stageBreakdown).map(([stage, count]) => (
                      <div key={stage} className="flex justify-between">
                        <span className="capitalize">{stage}:</span>
                        <span className="font-semibold">{count as number}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
