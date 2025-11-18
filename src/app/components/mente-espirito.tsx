"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Brain, Heart, Sparkles, Smile, Frown, Meh, Plus, Calendar, Play, Pause, Volume2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface Meditation {
  id: string
  title: string
  theme: string
  duration: string
  description: string
  audioUrl: string
}

interface Manifestation {
  id: string
  date: string
  text: string
}

interface DreamBoardItem {
  id: string
  title: string
  description: string
}

interface MoodEntry {
  id: string
  date: string
  mood: "happy" | "neutral" | "sad"
  note: string
}

const meditations: Meditation[] = [
  { 
    id: "1", 
    title: "Calma Interior", 
    theme: "Ansiedade", 
    duration: "10 min", 
    description: "Meditação para acalmar a mente ansiosa",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  { 
    id: "2", 
    title: "Foco Total", 
    theme: "Concentração", 
    duration: "15 min", 
    description: "Desenvolva foco e clareza mental",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  { 
    id: "3", 
    title: "Amor Próprio", 
    theme: "Autoestima", 
    duration: "12 min", 
    description: "Cultive amor e aceitação por si mesmo",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  { 
    id: "4", 
    title: "Gratidão Diária", 
    theme: "Gratidão", 
    duration: "8 min", 
    description: "Pratique gratidão e abundância",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  { 
    id: "5", 
    title: "Sono Profundo", 
    theme: "Relaxamento", 
    duration: "20 min", 
    description: "Prepare-se para uma noite tranquila",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
]

const affirmations = [
  "Eu sou capaz de alcançar meus sonhos",
  "Mereço tudo de bom que a vida tem a oferecer",
  "Sou grato(a) por tudo que tenho",
  "Atraio prosperidade e abundância",
  "Confio no processo da vida",
  "Sou forte, confiante e determinado(a)"
]

export default function MenteEspirito() {
  const [manifestations, setManifestations] = useState<Manifestation[]>([])
  const [dreamBoard, setDreamBoard] = useState<DreamBoardItem[]>([])
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [newManifestation, setNewManifestation] = useState("")
  const [newDream, setNewDream] = useState({ title: "", description: "" })
  const [newMood, setNewMood] = useState<{ mood: "happy" | "neutral" | "sad" | null, note: string }>({ mood: null, note: "" })
  const [dailyAffirmation] = useState(affirmations[Math.floor(Math.random() * affirmations.length)])
  
  // Estados para o player de áudio
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const savedManifestations = localStorage.getItem('mente-manifestations')
    const savedDreamBoard = localStorage.getItem('mente-dreamboard')
    const savedMoodEntries = localStorage.getItem('mente-mood')

    if (savedManifestations) setManifestations(JSON.parse(savedManifestations))
    if (savedDreamBoard) setDreamBoard(JSON.parse(savedDreamBoard))
    if (savedMoodEntries) setMoodEntries(JSON.parse(savedMoodEntries))
  }, [])

  // Salvar manifestations no localStorage
  useEffect(() => {
    if (manifestations.length > 0) {
      localStorage.setItem('mente-manifestations', JSON.stringify(manifestations))
    }
  }, [manifestations])

  // Salvar dreamBoard no localStorage
  useEffect(() => {
    if (dreamBoard.length > 0) {
      localStorage.setItem('mente-dreamboard', JSON.stringify(dreamBoard))
    }
  }, [dreamBoard])

  // Salvar moodEntries no localStorage
  useEffect(() => {
    if (moodEntries.length > 0) {
      localStorage.setItem('mente-mood', JSON.stringify(moodEntries))
    }
  }, [moodEntries])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
      audioRef.current.addEventListener('ended', handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioRef.current.removeEventListener('ended', handleEnded)
      }
    }
  }, [currentMeditation])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const startMeditation = (meditation: Meditation) => {
    if (currentMeditation?.id === meditation.id && isPlaying) {
      // Pausar se já estiver tocando
      audioRef.current?.pause()
      setIsPlaying(false)
    } else if (currentMeditation?.id === meditation.id && !isPlaying) {
      // Continuar se estiver pausado
      audioRef.current?.play()
      setIsPlaying(true)
    } else {
      // Iniciar nova meditação
      setCurrentMeditation(meditation)
      setIsPlaying(true)
      setCurrentTime(0)
      
      if (audioRef.current) {
        audioRef.current.src = meditation.audioUrl
        audioRef.current.play()
      }
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const addManifestation = () => {
    if (newManifestation.trim()) {
      setManifestations([...manifestations, {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        text: newManifestation
      }])
      setNewManifestation("")
    }
  }

  const addDream = () => {
    if (newDream.title && newDream.description) {
      setDreamBoard([...dreamBoard, {
        id: Date.now().toString(),
        title: newDream.title,
        description: newDream.description
      }])
      setNewDream({ title: "", description: "" })
    }
  }

  const addMoodEntry = () => {
    if (newMood.mood) {
      setMoodEntries([...moodEntries, {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        mood: newMood.mood,
        note: newMood.note
      }])
      setNewMood({ mood: null, note: "" })
    }
  }

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy": return <Smile className="w-6 h-6 text-green-500" />
      case "neutral": return <Meh className="w-6 h-6 text-yellow-500" />
      case "sad": return <Frown className="w-6 h-6 text-red-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Áudio oculto */}
      <audio ref={audioRef} />

      {/* Player de Meditação Fixo (quando há meditação ativa) */}
      {currentMeditation && (
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 border-0 shadow-lg sticky top-20 z-40">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                onClick={togglePlayPause}
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full h-12 w-12 flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">{currentMeditation.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/80 text-xs">{formatTime(currentTime)}</span>
                  <Progress 
                    value={(currentTime / duration) * 100} 
                    className="flex-1 h-1 bg-white/30"
                  />
                  <span className="text-white/80 text-xs">{formatTime(duration)}</span>
                </div>
              </div>

              <Volume2 className="w-5 h-5 text-white flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Afirmação Diária */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <Sparkles className="w-8 h-8 text-white mx-auto mb-3" />
          <p className="text-white font-medium text-lg italic">"{dailyAffirmation}"</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="meditacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white dark:bg-gray-800 rounded-xl">
          <TabsTrigger value="meditacoes">Meditações</TabsTrigger>
          <TabsTrigger value="manifestacoes">Manifestações</TabsTrigger>
          <TabsTrigger value="sonhos">Quadro dos Sonhos</TabsTrigger>
          <TabsTrigger value="humor">Humor</TabsTrigger>
        </TabsList>

        {/* Meditações Tab */}
        <TabsContent value="meditacoes" className="space-y-4">
          <Card className="border-purple-200 dark:border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Brain className="w-5 h-5" />
                Biblioteca de Meditações Guiadas
              </CardTitle>
              <CardDescription>Escolha uma meditação guiada em áudio por tema</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {meditations.map((meditation) => (
                    <Card 
                      key={meditation.id} 
                      className={`transition-all ${
                        currentMeditation?.id === meditation.id 
                          ? 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 shadow-lg ring-2 ring-purple-500' 
                          : 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 hover:shadow-md'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                              {meditation.title}
                              {currentMeditation?.id === meditation.id && isPlaying && (
                                <span className="flex items-center gap-1 text-xs">
                                  <span className="w-1 h-3 bg-purple-500 animate-pulse rounded"></span>
                                  <span className="w-1 h-4 bg-purple-500 animate-pulse rounded" style={{ animationDelay: '0.2s' }}></span>
                                  <span className="w-1 h-3 bg-purple-500 animate-pulse rounded" style={{ animationDelay: '0.4s' }}></span>
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{meditation.description}</p>
                          </div>
                          <span className="text-xs font-medium bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                            {meditation.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded">
                            {meditation.theme}
                          </span>
                          <Button 
                            size="sm" 
                            onClick={() => startMeditation(meditation)}
                            className={`${
                              currentMeditation?.id === meditation.id && isPlaying
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                            }`}
                          >
                            {currentMeditation?.id === meditation.id && isPlaying ? (
                              <>
                                <Pause className="w-4 h-4 mr-1" />
                                Pausar
                              </>
                            ) : currentMeditation?.id === meditation.id ? (
                              <>
                                <Play className="w-4 h-4 mr-1" />
                                Continuar
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-1" />
                                Iniciar
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manifestações Tab */}
        <TabsContent value="manifestacoes" className="space-y-4">
          <Card className="border-pink-200 dark:border-pink-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <Heart className="w-5 h-5" />
                Diário de Manifestações
              </CardTitle>
              <CardDescription>Escreva seus desejos e manifeste seus sonhos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="manifestation">O que você deseja manifestar?</Label>
                <Textarea
                  id="manifestation"
                  placeholder="Eu manifesto saúde, prosperidade e felicidade em minha vida..."
                  value={newManifestation}
                  onChange={(e) => setNewManifestation(e.target.value)}
                  rows={4}
                />
                <Button onClick={addManifestation} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Manifestação
                </Button>
              </div>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {manifestations.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Comece a manifestar seus sonhos</p>
                  ) : (
                    manifestations.map((manifestation) => (
                      <Card key={manifestation.id} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{manifestation.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic">{manifestation.text}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quadro dos Sonhos Tab */}
        <TabsContent value="sonhos" className="space-y-4">
          <Card className="border-indigo-200 dark:border-indigo-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
                Quadro dos Sonhos
              </CardTitle>
              <CardDescription>Visualize e organize seus objetivos de vida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Sonho
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Sonho</DialogTitle>
                    <DialogDescription>Adicione um objetivo ao seu quadro dos sonhos</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dream-title">Título</Label>
                      <Input
                        id="dream-title"
                        placeholder="Ex: Viajar para Paris"
                        value={newDream.title}
                        onChange={(e) => setNewDream({ ...newDream, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dream-description">Descrição</Label>
                      <Textarea
                        id="dream-description"
                        placeholder="Descreva seu sonho em detalhes..."
                        value={newDream.description}
                        onChange={(e) => setNewDream({ ...newDream, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button onClick={addDream} className="w-full">Salvar Sonho</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dreamBoard.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 col-span-2">Adicione seus sonhos e objetivos</p>
                ) : (
                  dreamBoard.map((dream) => (
                    <Card key={dream.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">{dream.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{dream.description}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Humor Tab */}
        <TabsContent value="humor" className="space-y-4">
          <Card className="border-purple-200 dark:border-purple-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <Smile className="w-5 h-5" />
                Registro de Humor
              </CardTitle>
              <CardDescription>Acompanhe suas emoções diárias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Humor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Como você está se sentindo?</DialogTitle>
                    <DialogDescription>Registre seu humor e emoções do momento</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Escolha seu humor</Label>
                      <div className="flex gap-4 justify-center mt-3">
                        <button
                          onClick={() => setNewMood({ ...newMood, mood: "happy" })}
                          className={`p-4 rounded-full transition-all ${newMood.mood === "happy" ? "bg-green-100 dark:bg-green-900/30 scale-110" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        >
                          <Smile className="w-8 h-8 text-green-500" />
                        </button>
                        <button
                          onClick={() => setNewMood({ ...newMood, mood: "neutral" })}
                          className={`p-4 rounded-full transition-all ${newMood.mood === "neutral" ? "bg-yellow-100 dark:bg-yellow-900/30 scale-110" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        >
                          <Meh className="w-8 h-8 text-yellow-500" />
                        </button>
                        <button
                          onClick={() => setNewMood({ ...newMood, mood: "sad" })}
                          className={`p-4 rounded-full transition-all ${newMood.mood === "sad" ? "bg-red-100 dark:bg-red-900/30 scale-110" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                        >
                          <Frown className="w-8 h-8 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="mood-note">Notas (opcional)</Label>
                      <Textarea
                        id="mood-note"
                        placeholder="Como foi seu dia? O que você sentiu?"
                        value={newMood.note}
                        onChange={(e) => setNewMood({ ...newMood, note: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button onClick={addMoodEntry} disabled={!newMood.mood} className="w-full">
                      Salvar Registro
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {moodEntries.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Comece a registrar seu humor diário</p>
                  ) : (
                    moodEntries.map((entry) => (
                      <Card key={entry.id} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getMoodIcon(entry.mood)}
                              <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {entry.date}
                              </span>
                            </div>
                          </div>
                          {entry.note && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{entry.note}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
