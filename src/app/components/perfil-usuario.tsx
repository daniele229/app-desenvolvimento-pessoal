"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Target, TrendingUp, Award, Calendar, Edit } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface UserProfile {
  name: string
  age: string
  mainGoal: string
}

interface AreaProgress {
  area: string
  progress: number
  color: string
  icon: string
}

export default function PerfilUsuario() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Usuário",
    age: "",
    mainGoal: "Evoluir em todas as áreas da vida"
  })
  const [editingProfile, setEditingProfile] = useState(false)
  const [tempProfile, setTempProfile] = useState(profile)

  const saveProfile = () => {
    setProfile(tempProfile)
    setEditingProfile(false)
  }

  // Simulação de progresso por área (em um app real, isso viria dos dados reais)
  const areasProgress: AreaProgress[] = [
    { area: "Corpo e Saúde", progress: 65, color: "red", icon: "💪" },
    { area: "Mente e Espírito", progress: 80, color: "purple", icon: "🧘" },
    { area: "Beleza e Autocuidado", progress: 70, color: "pink", icon: "✨" },
    { area: "Estudos e Intelecto", progress: 55, color: "blue", icon: "📚" },
    { area: "Finanças", progress: 45, color: "green", icon: "💰" },
    { area: "Produtividade", progress: 75, color: "amber", icon: "📅" }
  ]

  const overallProgress = Math.round(
    areasProgress.reduce((sum, area) => sum + area.progress, 0) / areasProgress.length
  )

  const achievements = [
    { title: "Primeira Semana", description: "Completou 7 dias consecutivos", unlocked: true },
    { title: "Mestre dos Hábitos", description: "100 hábitos completados", unlocked: true },
    { title: "Leitor Dedicado", description: "Leu 5 livros", unlocked: false },
    { title: "Financeiramente Consciente", description: "30 dias de controle financeiro", unlocked: true },
    { title: "Zen Master", description: "50 meditações completadas", unlocked: false },
    { title: "Corpo em Forma", description: "30 treinos completados", unlocked: false }
  ]

  const stats = [
    { label: "Dias Consecutivos", value: "12", icon: Calendar },
    { label: "Hábitos Completados", value: "156", icon: Target },
    { label: "Conquistas", value: `${achievements.filter(a => a.unlocked).length}/${achievements.length}`, icon: Award }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                {profile.age && <p className="text-sm opacity-90">{profile.age} anos</p>}
                <p className="text-sm opacity-80 mt-1 italic">"{profile.mainGoal}"</p>
              </div>
            </div>
            <Dialog open={editingProfile} onOpenChange={setEditingProfile}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                  <DialogDescription>Atualize suas informações pessoais</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={tempProfile.age}
                      onChange={(e) => setTempProfile({ ...tempProfile, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal">Objetivo Principal</Label>
                    <Input
                      id="goal"
                      value={tempProfile.mainGoal}
                      onChange={(e) => setTempProfile({ ...tempProfile, mainGoal: e.target.value })}
                    />
                  </div>
                  <Button onClick={saveProfile} className="w-full">Salvar Alterações</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Overall Progress */}
      <Card className="border-purple-200 dark:border-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <TrendingUp className="w-5 h-5" />
            Progresso Geral
          </CardTitle>
          <CardDescription>Sua evolução em todas as áreas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                {overallProgress}%
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Progresso Total</p>
          </div>

          <div className="space-y-4">
            {areasProgress.map((area) => (
              <div key={area.area} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span>{area.icon}</span>
                    {area.area}
                  </span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {area.progress}%
                  </span>
                </div>
                <Progress value={area.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-pink-200 dark:border-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
            <Award className="w-5 h-5" />
            Conquistas
          </CardTitle>
          <CardDescription>Desbloqueie conquistas conforme evolui</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className={`${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-900/30' 
                    : 'bg-gray-50 dark:bg-gray-800/50 opacity-60'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-500' 
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${
                        achievement.unlocked 
                          ? 'text-yellow-700 dark:text-yellow-400' 
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 inline-block">
                          ✓ Desbloqueada
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 border-0 shadow-lg">
        <CardContent className="p-6 text-center">
          <p className="text-white font-medium text-lg">
            Continue assim! Você está no caminho certo para se tornar a melhor versão de si mesmo! 🌟
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
