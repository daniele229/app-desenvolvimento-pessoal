"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus, Trash2, CheckCircle2, Circle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  date: string
}

interface Habit {
  id: string
  name: string
  completed: boolean
}

const taskCategories = [
  { value: "corpo", label: "Corpo e Saúde", color: "red" },
  { value: "mente", label: "Mente e Espírito", color: "purple" },
  { value: "beleza", label: "Beleza", color: "pink" },
  { value: "estudos", label: "Estudos", color: "blue" },
  { value: "dinheiro", label: "Finanças", color: "green" },
  { value: "geral", label: "Geral", color: "gray" }
]

const defaultHabits = [
  "Beber 2L de água",
  "Meditar 10 minutos",
  "Exercício físico",
  "Ler 30 minutos",
  "Skincare completo",
  "Registrar gastos"
]

export default function AgendaTarefas() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [habits, setHabits] = useState<Habit[]>(
    defaultHabits.map((name, index) => ({
      id: index.toString(),
      name,
      completed: false
    }))
  )
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "geral"
  })
  const [newHabit, setNewHabit] = useState("")

  const addTask = () => {
    if (newTask.title) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        category: newTask.category,
        completed: false,
        date: new Date().toLocaleDateString()
      }])
      setNewTask({ title: "", description: "", category: "geral" })
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id))

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now().toString(),
        name: newHabit,
        completed: false
      }])
      setNewHabit("")
    }
  }

  const deleteHabit = (id: string) => setHabits(habits.filter(h => h.id !== id))

  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const completedHabits = habits.filter(h => h.completed).length
  const totalHabits = habits.length

  const getCategoryColor = (category: string) => {
    const cat = taskCategories.find(c => c.value === category)
    return cat?.color || "gray"
  }

  const getCategoryLabel = (category: string) => {
    const cat = taskCategories.find(c => c.value === category)
    return cat?.label || "Geral"
  }

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200 dark:border-amber-900/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tarefas Concluídas</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {completedTasks} / {totalTasks}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-900/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hábitos do Dia</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {completedHabits} / {totalHabits}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habits Checklist */}
      <Card className="border-yellow-200 dark:border-yellow-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <CheckCircle2 className="w-5 h-5" />
            Checklist de Hábitos Diários
          </CardTitle>
          <CardDescription>Marque os hábitos que você completou hoje</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  habit.completed 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' 
                    : 'bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => toggleHabit(habit.id)}
                  />
                  <span className={`${habit.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {habit.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteHabit(habit.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Adicionar novo hábito..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            <Button onClick={addHabit} size="icon" className="bg-gradient-to-r from-yellow-500 to-amber-500">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="border-amber-200 dark:border-amber-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Calendar className="w-5 h-5" />
            Agenda Diária
          </CardTitle>
          <CardDescription>Organize suas tarefas por área de desenvolvimento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                <Plus className="w-4 h-4 mr-2" />
                Nova Tarefa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Tarefa</DialogTitle>
                <DialogDescription>Adicione uma tarefa à sua agenda</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="task-title">Título da Tarefa</Label>
                  <Input
                    id="task-title"
                    placeholder="Ex: Treino de pernas"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="task-description">Descrição (opcional)</Label>
                  <Textarea
                    id="task-description"
                    placeholder="Detalhes da tarefa..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select 
                    value={newTask.category} 
                    onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {taskCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addTask} className="w-full">Adicionar Tarefa</Button>
              </div>
            </DialogContent>
          </Dialog>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma tarefa para hoje</p>
              ) : (
                tasks.map((task) => {
                  const color = getCategoryColor(task.category)
                  return (
                    <Card 
                      key={task.id} 
                      className={`${
                        task.completed 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 opacity-75' 
                          : `bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-950/20 dark:to-${color}-900/20`
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-1 flex-shrink-0"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className={`w-5 h-5 text-${color}-600`} />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : `text-${color}-700 dark:text-${color}-400`}`}>
                                  {task.title}
                                </h3>
                                {task.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {task.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-xs px-2 py-1 rounded-full bg-${color}-200 dark:bg-${color}-900/50 text-${color}-700 dark:text-${color}-300`}>
                                    {getCategoryLabel(task.category)}
                                  </span>
                                  <span className="text-xs text-gray-500">{task.date}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTask(task.id)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
