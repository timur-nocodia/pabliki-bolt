"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function LaunchSection() {
  return (
    <section id="placement" className="py-24 bg-muted">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          КАК ЗА 60 СЕКУНД ЗАПУСТИТЬ РЕКЛАМУ В ПАБЛИКАХ
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden border shadow-md">
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="w-full h-full absolute top-0 left-0"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Как запустить рекламу в пабликах"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </AspectRatio>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-muted-foreground">
              Краткая инструкция, по работе с сервисом и запуском рекламной компании в популярных пабликах
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <p className="flex-1">Выберите город или регион для размещения рекламы</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <p className="flex-1">Укажите тематику и целевую аудиторию</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <p className="flex-1">Выберите подходящие паблики из нашей базы</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                <p className="flex-1">Загрузите контент и запустите рекламную кампанию</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}