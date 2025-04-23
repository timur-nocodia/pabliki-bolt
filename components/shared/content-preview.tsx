"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"

interface ContentPreviewProps {
  title?: string
  image: string
  description: string
  metadata?: {
    label: string
    value: string
  }[]
}

export function ContentPreview({
  title = "Контент",
  image,
  description,
  metadata
}: ContentPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Content Preview */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-row justify-center gap-8">
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
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-full object-contain bg-gray-50" 
                  />
                </AspectRatio>
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
              
              {/* Story Preview */}
              <div className="w-[320px] bg-black rounded-xl overflow-hidden shadow-lg relative" style={{ height: "568px" }}>
                <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur" />
                    <span className="font-medium text-white">pabliki.kz</span>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-white" />
                </div>
                <img 
                  src={image} 
                  alt="Preview" 
                  className="absolute inset-0 w-full h-full object-contain bg-gray-900" 
                />
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

            <ScrollArea className="h-[200px] rounded-lg border p-4">
              <div className="whitespace-pre-wrap text-sm">
                {description}
              </div>
            </ScrollArea>

            {metadata && (
              <div className="grid grid-cols-2 gap-4">
                {metadata.map((item, index) => (
                  <div key={index}>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}