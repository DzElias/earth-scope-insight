import { Button } from "@/components/ui/button";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface DataDownloadProps {
  hasData: boolean;
}

const DataDownload = ({ hasData }: DataDownloadProps) => {
  const { t } = useTranslation();

  const handleDownloadCSV = () => {
    if (!hasData) {
      toast.error(t('noData'));
      return;
    }
    
    // Mock CSV data
    const csvData = `Date,Temperature,Precipitation,Wind Speed,Air Quality
2024-01-01,28,45,12,Good
2024-02-01,30,38,15,Moderate
2024-03-01,32,52,18,Good`;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather-data.csv';
    a.click();
    
    toast.success('CSV downloaded successfully');
  };

  const handleDownloadJSON = () => {
    if (!hasData) {
      toast.error(t('noData'));
      return;
    }
    
    // Mock JSON data
    const jsonData = {
      location: "Selected Area",
      data: [
        { date: "2024-01-01", temperature: 28, precipitation: 45, windSpeed: 12, airQuality: "Good" },
        { date: "2024-02-01", temperature: 30, precipitation: 38, windSpeed: 15, airQuality: "Moderate" },
        { date: "2024-03-01", temperature: 32, precipitation: 52, windSpeed: 18, airQuality: "Good" }
      ]
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather-data.json';
    a.click();
    
    toast.success('JSON downloaded successfully');
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadCSV}
        disabled={!hasData}
        className="flex-1 gap-2"
      >
        <FileSpreadsheet className="w-4 h-4" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadJSON}
        disabled={!hasData}
        className="flex-1 gap-2"
      >
        <FileJson className="w-4 h-4" />
        JSON
      </Button>
    </div>
  );
};

export default DataDownload;
