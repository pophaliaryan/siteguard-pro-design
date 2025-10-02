import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";

interface Geofence {
  id: number;
  name: string;
  position: LatLngExpression;
  radius: number;
  address: string;
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const GeofenceManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { role } = useRole();
  const [geofences, setGeofences] = useState<Geofence[]>([
    { id: 1, name: "Downtown Tower - Phase 2", position: [40.7589, -73.9851], radius: 200, address: "350 5th Ave, New York, NY" },
    { id: 2, name: "Harbor Bridge Extension", position: [40.7489, -73.9680], radius: 300, address: "Brooklyn Bridge, New York, NY" },
    { id: 3, name: "Riverside Complex", position: [40.7689, -73.9920], radius: 250, address: "Riverside Dr, New York, NY" },
  ]);
  const [editingFence, setEditingFence] = useState<Geofence | null>(null);
  const [newFenceName, setNewFenceName] = useState("");
  const [newFenceAddress, setNewFenceAddress] = useState("");
  const [newFenceRadius, setNewFenceRadius] = useState("200");
  const [newFencePosition, setNewFencePosition] = useState<LatLngExpression | null>(null);

  const canEdit = role === "admin";

  const handleMapClick = (lat: number, lng: number) => {
    if (!canEdit) {
      toast({
        title: "Access Denied",
        description: "Only admins can create geofences",
        variant: "destructive",
      });
      return;
    }
    setNewFencePosition([lat, lng]);
    toast({
      title: "Location Selected",
      description: `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  };

  const handleAddGeofence = () => {
    if (!newFenceName || !newFencePosition || !newFenceAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and click on the map to set location",
        variant: "destructive",
      });
      return;
    }

    const newGeofence: Geofence = {
      id: Math.max(...geofences.map(g => g.id), 0) + 1,
      name: newFenceName,
      position: newFencePosition,
      radius: parseInt(newFenceRadius),
      address: newFenceAddress,
    };

    setGeofences([...geofences, newGeofence]);
    setNewFenceName("");
    setNewFenceAddress("");
    setNewFenceRadius("200");
    setNewFencePosition(null);
    
    toast({
      title: "Geofence Created",
      description: `${newGeofence.name} has been added successfully`,
    });
  };

  const handleDeleteGeofence = (id: number) => {
    if (!canEdit) {
      toast({
        title: "Access Denied",
        description: "Only admins can delete geofences",
        variant: "destructive",
      });
      return;
    }
    setGeofences(geofences.filter(g => g.id !== id));
    toast({
      title: "Geofence Deleted",
      description: "The geofence has been removed",
    });
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
              <h1 className="text-2xl font-heading font-bold text-foreground">Geofence Manager</h1>
              <p className="text-sm text-muted-foreground font-body">
                {canEdit ? "Create and manage site boundaries" : "View site boundaries"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {canEdit && (
              <Card className="p-4">
                <h2 className="text-lg font-heading font-bold text-foreground mb-4">Create New Geofence</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input 
                      id="site-name"
                      value={newFenceName}
                      onChange={(e) => setNewFenceName(e.target.value)}
                      placeholder="e.g., Central Park Site"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      value={newFenceAddress}
                      onChange={(e) => setNewFenceAddress(e.target.value)}
                      placeholder="e.g., 123 Main St, NYC"
                    />
                  </div>
                  <div>
                    <Label htmlFor="radius">Radius (meters)</Label>
                    <Input 
                      id="radius"
                      type="number"
                      value={newFenceRadius}
                      onChange={(e) => setNewFenceRadius(e.target.value)}
                      placeholder="200"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground font-body p-3 bg-muted rounded-lg">
                    📍 Click on the map to set location
                  </div>
                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={handleAddGeofence}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Geofence
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-4">
              <h2 className="text-lg font-heading font-bold text-foreground mb-4">Existing Geofences</h2>
              <div className="space-y-3">
                {geofences.map((fence) => (
                  <Card 
                    key={fence.id}
                    className="p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-foreground text-sm">{fence.name}</h3>
                        <p className="text-xs text-muted-foreground font-body">{fence.address}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">
                          Radius: {fence.radius}m
                        </p>
                      </div>
                      {canEdit && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteGeofence(fence.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <Card className="lg:col-span-2 p-4 shadow-card">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">Interactive Map</h2>
            <div className="h-[700px] rounded-lg overflow-hidden border border-border">
              <MapContainer 
                center={[40.7589, -73.9851]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {canEdit && <MapClickHandler onMapClick={handleMapClick} />}
                {geofences.map((fence) => (
                  <Circle
                    key={fence.id}
                    center={fence.position}
                    radius={fence.radius}
                    pathOptions={{
                      color: '#0B3D91',
                      fillColor: '#0B3D91',
                      fillOpacity: 0.2,
                      weight: 2,
                    }}
                  />
                ))}
                {newFencePosition && (
                  <Circle
                    center={newFencePosition}
                    radius={parseInt(newFenceRadius)}
                    pathOptions={{
                      color: '#2ECC71',
                      fillColor: '#2ECC71',
                      fillOpacity: 0.3,
                      weight: 3,
                      dashArray: '10, 10',
                    }}
                  />
                )}
              </MapContainer>
            </div>
            <p className="text-sm text-muted-foreground font-body mt-4 text-center">
              {canEdit 
                ? "🔵 Existing geofences • 🟢 New geofence preview • Click map to place new geofence"
                : "🔵 Existing geofences (View only)"
              }
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GeofenceManager;
