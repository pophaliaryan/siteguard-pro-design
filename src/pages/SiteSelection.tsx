import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useToast } from "@/hooks/use-toast";

const sites = [
  { 
    id: 1, 
    name: "Downtown Tower - Phase 2", 
    position: [40.7589, -73.9851] as LatLngExpression,
    radius: 200,
    address: "350 5th Ave, New York, NY"
  },
  { 
    id: 2, 
    name: "Harbor Bridge Extension", 
    position: [40.7489, -73.9680] as LatLngExpression,
    radius: 300,
    address: "Brooklyn Bridge, New York, NY"
  },
  { 
    id: 3, 
    name: "Riverside Complex", 
    position: [40.7689, -73.9920] as LatLngExpression,
    radius: 250,
    address: "Riverside Dr, New York, NY"
  },
  { 
    id: 4, 
    name: "Airport Expansion Wing C", 
    position: [40.7389, -73.9750] as LatLngExpression,
    radius: 400,
    address: "JFK Airport Access Rd, NY"
  },
];

function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

const SiteSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSite, setSelectedSite] = useState<typeof sites[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([40.7589, -73.9851]);

  const handleSiteSelect = (site: typeof sites[0]) => {
    setSelectedSite(site);
    setMapCenter(site.position);
  };

  const handleStartInspection = () => {
    if (selectedSite) {
      toast({
        title: "Geofence Verified",
        description: `You are within the ${selectedSite.name} geofence boundary.`,
      });
      navigate("/mobile-checklist", { state: { site: selectedSite } });
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Select Site</h1>
              <p className="text-sm text-muted-foreground font-body">Choose a geofenced location</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <h2 className="text-lg font-heading font-bold text-foreground mb-4">Available Sites</h2>
              <div className="space-y-3">
                {sites.map((site) => (
                  <Card 
                    key={site.id}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      selectedSite?.id === site.id 
                        ? 'border-primary bg-primary/5 shadow-elevated' 
                        : 'hover:shadow-card'
                    }`}
                    onClick={() => handleSiteSelect(site)}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`h-5 w-5 mt-1 ${selectedSite?.id === site.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-foreground mb-1">{site.name}</h3>
                        <p className="text-sm text-muted-foreground font-body">{site.address}</p>
                        <p className="text-xs text-muted-foreground font-body mt-2">
                          Geofence: {site.radius}m radius
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {selectedSite && (
              <Card className="p-4 bg-gradient-primary text-primary-foreground animate-fade-in">
                <h3 className="font-heading font-bold mb-2">Selected Site</h3>
                <p className="font-body mb-4 opacity-90">{selectedSite.name}</p>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={handleStartInspection}
                >
                  Start Inspection
                </Button>
              </Card>
            )}
          </div>

          <Card className="lg:col-span-2 p-4 shadow-card">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">Geofence Map</h2>
            <div className="h-[600px] rounded-lg overflow-hidden border border-border">
              <MapContainer 
                center={mapCenter} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={mapCenter} />
                {sites.map((site) => (
                  <Circle
                    key={site.id}
                    center={site.position}
                    radius={site.radius}
                    pathOptions={{
                      color: selectedSite?.id === site.id ? '#0B3D91' : '#2ECC71',
                      fillColor: selectedSite?.id === site.id ? '#0B3D91' : '#2ECC71',
                      fillOpacity: 0.2,
                      weight: selectedSite?.id === site.id ? 3 : 2,
                    }}
                  >
                    <Popup>
                      <div className="font-body">
                        <h3 className="font-bold">{site.name}</h3>
                        <p className="text-sm text-muted-foreground">{site.address}</p>
                        <p className="text-xs mt-1">Radius: {site.radius}m</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-4 text-center">
              🔵 Geofence boundaries shown as circles • Select a site to begin inspection
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SiteSelection;
