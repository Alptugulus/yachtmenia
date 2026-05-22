import { useCallback, useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { COMPANY } from '@/utils/constants'

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const SYNC_RETRY_MS = [0, 80, 200, 500] as const

function marinaMarkerIcon() {
  return L.divIcon({
    className: 'marina-map-marker',
    html: `<span class="marina-map-marker__ring" aria-hidden="true"></span><span class="marina-map-marker__core" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/></svg></span>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  })
}

/** Bilgi kartının üstünde; pin hafif sağda (sol kart için denge). */
function pinTargetPoint(map: L.Map) {
  const root = map.getContainer().closest('.marina-map')
  const overlay = root?.querySelector<HTMLElement>('[data-marina-map-overlay]')
  if (!root || !overlay) return null

  const mapEl = map.getContainer()
  const mapRect = mapEl.getBoundingClientRect()
  const card = overlay.getBoundingClientRect()
  const size = map.getSize()

  if (size.x < 1 || size.y < 1 || card.height < 48) return null

  const cardTop = card.top - mapRect.top
  const topPad = 48
  const bottomPad = Math.max(20, size.y - cardTop + 20)

  const pinX = size.x / 2 + Math.min(72, Math.round(size.x * 0.07))
  const pinY = (topPad + size.y - bottomPad) / 2 + Math.min(48, Math.round(size.y * 0.05))

  return L.point(pinX, pinY)
}

/** Pin hedef pikselde görünsün diye harita merkezini hesaplar (panBy birikimi yok). */
function viewCenterForPin(map: L.Map, latlng: L.LatLngExpression, targetZoom: number) {
  const target = pinTargetPoint(map)
  if (!target) return latlng

  const offset = target.subtract(map.getSize().divideBy(2))
  const projected = map.project(latlng, targetZoom)
  return map.unproject(projected.subtract(offset))
}

function centerPinOnMap(map: L.Map, latlng: L.LatLngExpression, targetZoom: number) {
  map.setView(viewCenterForPin(map, latlng, targetZoom), targetZoom, { animate: false })
  return true
}

function MapViewport({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  const motionAllowed = useMotionAllowed()
  const timersRef = useRef<number[]>([])
  const flyingRef = useRef(false)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current = []
  }, [])

  const alignPin = useCallback(
    (latlng: [number, number], targetZoom = zoom) => {
      map.invalidateSize({ animate: false })
      centerPinOnMap(map, latlng, targetZoom)
    },
    [map, zoom],
  )

  const scheduleAlignRetries = useCallback(
    (latlng: [number, number], targetZoom = zoom) => {
      clearTimers()
      const run = () => alignPin(latlng, targetZoom)
      run()
      requestAnimationFrame(() => requestAnimationFrame(run))
      timersRef.current = SYNC_RETRY_MS.map((ms) => window.setTimeout(run, ms))
    },
    [alignPin, clearTimers],
  )

  const syncView = useCallback(
    (target: [number, number], targetZoom = zoom) => {
      const apply = () => scheduleAlignRetries(target, targetZoom)
      map.whenReady(apply)
    },
    [scheduleAlignRetries],
  )

  useEffect(() => {
    flyingRef.current = false
    clearTimers()

    if (!motionAllowed) {
      syncView(center)
      return clearTimers
    }

    syncView([center[0] - 0.007, center[1] - 0.01], zoom - 1)
    const flyId = window.setTimeout(() => {
      flyingRef.current = true
      map.flyTo(center, zoom, { duration: 1.25, easeLinearity: 0.25 })
      map.once('moveend', () => {
        flyingRef.current = false
        scheduleAlignRetries(center, zoom)
      })
    }, 320)

    timersRef.current.push(flyId)
    return clearTimers
  }, [map, center, zoom, motionAllowed, syncView, scheduleAlignRetries, clearTimers])

  useEffect(() => {
    const root = map.getContainer().closest('.marina-map')
    const overlay = root?.querySelector('[data-marina-map-overlay]')
    if (!root || !overlay || typeof ResizeObserver === 'undefined') return

    let debounceId = 0
    const ro = new ResizeObserver(() => {
      if (flyingRef.current) return
      window.clearTimeout(debounceId)
      debounceId = window.setTimeout(() => syncView(center), 80)
    })
    ro.observe(root)
    ro.observe(overlay)

    return () => {
      window.clearTimeout(debounceId)
      ro.disconnect()
    }
  }, [map, center, syncView])

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
      <MapViewport center={center} zoom={zoom} />
    </MapContainer>
  )
}
