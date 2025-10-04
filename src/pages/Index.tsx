import { useState } from "react";
import { LatLngBounds } from "leaflet";
import WeatherMap from "@/components/WeatherMap";
import WeatherStats from "@/components/WeatherStats";
import DataDownload from "@/components/DataDownload";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Satellite } from "lucide-react";
import "../i18n/config";

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<LatLngBounds | null>(null);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Satellite className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('title')}
                </h1>
                <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Map Section - Takes 2 columns */}
          <div className="lg:col-span-2 h-full">
            <WeatherMap onAreaSelect={setSelectedArea} />
          </div>

          {/* Stats Sidebar - Takes 1 column */}
          <div className="space-y-4 h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <WeatherStats hasArea={selectedArea !== null} />
            </div>
            <DataDownload hasData={selectedArea !== null} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
