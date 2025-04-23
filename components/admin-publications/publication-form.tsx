"use client"

import React, { useState } from 'react'
import { ArrowLeft, Save, Upload, Image as ImageIcon, FileVideo, Link, Send } from "lucide-react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

const mockPublics = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Паблик ${i + 1}`,
  logo: "/public_demo.png",
  subscribers: Math.floor(Math.random() * 900000) + 100000,
  postCost: Math.floor(Math.random() * 80000) + 20000,
  storyCost: Math.floor(Math.random() * 60000) + 15000,
  selected: false
}))

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-muted p-2 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-muted-foreground/20' : ''}
        >
          Bold
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-muted-foreground/20' : ''}
        >
          Italic
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-muted-foreground/20' : ''}
        >
          Underline
        </Button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px] prose prose-sm max-w-none" />
    </div>
  )
}

import type { AdminPublication } from "./admin-publications-table"

interface PublicationFormProps {
  mode?: "create" | "edit"
  id?: string
  initialData?: AdminPublication
}

export function PublicationForm({ mode = "create", id, initialData }: PublicationFormProps) {
  const router = useRouter()
  const [campaignName, setCampaignName] = useState(initialData?.campaignName || "")
  const [launchType, setLaunchType] = useState<"manual" | "auto">(initialData?.type || "manual")
  const [contentType, setContentType] = useState(initialData?.content?.link ? "link" : "post")
  const [selectedFile, setSelectedFile] = useState<File | null>(null) 
  const [preview, setPreview] = useState<string | null>(initialData?.content?.images[0] || null)
  const [description, setDescription] = useState(initialData?.content?.text || "")
  const [link, setLink] = useState(initialData?.content?.link || "")
  const [date, setDate] = useState<Date | undefined>(initialData?.targetDate)
  const [status, setStatus] = useState<"draft" | "moderation" | "scheduled" | "published" | "error">(
    initialData?.status || "draft"
  )
  // Initialize publics state with mockPublics
  const [selectedPublics, setSelectedPublics] = useState(
    initialData?.selectedPublics || mockPublics
  )

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

  const togglePublicSelection = (id: string) => {
    setSelectedPublics(selectedPublics.map(pub => 
      pub.id === id ? { ...pub, selected: !pub.selected } : pub
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted/50"
            onClick={() => router.push("/dashboard/start-publication")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {mode === "create" ? "Создать размещение" : "Редактировать размещение"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Сохранить черновик
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
            {mode === "create" ? "Разместить контент" : "Обновить размещение"}
          </Button>
        </div>
      </div>

      {/* Campaign Name Input */}
      <Card>
        <CardHeader>
          <CardTitle>Название кампании</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Введите название кампании"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Launch Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant={launchType === "manual" ? "default" : "outline"}
          onClick={() => setLaunchType("manual")}
          className="h-16 text-lg"
        >
          ЗАПУСК РАЗМЕЩЕНИЯ ВРУЧНУЮ
        </Button>
        <Button
          variant={launchType === "auto" ? "default" : "outline"}
          onClick={() => setLaunchType("auto")}
          className="h-16 text-lg"
        >
          ЗАПУСК РАЗМЕЩЕНИЯ АВТО
        </Button>
      </div>

      {/* Content Upload */}
      <Card>
        <CardHeader>
          <CardTitle>ЗАГРУЗИТЕ КОНТЕНТ</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="post" className="space-y-8" value={contentType} onValueChange={setContentType}>
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
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
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
                  </div>
                </div>
              </TabsContent>

              <div className="space-y-4">
                <Label>ОПИСАНИЕ ДЛЯ ВАШЕЙ ПУБЛИКАЦИИ</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите описание вашей публикации..."
                  className="min-h-[200px] resize-none"
                />
              </div>

              <div className="space-y-4">
                <Label>ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР КОНТЕНТА</Label>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Post Preview */}
                  <div className="w-[320px] bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="p-4 flex items-center justify-between border-b">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="font-medium">pabliki.kz</span>
                      </div>
                    </div>
                    <AspectRatio ratio={1} className="bg-muted">
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
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Select Publics */}
      <Card>
        <CardHeader>
          <CardTitle>ВЫБРАТЬ ПАБЛИКИ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Поиск пабликов..."
              className="max-w-sm"
            />
            
            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Паблик</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Подписчики</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Стоимость (Пост)</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Стоимость (Сторис)</th>
                    <th className="h-12 px-4 text-right align-middle font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPublics.map((public_) => (
                    <tr 
                      key={public_.id} 
                      className={cn(
                        "border-b",
                        public_.selected && "bg-muted/50"
                      )}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={public_.logo} alt={public_.name} />
                            <AvatarFallback>{public_.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{public_.name}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        {new Intl.NumberFormat("ru-RU").format(public_.subscribers)}
                      </td>
                      <td className="p-4">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          maximumFractionDigits: 0
                        }).format(public_.postCost)}
                      </td>
                      <td className="p-4">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          maximumFractionDigits: 0
                        }).format(public_.storyCost)}
                      </td>
                      <td className="p-4 text-right">
                        <Checkbox
                          checked={public_.selected}
                          onClick={() => togglePublicSelection(public_.id)}
                          aria-label="Select public"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t bg-muted/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {selectedPublics.filter(p => p.selected).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Выбрано пабликов</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {new Intl.NumberFormat("ru-RU").format(
                        selectedPublics
                          .filter(p => p.selected)
                          .reduce((acc, curr) => acc + curr.subscribers, 0)
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Общий охват</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(
                        selectedPublics
                          .filter(p => p.selected)
                          .reduce((acc, curr) => acc + curr.postCost, 0)
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Стоимость постов</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(
                        selectedPublics
                          .filter(p => p.selected)
                          .reduce((acc, curr) => acc + curr.storyCost, 0)
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">Стоимость сторис</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Статус</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Черновик</SelectItem>
              <SelectItem value="moderation">На модерации</SelectItem>
              <SelectItem value="scheduled">Запланировано</SelectItem>
              <SelectItem value="published">Опубликовано</SelectItem>
              <SelectItem value="error">Ошибка</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>ВЫБРАТЬ ДАТУ РАЗМЕЩЕНИЯ</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border shadow-sm [&_.rdp-day]:text-foreground [&_.rdp-day_button:hover]:bg-muted"
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              const compareDate = new Date(date)
              compareDate.setHours(0, 0, 0, 0)
              return compareDate < today
            }}
            locale={ru}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
              РАЗМЕСТИТЬ КОНТЕНТ
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              После отправки на модерацию Ваша заявка будет рассмотрена в течении 2х часов. 
              Ответ будет предоставлен к вам на почту, а также будет направленно пуш уведомление.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}