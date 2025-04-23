"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileVideo, Image as ImageIcon, Link, Upload, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { RegistrationModal } from "@/components/shared/registration-modal"

interface CityPublic {
  id: string
  name: string
  logo: string
  subscribers: number
  postPrice: number
  storyPrice: number
  selected?: boolean
}

interface City {
  name: string
  publics: CityPublic[]
  expanded?: boolean
  allSelected?: boolean
}

interface RegionPublicSelectorProps {
  region: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

// Mock data for cities and publics
const mockCities: City[] = [
  {
    name: "Павлодар",
    publics: [
      {
        id: "1",
        name: "Павлодар Today",
        logo: "/public_demo.png",
        subscribers: 856000,
        postPrice: 80000,
        storyPrice: 60000
      },
      {
        id: "2",
        name: "Павлодар News",
        logo: "/public_demo.png",
        subscribers: 320000,
        postPrice: 60000,
        storyPrice: 45000
      }
    ]
  },
  {
    name: "Аксу",
    publics: [
      {
        id: "3",
        name: "Аксу Life",
        logo: "/public_demo.png",
        subscribers: 140000,
        postPrice: 40000,
        storyPrice: 30000
      }
    ]
  },
  {
    name: "Экибастуз",
    publics: [
      {
        id: "4",
        name: "Экибастуз Online",
        logo: "/public_demo.png",
        subscribers: 180000,
        postPrice: 50000,
        storyPrice: 35000
      },
      {
        id: "5",
        name: "Экибастуз News",
        logo: "/public_demo.png",
        subscribers: 150000,
        postPrice: 45000,
        storyPrice: 30000
      }
    ]
  }
]

const calculateTotals = (cities: City[]) => {
  const selectedPublics = cities.flatMap(city => city.publics.filter(p => p.selected))
  return {
    count: selectedPublics.length,
    subscribers: selectedPublics.reduce((sum, p) => sum + p.subscribers, 0),
    cost: selectedPublics.reduce((sum, p) => sum + p.postPrice + p.storyPrice, 0)
  }
}

export function RegionPublicSelector({ region, trigger, open, onOpenChange }: RegionPublicSelectorProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setOpen = isControlled ? onOpenChange : setInternalOpen
  const [date, setDate] = React.useState<Date>()
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [description, setDescription] = React.useState("")
  const [link, setLink] = React.useState("")
  const [cities, setCities] = React.useState<City[]>(mockCities)
  const [searchTerm, setSearchTerm] = React.useState("")

  const toggleCityExpanded = (cityName: string) => {
    setCities(cities.map(city => 
      city.name === cityName 
        ? { ...city, expanded: !city.expanded }
        : city
    ))
  }

  const togglePublicSelected = (cityName: string, publicId: string) => {
    setCities(cities.map(city => 
      city.name === cityName 
        ? {
            ...city,
            publics: city.publics.map(p => 
              p.id === publicId ? { ...p, selected: !p.selected } : p
            )
          }
        : city
    ))
  }

  const toggleAllCityPublics = (cityName: string, selected: boolean) => {
    setCities(cities.map(city => 
      city.name === cityName ? { ...city, publics: city.publics.map(p => ({ ...p, selected })) } : city
    ))
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // TODO: Implement submission logic
    const totals = calculateTotals(cities)
    toast.success("Заявка отправлена на модерацию")
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Выбрать регион</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Размещение в instagram-пабликах - {region}
          </DialogTitle>
        </DialogHeader>
        
        {/* Region Banner */}
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-6">
          <img
            src="/region_banner.jpg"
            alt={region}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Regional Statistics Title */}
        <h3 className="text-xl font-medium mb-4">
          Общие показатели по {region}
        </h3>

        {/* Regional Statistics */}
        <div className="flex items-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M19 2H5C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 8H17M7 12H17M7 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <span className="font-medium">Кол-во городов:</span>{" "}
              <span className="font-bold">{cities.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div>
              <span className="font-medium">Кол-во пабликов:</span>{" "}
              <span className="font-bold">
                {cities.reduce((sum, city) => sum + city.publics.length, 0)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div>
              <span className="font-medium">Кол-во подписчиков:</span>{" "}
              <span className="font-bold">
                {new Intl.NumberFormat("ru-RU").format(
                  cities.reduce((sum, city) => 
                    sum + city.publics.reduce((pSum, p) => pSum + p.subscribers, 0), 0
                  )
                )}
              </span>
            </div>
          </div>
        </div>

        {/* City/Public Selection */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Поиск пабликов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-lg border">
            <div className="max-h-[300px] overflow-y-auto">
              {cities.map((city) => (
                <div key={city.name} className="border-b last:border-b-0">
                  {/* City Header */}
                  <div
                    className="flex items-center justify-between p-4 bg-muted/50 cursor-pointer"
                    onClick={() => toggleCityExpanded(city.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img 
                          src={`/cities/${city.name.toLowerCase()}.jpg`} 
                          alt={city.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Пабликов: {city.publics.length}, Подписчиков: {
                            new Intl.NumberFormat("ru-RU").format(
                              city.publics.reduce((sum, p) => sum + p.subscribers, 0)
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <svg
                      className={cn(
                        "w-4 h-4 transition-transform",
                        city.expanded ? "rotate-180" : ""
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Publics List */}
                  {city.expanded && city.publics.map((public_) => (
                    <div key={public_.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={public_.selected}
                          onCheckedChange={() => togglePublicSelected(city.name, public_.id)}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={public_.logo} alt={public_.name} />
                          <AvatarFallback>{public_.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{public_.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat("ru-RU").format(public_.subscribers)} подписчиков
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="post" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 h-auto p-2 gap-2 bg-muted rounded-xl">
              <TabsTrigger value="post" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-6 rounded-lg transition-all">
                <div className="flex flex-col items-center gap-3">
                  <FileVideo className="h-8 w-8" />
                  <span>ПОСТ / Reels</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="stories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-6 rounded-lg transition-all">
                <div className="flex flex-col items-center gap-3">
                  <ImageIcon className="h-8 w-8" />
                  <span>STORIES</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="link" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-6 rounded-lg transition-all">
                <div className="flex flex-col items-center gap-3">
                  <Link className="h-8 w-8" />
                  <span>Прикрепить ссылку в Stories</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <div className="space-y-8">
              <TabsContent value="link">
                <div className="grid gap-4">
                  <Label htmlFor="link">Ссылка</Label>
                  <div className="relative">
                    <Input 
                      id="link" 
                      placeholder="https://" 
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      Вшитая по умолчанию наша UTM - метка
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="post">
                <div className="grid gap-4">
                  <Label htmlFor="post-upload">Загрузить ПОСТ / Reels</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Input
                      id="post-upload"
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="post-upload"
                      className="flex flex-col items-center gap-4 cursor-pointer"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="font-medium">Перетащите файлы сюда или нажмите для загрузки</p>
                        <p className="text-sm text-muted-foreground">Поддерживаются изображения и видео</p>
                      </div>
                    </label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stories">
                <div className="grid gap-4">
                  <Label htmlFor="story-upload">Загрузить Stories</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center relative">
                    <Input
                      id="story-upload"
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="story-upload"
                      className="flex flex-col items-center gap-4 cursor-pointer"
                    >
                      <Upload className="h-12 w-12 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="font-medium">Перетащите файлы сюда или нажмите для загрузки</p>
                        <p className="text-sm text-muted-foreground">Поддерживаются изображения и видео</p>
                      </div>
                    </label>
                    {selectedFile && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={clearFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <div className="space-y-4">
                <Label>ОПИСАНИЕ ДЛЯ ВАШЕЙ ПУБЛИКАЦИИ</Label>
                <Textarea
                  placeholder="Введите описание вашей публикации..."
                  className="min-h-[200px] resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <Label>ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР КОНТЕНТА</Label>
                <div className="grid md:grid-cols-2 gap-8 justify-center">
                  {/* Post Preview */}
                  <div className="w-[320px] bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 flex items-center justify-between border-b">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="font-medium">pabliki.kz</span>
                      </div>
                      <MoreHorizontal className="h-5 w-5" />
                    </div>
                    <AspectRatio ratio={1}>
                      {preview ? (
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="w-full h-full object-contain" 
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <Upload className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </AspectRatio>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Heart className="h-6 w-6" />
                          <MessageCircle className="h-6 w-6" />
                          <Send className="h-6 w-6" />
                        </div>
                        <Bookmark className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">pabliki.kz</p>
                        <div className="text-sm text-muted-foreground">
                          {description || 'Добавьте описание для вашей публикации'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Preview */}
                  <div className="w-[320px] bg-black rounded-xl overflow-hidden shadow-lg relative" style={{ height: "568px" }}>
                    <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur" />
                        <span className="font-medium text-white">pabliki.kz</span>
                      </div>
                      <MoreHorizontal className="h-5 w-5 text-white" />
                    </div>
                    {preview ? (
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-contain bg-gray-900" 
                      />
                    ) : (
                      <div className="h-full bg-muted flex items-center justify-center">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Heart className="h-6 w-6 text-white" />
                          <Send className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Выбрать дату размещения</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg border shadow-sm"
                  locale={ru}
                />
              </div>

              <div className="space-y-4">
                <div className="sticky bottom-0 p-4 -mx-6 -mb-6 bg-background border-t shadow-lg">
                  <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">КОЛ-ВО ПАБЛИКОВ</div>
                      <div className="text-xl font-bold">
                        {calculateTotals(cities).count}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">КОЛ-ВО ПОДПИСЧИКОВ</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("ru-RU").format(calculateTotals(cities).subscribers)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ЦЕНА РАЗМЕЩЕНИЯ</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          maximumFractionDigits: 0
                        }).format(calculateTotals(cities).cost)} тенге
                      </div>
                    </div>
                  </div>
                  <div className="max-w-4xl mx-auto mt-4">
                    <RegistrationModal
                      trigger={
                        <Button size="lg" className="w-full">
                          ОТПРАВИТЬ НА МОДЕРАЦИЮ
                        </Button>
                      }
                    />
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  После отправки на модерацию Ваша заявка будет рассмотрена в течении 2х часов. 
                  Ответ будет предоставлен к вам на почту, а также будет направленно пуш уведомление.
                </p>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}