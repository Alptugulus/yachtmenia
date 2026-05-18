import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { COMPANY } from '@/utils/constants'

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

function marinaMarkerIcon() {
  return L.divIcon({
    className: 'marina-map-marker',
    html: `<span class="marina-map-marker__ring" aria-hidden="true"></span><span class="marina-map-marker__core" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></svg></span>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  })
}

function MapResize() {
  const map = useMap()

  useEffect(() => {
    const fix = () => map.invalidateSize({ animate: false })
    const timers = [0, 80, 250, 500, 1000, 1500].map((ms) => window.setTimeout(fix, ms))
    const root = map.getContainer().closest('.marina-map')
    const ro =
      root && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fix) : null
    if (root && ro) ro.observe(root)
    return () => {
      timers.forEach(window.clearTimeout)
      ro?.disconnect()
    }
  }, [map])

  return null
}

function MapMotion({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  const motionAllowed = useMotionAllowed()

  useEffect(() => {
    if (!motionAllowed) {
      map.setView(center, zoom, { animate: false })
      return
    }
    map.setView([center[0] - 0.007, center[1] - 0.01], zoom - 1, { animate: false })
    const id = window.setTimeout(() => {
      map.flyTo(center, zoom, { duration: 1.25, easeLinearity: 0.25 })
    }, 280)
    return () => window.clearTimeout(id)
  }, [map, center, zoom, motionAllowed])

  return null
}

export function MarinaMapLeaflet() {
  const { lat, lng, zoom } = COMPANY.marina
  const center = useMemo(() => [lat, lng] as [number, number], [lat, lng])
  const icon = useMemo(() => marinaMarkerIcon(), [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="marina-map__canvas absolute inset-0 z-0 h-full w-full"
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      attributionControl={false}
      zoomControl={false}
    >
      <TileLayer
        url={TILE_URL}
        subdomains="abcd"
        maxZoom={20}
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      <Marker position={center} icon={icon} zIndexOffset={1000} />
      <MapResize />
      <MapMotion center={center} zoom={zoom} />
    </MapContainer>
  )
}
