"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Dumbbell, Apple, TrendingUp, Plus, Trash2, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Workout {
  id: string
  name: string
  exercises: string[]
  date: string
}

interface Meal {
  id: string
  name: string
  time: string
  calories: number
}

interface ProgressEntry {
  id: string
  date: string
  weight: number
  chest?: number
  waist?: number
  hips?: number
}

export default function CorpoSaude() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [progress, setProgress] = useState<ProgressEntry[]>([])
  const [newWorkout, setNewWorkout] = useState({ name: "", exercises: "" })
  const [newMeal, setNewMeal] = useState({ name: "", time: "", calories: "" })
  const [newProgress, setNewProgress] = useState({ weight: "", chest: "", waist: "", hips: "" })

  const addWorkout = () => {
    if (newWorkout.name && newWorkout.exercises) {
      setWorkouts([...workouts, {
        id: Date.now().toString(),
        name: newWorkout.name,
        exercises: newWorkout.exercises.split(",").map(e => e.trim()),
        date: new Date().toLocaleDateString()
      }])
      setNewWorkout({ name: "", exercises: "" })
    }
  }

  const addMeal = () => {
    if (newMeal.name && newMeal.time && newMeal.calories) {
      setMeals([...meals, {
        id: Date.now().toString(),
        name: newMeal.name,
        time: newMeal.time,
        calories: parseInt(newMeal.calories)
      }])
      setNewMeal({ name: "", time: "", calories: "" })
    }
  }

  const addProgress = () => {
    if (newProgress.weight) {
      setProgress([...progress, {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        weight: parseFloat(newProgress.weight),
        chest: newProgress.chest ? parseFloat(newProgress.chest) : undefined,
        waist: newProgress.waist ? parseFloat(newProgress.waist) : undefined,
        hips: newProgress.hips ? parseFloat(newProgress.hips) : undefined
      }])
      setNewProgress({ weight: "", chest: "", waist: "", hips: "" })
    }
  }

  const deleteWorkout = (id: string) => setWorkouts(workouts.filter(w => w.id !== id))
  const deleteMeal = (id: string) => setMeals(meals.filter(m => m.id !== id))

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieGoal = 2000
  const calorieProgress = (totalCalories / calorieGoal) * 100

  return (
    <div className="space-y-6">
      <Tabs defaultValue="treinos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 rounded-xl">
          <TabsTrigger value="treinos">Treinos</TabsTrigger>
          <TabsTrigger value="dieta">Dieta</TabsTrigger>
          <TabsTrigger value="progresso">Progresso</TabsTrigger>
        </TabsList>

        {/* Treinos Tab */}
        <TabsContent value="treinos" className="space-y-4">
          <Card className="border-red-200 dark:border-red-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Dumbbell className="w-5 h-5" />
                Rotina de Treinos
              </CardTitle>
              <CardDescription>Monte e acompanhe seus treinos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Treino
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Treino</DialogTitle>
                    <DialogDescription>Adicione um novo treino à sua rotina</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="workout-name">Nome do Treino</Label>
                      <Input
                        id="workout-name"
                        placeholder="Ex: Treino A - Peito e Tríceps"
                        value={newWorkout.name}
                        onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="exercises">Exercícios (separados por vírgula)</Label>
                      <Input
                        id="exercises"
                        placeholder="Ex: Supino, Crucifixo, Tríceps Pulley"
                        value={newWorkout.exercises}
                        onChange={(e) => setNewWorkout({ ...newWorkout, exercises: e.target.value })}
                      />
                    </div>
                    <Button onClick={addWorkout} className="w-full">Salvar Treino</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                {workouts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhum treino cadastrado ainda</p>
                ) : (
                  workouts.map((workout) => (
                    <Card key={workout.id} className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-red-700 dark:text-red-400">{workout.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {workout.date}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteWorkout(workout.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <ul className="space-y-1">
                          {workout.exercises.map((exercise, idx) => (
                            <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dieta Tab */}
        <TabsContent value="dieta" className="space-y-4">
          <Card className="border-orange-200 dark:border-orange-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <Apple className="w-5 h-5" />
                Planejamento Alimentar
              </CardTitle>
              <CardDescription>Organize sua dieta diária</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-950/30 dark:to-yellow-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calorias de Hoje</span>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {totalCalories} / {calorieGoal} kcal
                  </span>
                </div>
                <Progress value={calorieProgress} className="h-2" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Refeição
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Refeição</DialogTitle>
                    <DialogDescription>Registre uma refeição do seu dia</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meal-name">Nome da Refeição</Label>
                      <Input
                        id="meal-name"
                        placeholder="Ex: Café da Manhã"
                        value={newMeal.name}
                        onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meal-time">Horário</Label>
                      <Input
                        id="meal-time"
                        type="time"
                        value={newMeal.time}
                        onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="calories">Calorias</Label>
                      <Input
                        id="calories"
                        type="number"
                        placeholder="Ex: 450"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                      />
                    </div>
                    <Button onClick={addMeal} className="w-full">Salvar Refeição</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                {meals.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhuma refeição registrada hoje</p>
                ) : (
                  meals.map((meal) => (
                    <Card key={meal.id} className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-orange-700 dark:text-orange-400">{meal.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{meal.time}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                              {meal.calories} kcal
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMeal(meal.id)}
                              className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progresso Tab */}
        <TabsContent value="progresso" className="space-y-4">
          <Card className="border-green-200 dark:border-green-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="w-5 h-5" />
                Acompanhamento de Progresso
              </CardTitle>
              <CardDescription>Registre peso, medidas e evolução física</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Medidas
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Registro</DialogTitle>
                    <DialogDescription>Registre suas medidas atuais</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="weight">Peso (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="Ex: 70.5"
                        value={newProgress.weight}
                        onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="chest">Peito (cm)</Label>
                        <Input
                          id="chest"
                          type="number"
                          placeholder="95"
                          value={newProgress.chest}
                          onChange={(e) => setNewProgress({ ...newProgress, chest: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="waist">Cintura (cm)</Label>
                        <Input
                          id="waist"
                          type="number"
                          placeholder="80"
                          value={newProgress.waist}
                          onChange={(e) => setNewProgress({ ...newProgress, waist: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hips">Quadril (cm)</Label>
                        <Input
                          id="hips"
                          type="number"
                          placeholder="100"
                          value={newProgress.hips}
                          onChange={(e) => setNewProgress({ ...newProgress, hips: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={addProgress} className="w-full">Salvar Registro</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                {progress.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhum registro de progresso ainda</p>
                ) : (
                  progress.map((entry) => (
                    <Card key={entry.id} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {entry.date}
                          </span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            {entry.weight} kg
                          </span>
                        </div>
                        {(entry.chest || entry.waist || entry.hips) && (
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            {entry.chest && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Peito</p>
                                <p className="font-semibold text-green-700 dark:text-green-400">{entry.chest} cm</p>
                              </div>
                            )}
                            {entry.waist && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Cintura</p>
                                <p className="font-semibold text-green-700 dark:text-green-400">{entry.waist} cm</p>
                              </div>
                            )}
                            {entry.hips && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Quadril</p>
                                <p className="font-semibold text-green-700 dark:text-green-400">{entry.hips} cm</p>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
