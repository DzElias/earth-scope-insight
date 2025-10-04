import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Cloud, Thermometer, Wind, Droplets, AlertCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeatherStatsProps {
  hasArea: boolean;
}

const WeatherStats = ({ hasArea }: WeatherStatsProps) => {
  const { t } = useTranslation();

  // Mock data for demonstration
  const temperatureData = [
    { month: 'Jan', temp: 15, prob: 65 },
    { month: 'Feb', temp: 18, prob: 60 },
    { month: 'Mar', temp: 22, prob: 55 },
    { month: 'Apr', temp: 26, prob: 70 },
    { month: 'May', temp: 30, prob: 75 },
    { month: 'Jun', temp: 33, prob: 80 },
  ];

  const precipitationData = [
    { month: 'Jan', rain: 45 },
    { month: 'Feb', rain: 38 },
    { month: 'Mar', rain: 52 },
    { month: 'Apr', rain: 65 },
    { month: 'May', rain: 78 },
    { month: 'Jun', rain: 82 },
  ];

  if (!hasArea) {
    return (
      <Card className="h-full flex items-center justify-center bg-gradient-to-br from-card to-muted/20">
        <CardContent className="text-center py-8">
          <Cloud className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">{t('instructions')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto pr-2">
      <Card className="bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary" />
            {t('temperature')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">28°C</p>
              <p className="text-xs text-muted-foreground">{t('average')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">35°C</p>
              <p className="text-xs text-muted-foreground">{t('maximum')}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">18°C</p>
              <p className="text-xs text-muted-foreground">{t('minimum')}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Droplets className="w-5 h-5 text-accent" />
            {t('precipitation')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={precipitationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="rain" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t('predictions')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">{t('extremeHeat')}</span>
            </div>
            <Badge variant="destructive">{t('high')} - 75%</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">{t('heavyRain')}</span>
            </div>
            <Badge className="bg-accent">{t('medium')} - 45%</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t('strongWind')}</span>
            </div>
            <Badge variant="secondary">{t('low')} - 20%</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-muted/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            {t('weatherConditions')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('windSpeed')}</span>
            <span className="font-semibold">12 km/h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('humidity')}</span>
            <span className="font-semibold">68%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('pressure')}</span>
            <span className="font-semibold">1013 hPa</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('airQuality')}</span>
            <Badge className="bg-accent">{t('medium')}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherStats;
