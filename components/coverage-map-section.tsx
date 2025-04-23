"use client"

import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RegionPublicSelector } from "@/components/region-public-selector"

const cities = [
  { name: "Астана", x: 60, y: 32, followers: "2.1M", region: "Акмолинская область" },
  { name: "Алматы", x: 75, y: 82, followers: "3.5M", region: "Алматинская область" },
  { name: "Шымкент", x: 55, y: 88, followers: "1.8M", region: "Южно-Казахстанская область" },
  { name: "Караганда", x: 65, y: 42, followers: "1.2M", region: "Карагандинская область" },
  { name: "Актобе", x: 28, y: 38, followers: "900K", region: "Актюбинская область" },
  { name: "Атырау", x: 13, y: 62, followers: "750K", region: "Атырауская область" },
  { name: "Павлодар", x: 75, y: 25, followers: "650K", region: "Павлодарская область" },
  { name: "Усть-Каменогорск", x: 87, y: 42, followers: "800K", region: "Восточно-Казахстанская область" },
  { name: "Семей", x: 80, y: 40, followers: "700K", region: "Восточно-Казахстанская область" },
  { name: "Костанай", x: 42, y: 18, followers: "550K", region: "Костанайская область" },
]

interface CityMarkerProps {
  name: string;
  x: number;
  y: number;
  followers: string;
  region: string;
  onClick: (region: string) => void;
}

function CityMarker({ name, x, y, followers, region, onClick }: CityMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const spring = useSpring({
    scale: isHovered ? 1 : 0,
    config: { tension: 300 }
  })

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(region)}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: isHovered ? 10 : 1
      }}
    >
      {/* Compact Circle */}
      <div className="relative cursor-pointer">
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-blue-600 text-[10px] font-bold hover:bg-blue-50 transition-colors shadow-sm">
          {followers}
        </div>
      </div>

      {/* Expanded Card - Rendered outside the bubble for proper stacking */}
      {isHovered && (
        <animated.div
          className="fixed bg-popover/95 backdrop-blur-sm text-popover-foreground rounded-lg shadow-lg p-4 whitespace-nowrap text-center min-w-[140px]"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '100%',
            marginBottom: '8px',
            transformOrigin: 'center bottom',
            transform: spring.scale.to(s => `scale(${s}) translateX(-50%)`),
            zIndex: 999
          }}
        >
          <div className="text-sm font-medium mb-1">{name}</div>
          <div className="text-xl font-bold mb-1">{followers}</div>
          <div className="text-xs text-muted-foreground/80">подписчиков</div>
        </animated.div>
      )}
    </div>
  )
}

export function CoverageMapSection() {
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCityClick = (region: string) => {
    setSelectedRegion(region)
    setIsModalOpen(true)
  }

  return (
    <section className="py-24 bg-muted/50">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          Покрытие аудитории по Казахстану
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              <AspectRatio ratio={16/9}>
                <div className="relative w-full h-full">
                  <img
                    src="/kaz_map.svg"
                    alt="Карта Казахстана"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0">
                    {cities.map((city) => (
                      <CityMarker 
                        key={city.name} 
                        {...city} 
                        onClick={handleCityClick}
                      />
                    ))}
                  </div>
                </div>
              </AspectRatio>
            </CardContent>
          </Card>
        </div>
        
        {/* Region Public Selector Modal */}
        <RegionPublicSelector
          region={selectedRegion}
          trigger={<div className="hidden" />}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  )
}