"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Link, Upload, Image as ImageIcon, FileVideo, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, CheckCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { RegistrationModal } from "@/components/shared/registration-modal"

export function ContentUploadSection() {
  const [date, setDate] = useState<Date>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  
  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
    setIsUploaded(false)
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setIsLoading(true)
      
      // Simulate upload process
      setTimeout(() => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
          setIsLoading(false)
          // Simulate upload completion after preview is shown
          setTimeout(() => {
            setIsUploaded(true)
          }, 500)
        }
        reader.readAsDataURL(file)
      }, 1500) // Simulate network delay
    }
  }
  
  const handleSubmitToModeration = () => {
    setShowRegistrationModal(true)
  }

  // Format file size helper
  const formatFileSize = (file: File | null) => {
    if (!file) return "0 KB";
    return `${(file.size / 1024 / 1024).toFixed(2)} МБ`;
  }

  // Get file type helper
  const getFileType = (file: File | null) => {
    if (!file) return "";
    return file.type.includes('video') ? 'Видео' : 'Изображение';
  }

  return (
    <section className="py-24">
      <div className="container max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-16">
          ЗАГРУЗИТЕ КОНТЕНТ
        </h2>
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
                  <Input id="link" placeholder="https://" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    Вшитая по умолчанию наша UTM - метка
                  </span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="post">
              <div className="grid gap-4">
                <Label htmlFor="post-upload">Загрузить ПОСТ / Reels</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center relative">
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
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="font-medium">Загрузка файла...</p>
                      </div>
                    ) : isUploaded ? (
                      <div className="flex flex-col items-center gap-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <div className="space-y-2">
                          <p className="font-medium">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getFileType(selectedFile)} - {formatFileSize(selectedFile)}
                          </p>
                        </div>
                      </div>
                    ) : selectedFile ? (
                      <div className="flex flex-col items-center gap-4">
                        {selectedFile.type.includes('video') ? (
                          <FileVideo className="h-12 w-12 text-primary" />
                        ) : (
                          <ImageIcon className="h-12 w-12 text-primary" />
                        )}
                        <div className="space-y-2">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getFileType(selectedFile)} - {formatFileSize(selectedFile)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <div className="space-y-2">
                          <p className="font-medium">Перетащите файлы сюда или нажмите для загрузки</p>
                          <p className="text-sm text-muted-foreground">Поддерживаются изображения и видео</p>
                        </div>
                      </>
                    )}
                  </label>
                  {selectedFile && !isLoading && (
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
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                        <p className="font-medium">Загрузка файла...</p>
                      </div>
                    ) : isUploaded ? (
                      <div className="flex flex-col items-center gap-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <div className="space-y-2">
                          <p className="font-medium">{selectedFile?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getFileType(selectedFile)} - {formatFileSize(selectedFile)}
                          </p>
                        </div>
                      </div>
                    ) : selectedFile ? (
                      <div className="flex flex-col items-center gap-4">
                        {selectedFile.type.includes('video') ? (
                          <FileVideo className="h-12 w-12 text-primary" />
                        ) : (
                          <ImageIcon className="h-12 w-12 text-primary" />
                        )}
                        <div className="space-y-2">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {getFileType(selectedFile)} - {formatFileSize(selectedFile)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-muted-foreground" />
                        <div className="space-y-2">
                          <p className="font-medium">Перетащите файлы сюда или нажмите для загрузки</p>
                          <p className="text-sm text-muted-foreground">Поддерживаются изображения и видео</p>
                        </div>
                      </>
                    )}
                  </label>
                  {selectedFile && !isLoading && (
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
              <div className="grid md:grid-cols-2 gap-8 justify-start">
                <div className="w-[320px] bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                      <span className="font-medium">pabliki.kz</span>
                    </div>
                    <MoreHorizontal className="h-5 w-5" />
                  </div>
                  <div className="relative" style={{ height: "320px" }}>
                    {isLoading ? (
                      <div className="h-full bg-muted flex items-center justify-center">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      </div>
                    ) : preview ? (
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-contain bg-gray-50" 
                      />
                    ) : (
                      <div className="h-full bg-muted flex items-center justify-center">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
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
                <div className="w-[320px] bg-black rounded-xl overflow-hidden shadow-lg relative" style={{ height: "568px" }}>
                  <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur" />
                      <span className="font-medium text-white">pabliki.kz</span>
                    </div>
                    <MoreHorizontal className="h-5 w-5 text-white" />
                  </div>
                  {isLoading ? (
                    <div className="h-full bg-gray-900 flex items-center justify-center">
                      <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                  ) : preview ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="absolute inset-0 w-full h-full object-contain bg-gray-900" 
                    />
                  ) : (
                    <div className="h-full bg-gray-900 flex items-center justify-center">
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
              <Label className="text-lg font-medium text-primary">Выбрать дату размещения</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border shadow-sm"
              />
            </div>

            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleSubmitToModeration}
                disabled={!selectedFile || isLoading}
              >
                отправить на модерацию
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                После отправки на модерацию Ваша заявка будет рассмотрена в течении 24х часов Ответ будет предоставлен к вам на почту, а также будет направленно пуш уведомление.
              </p>
            </div>
          </div>
        </Tabs>
      </div>
      
      {/* Registration Modal */}
      <RegistrationModal 
        trigger={<span className="hidden" />} 
        open={showRegistrationModal}
        onOpenChange={setShowRegistrationModal}
      />
    </section>
  )
}