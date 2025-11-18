"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sparkles, Calendar as CalendarIcon, Plus, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface QuizAnswers {
  hairType: string
  skinType: string
  goals: string[]
}

interface Product {
  id: string
  name: string
  category: string
  frequency: string
}

interface Routine {
  day: string
  tasks: string[]
}

const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

export default function BelezaAutocuidado() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    hairType: "",
    skinType: "",
    goals: []
  })
  const [products, setProducts] = useState<Product[]>([])
  const [weeklyRoutine, setWeeklyRoutine] = useState<Routine[]>([])
  const [newProduct, setNewProduct] = useState({ name: "", category: "", frequency: "" })

  const handleQuizSubmit = () => {
    if (quizAnswers.hairType && quizAnswers.skinType && quizAnswers.goals.length > 0) {
      setQuizCompleted(true)
      generateRoutine()
    }
  }

  const generateRoutine = () => {
    const routine: Routine[] = weekDays.map((day, index) => {
      const tasks: string[] = []
      
      // Skincare diário
      tasks.push("Limpeza facial (manhã)")
      tasks.push("Hidratante facial")
      tasks.push("Protetor solar")
      
      // Rotina noturna
      if (index % 2 === 0) {
        tasks.push("Limpeza profunda (noite)")
        tasks.push("Sérum facial")
      }
      
      // Haircare
      if (index === 1 || index === 4) {
        tasks.push("Lavagem dos cabelos")
      }
      if (index === 3) {
        tasks.push("Hidratação capilar")
      }
      
      // Cuidados corporais
      if (index === 0 || index === 3 || index === 6) {
        tasks.push("Esfoliação corporal")
      }
      
      return { day, tasks }
    })
    
    setWeeklyRoutine(routine)
  }

  const addProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.frequency) {
      setProducts([...products, {
        id: Date.now().toString(),
        ...newProduct
      }])
      setNewProduct({ name: "", category: "", frequency: "" })
    }
  }

  const toggleGoal = (goal: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  if (!quizCompleted) {
    return (
      <div className="space-y-6">
        <Card className="border-pink-200 dark:border-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
              <Sparkles className="w-5 h-5" />
              Quiz de Autocuidado
            </CardTitle>
            <CardDescription>Responda algumas perguntas para receber recomendações personalizadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tipo de Cabelo */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Qual é o seu tipo de cabelo?</Label>
              <RadioGroup value={quizAnswers.hairType} onValueChange={(value) => setQuizAnswers({ ...quizAnswers, hairType: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="liso" id="liso" />
                  <Label htmlFor="liso" className="font-normal cursor-pointer">Liso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ondulado" id="ondulado" />
                  <Label htmlFor="ondulado" className="font-normal cursor-pointer">Ondulado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cacheado" id="cacheado" />
                  <Label htmlFor="cacheado" className="font-normal cursor-pointer">Cacheado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crespo" id="crespo" />
                  <Label htmlFor="crespo" className="font-normal cursor-pointer">Crespo/Crespo</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Tipo de Pele */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Qual é o seu tipo de pele?</Label>
              <RadioGroup value={quizAnswers.skinType} onValueChange={(value) => setQuizAnswers({ ...quizAnswers, skinType: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oleosa" id="oleosa" />
                  <Label htmlFor="oleosa" className="font-normal cursor-pointer">Oleosa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seca" id="seca" />
                  <Label htmlFor="seca" className="font-normal cursor-pointer">Seca</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mista" id="mista" />
                  <Label htmlFor="mista" className="font-normal cursor-pointer">Mista</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="font-normal cursor-pointer">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sensivel" id="sensivel" />
                  <Label htmlFor="sensivel" className="font-normal cursor-pointer">Sensível</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Objetivos */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Quais são seus objetivos de autocuidado?</Label>
              <div className="space-y-2">
                {["Hidratar a pele", "Reduzir acne", "Anti-idade", "Crescimento capilar", "Controlar oleosidade", "Clarear manchas"].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={quizAnswers.goals.includes(goal)}
                      onCheckedChange={() => toggleGoal(goal)}
                    />
                    <Label htmlFor={goal} className="font-normal cursor-pointer">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleQuizSubmit} 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              disabled={!quizAnswers.hairType || !quizAnswers.skinType || quizAnswers.goals.length === 0}
            >
              Gerar Rotina Personalizada
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recomendações Personalizadas */}
      <Card className="bg-gradient-to-r from-pink-500 to-rose-500 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
            <div className="text-white">
              <h3 className="font-semibold mb-2">Perfil Configurado!</h3>
              <p className="text-sm opacity-90">
                Cabelo: {quizAnswers.hairType} • Pele: {quizAnswers.skinType}
              </p>
              <p className="text-xs opacity-80 mt-1">
                Objetivos: {quizAnswers.goals.join(", ")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rotina" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-gray-800 rounded-xl">
          <TabsTrigger value="rotina">Rotina Semanal</TabsTrigger>
          <TabsTrigger value="produtos">Meus Produtos</TabsTrigger>
        </TabsList>

        {/* Rotina Semanal Tab */}
        <TabsContent value="rotina" className="space-y-4">
          <Card className="border-pink-200 dark:border-pink-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <CalendarIcon className="w-5 h-5" />
                Cronograma Semanal de Beleza
              </CardTitle>
              <CardDescription>Rotina personalizada baseada no seu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {weeklyRoutine.map((routine, index) => (
                    <Card key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-pink-700 dark:text-pink-400 mb-3">{routine.day}</h3>
                        <ul className="space-y-2">
                          {routine.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0"></div>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Produtos Tab */}
        <TabsContent value="produtos" className="space-y-4">
          <Card className="border-rose-200 dark:border-rose-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                <Sparkles className="w-5 h-5" />
                Meus Produtos de Beleza
              </CardTitle>
              <CardDescription>Registre e acompanhe seus produtos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>Adicione um produto à sua rotina</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="product-name">Nome do Produto</Label>
                      <Input
                        id="product-name"
                        placeholder="Ex: Hidratante Facial"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <Input
                        id="category"
                        placeholder="Ex: Skincare, Haircare, Corporal"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequência de Uso</Label>
                      <Input
                        id="frequency"
                        placeholder="Ex: Diário, 2x por semana"
                        value={newProduct.frequency}
                        onChange={(e) => setNewProduct({ ...newProduct, frequency: e.target.value })}
                      />
                    </div>
                    <Button onClick={addProduct} className="w-full">Salvar Produto</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {products.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Nenhum produto cadastrado ainda</p>
                  ) : (
                    products.map((product) => (
                      <Card key={product.id} className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-rose-700 dark:text-rose-400">{product.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {product.category}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Uso: {product.frequency}
                              </p>
                            </div>
                          </div>
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

      <Button 
        variant="outline" 
        onClick={() => setQuizCompleted(false)}
        className="w-full"
      >
        Refazer Quiz
      </Button>
    </div>
  )
}
