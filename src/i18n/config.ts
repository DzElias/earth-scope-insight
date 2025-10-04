import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "NASA Weather Dashboard",
      subtitle: "Interactive weather predictions using NASA Earth observation data",
      drawArea: "Draw Area",
      clearArea: "Clear Area",
      location: "Location",
      selectArea: "Select an area on the map",
      weatherConditions: "Weather Conditions",
      temperature: "Temperature",
      precipitation: "Precipitation",
      windSpeed: "Wind Speed",
      airQuality: "Air Quality",
      humidity: "Humidity",
      pressure: "Atmospheric Pressure",
      historicalData: "Historical Data",
      predictions: "Predictions",
      probability: "Probability",
      high: "High",
      medium: "Medium",
      low: "Low",
      downloadData: "Download Data",
      downloadCSV: "Download CSV",
      downloadJSON: "Download JSON",
      statistics: "Statistics",
      average: "Average",
      maximum: "Maximum",
      minimum: "Minimum",
      selectDate: "Select Date",
      loading: "Loading...",
      noData: "No data available",
      extremeHeat: "Extreme Heat",
      extremeCold: "Extreme Cold",
      heavyRain: "Heavy Rain",
      strongWind: "Strong Wind",
      poorAirQuality: "Poor Air Quality",
      instructions: "Click on the map to draw a boundary area and view weather statistics",
      clickPoint: "Click {{count}} more point(s) to complete the polygon",
      areaSelected: "Area selected! Viewing weather data...",
    }
  },
  es: {
    translation: {
      title: "Dashboard Meteorológico NASA",
      subtitle: "Predicciones meteorológicas interactivas usando datos de observación terrestre de la NASA",
      drawArea: "Dibujar Área",
      clearArea: "Limpiar Área",
      location: "Ubicación",
      selectArea: "Selecciona un área en el mapa",
      weatherConditions: "Condiciones Meteorológicas",
      temperature: "Temperatura",
      precipitation: "Precipitación",
      windSpeed: "Velocidad del Viento",
      airQuality: "Calidad del Aire",
      humidity: "Humedad",
      pressure: "Presión Atmosférica",
      historicalData: "Datos Históricos",
      predictions: "Predicciones",
      probability: "Probabilidad",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      downloadData: "Descargar Datos",
      downloadCSV: "Descargar CSV",
      downloadJSON: "Descargar JSON",
      statistics: "Estadísticas",
      average: "Promedio",
      maximum: "Máximo",
      minimum: "Mínimo",
      selectDate: "Seleccionar Fecha",
      loading: "Cargando...",
      noData: "No hay datos disponibles",
      extremeHeat: "Calor Extremo",
      extremeCold: "Frío Extremo",
      heavyRain: "Lluvia Intensa",
      strongWind: "Viento Fuerte",
      poorAirQuality: "Mala Calidad del Aire",
      instructions: "Haz clic en el mapa para dibujar un área y ver las estadísticas meteorológicas",
      clickPoint: "Haz clic {{count}} punto(s) más para completar el polígono",
      areaSelected: "¡Área seleccionada! Viendo datos meteorológicos...",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
