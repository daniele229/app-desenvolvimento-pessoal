"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BookOpen, Clock, Plus, Trash2, Play, Pause, RotateCcw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

interface Book {
  id: string
  title: string
  author: string
  status: "lendo" | "lido" | "quero-ler"
}

interface StudySession {
  id: string
  date: string
  duration: number
  subject: string
}

export default function EstudosIntelecto() {
  const [books, setBooks] = useState<Book[]>([])
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [newBook, setNewBook] = useState({ title: "", author: "", status: "quero-ler" as const })
  const [newSession, setNewSession] = useState({ subject: "" })
  
  // Timer states
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [currentSubject, setCurrentSubject] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    if (currentSubject.trim()) {
      setTimerRunning(true)
    }
  }

  const pauseTimer = () => {
    setTimerRunning(false)
  }

  const stopTimer = () => {
    if (timerSeconds > 0 && currentSubject.trim()) {
      setStudySessions([...studySessions, {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        duration: timerSeconds,
        subject: currentSubject
      }])
    }
    setTimerRunning(false)
    setTimerSeconds(0)
    setCurrentSubject("")
  }

  const addBook = () => {
    if (newBook.title && newBook.author) {
      setBooks([...books, {
        id: Date.now().toString(),
        ...newBook
      }])
      setNewBook({ title: "", author: "", status: "quero-ler" })
    }
  }

  const deleteBook = (id: string) => setBooks(books.filter(b => b.id !== id))

  const updateBookStatus = (id: string, status: Book["status"]) => {
    setBooks(books.map(book => book.id === id ? { ...book, status } : book))
  }

  const getBooksByStatus = (status: Book["status"]) => books.filter(b => b.status === status)

  const totalStudyTime = studySessions.reduce((sum, session) => sum + session.duration, 0)
  const weeklyGoal = 20 * 3600 // 20 horas em segundos
  const progressPercentage = (totalStudyTime / weeklyGoal) * 100

  return (
    <div className="space-y-6">
      <Tabs defaultValue="timer" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 rounded-xl">
          <TabsTrigger value="timer">Timer de Estudos</TabsTrigger>
          <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
        </TabsList>

        {/* Timer Tab */}
        <TabsContent value="timer" className="space-y-4">
          <Card className="border-blue-200 dark:border-blue-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Clock className="w-5 h-5" />
                Cronômetro de Estudos
              </CardTitle>
              <CardDescription>Registre suas horas de estudo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer Display */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-8 rounded-2xl text-center">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4 font-mono">
                  {formatTime(timerSeconds)}
                </div>
                <Input
                  placeholder="O que você está estudando?"
                  value={currentSubject}
                  onChange={(e) => setCurrentSubject(e.target.value)}
                  disabled={timerRunning}
                  className="mb-4 text-center"
                />
                <div className="flex gap-2 justify-center">
                  {!timerRunning ? (
                    <Button 
                      onClick={startTimer}
                      disabled={!currentSubject.trim()}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Iniciar
                    </Button>
                  ) : (
                    <Button 
                      onClick={pauseTimer}
                      variant="outline"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar
                    </Button>
                  )}
                  <Button 
                    onClick={stopTimer}
                    variant="destructive"
                    disabled={timerSeconds === 0}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Finalizar
                  </Button>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950/30 dark:to-blue-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Semanal</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.floor(totalStudyTime / 3600)}h / 20h
                  </span>
                </div>
                <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
              </div>

              {/* Study History */}
              <div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Histórico de Estudos</h3>
                <ScrollArea className="h-[250px] pr-4">
                  <div className="space-y-2">
                    {studySessions.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Nenhuma sessão registrada ainda</p>
                    ) : (
                      studySessions.map((session) => (
                        <Card key={session.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm">{session.subject}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{session.date}</p>
                              </div>
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {formatTime(session.duration)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Biblioteca Tab */}
        <TabsContent value="biblioteca" className="space-y-4">
          <Card className="border-cyan-200 dark:border-cyan-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                <BookOpen className="w-5 h-5" />
                Minha Biblioteca
              </CardTitle>
              <CardDescription>Organize seus livros e metas de leitura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Livro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Livro</DialogTitle>
                    <DialogDescription>Adicione um livro à sua biblioteca</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="book-title">Título</Label>
                      <Input
                        id="book-title"
                        placeholder="Ex: O Poder do Hábito"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="book-author">Autor</Label>
                      <Input
                        id="book-author"
                        placeholder="Ex: Charles Duhigg"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      />
                    </div>
                    <Button onClick={addBook} className="w-full">Adicionar à Biblioteca</Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Book Lists */}
              <Tabs defaultValue="quero-ler" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="quero-ler">Quero Ler</TabsTrigger>
                  <TabsTrigger value="lendo">Lendo</TabsTrigger>
                  <TabsTrigger value="lido">Lidos</TabsTrigger>
                </TabsList>

                <TabsContent value="quero-ler" className="mt-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {getBooksByStatus("quero-ler").length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Nenhum livro nesta lista</p>
                      ) : (
                        getBooksByStatus("quero-ler").map((book) => (
                          <Card key={book.id} className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-cyan-700 dark:text-cyan-400 text-sm">{book.title}</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateBookStatus(book.id, "lendo")}
                                    className="text-xs"
                                  >
                                    Ler
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteBook(book.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="lendo" className="mt-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {getBooksByStatus("lendo").length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Nenhum livro nesta lista</p>
                      ) : (
                        getBooksByStatus("lendo").map((book) => (
                          <Card key={book.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 text-sm">{book.title}</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => updateBookStatus(book.id, "lido")}
                                    className="text-xs"
                                  >
                                    Concluir
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteBook(book.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="lido" className="mt-4">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {getBooksByStatus("lido").length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Nenhum livro nesta lista</p>
                      ) : (
                        getBooksByStatus("lido").map((book) => (
                          <Card key={book.id} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-green-700 dark:text-green-400 text-sm">{book.title}</h3>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{book.author}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteBook(book.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
