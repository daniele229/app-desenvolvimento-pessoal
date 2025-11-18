"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Brain, Sparkles, BookOpen, DollarSign, CheckSquare, User, LogOut } from "lucide-react"
import CorpoSaude from "./components/corpo-saude"
import MenteEspirito from "./components/mente-espirito"
import BelezaAutocuidado from "./components/beleza-autocuidado"
import EstudosIntelecto from "./components/estudos-intelecto"
import DinheiroFinancas from "./components/dinheiro-financas"
import PerfilUsuario from "./components/perfil-usuario"
import TarefasHabitos from "./components/tarefas-habitos"
import Quiz from "./components/quiz"
import ImprovementPlan from "./components/improvement-plan"
import SalesPage from "./components/sales-page"
import Auth from "./components/auth"
import { supabase } from "@/lib/supabase"

const motivationalQuotes = [
  "Você é capaz de coisas incríveis! 🌟",
  "Cada pequeno passo é um progresso. Continue! 💪",
  "Acredite no seu potencial infinito. ✨",
  "Hoje é o dia perfeito para evoluir. 🚀",
  "Sua jornada de transformação começa agora. 🌱"
]

interface QuizData {
  sleep_hours: number
  exercise_frequency: string
  stress_level: number
  study_hours: number
  financial_control: string
  self_care_routine: string
}

interface ImprovementPlan {
  corpo: string[]
  mente: string[]
  beleza: string[]
  estudos: string[]
  financas: string[]
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("corpo")
  const [dailyQuote, setDailyQuote] = useState("")
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showPlan, setShowPlan] = useState(false)
  const [showSales, setShowSales] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [improvementPlan, setImprovementPlan] = useState<ImprovementPlan | null>(null)

  useEffect(() => {
    setMounted(true)
    setDailyQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)])
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        setHasPurchased(true) // Simula que usuário autenticado já comprou
        setShowQuiz(false)
        setShowPlan(false)
        setShowSales(false)
        setShowAuth(false)
      } else {
        setShowQuiz(true)
      }
    } catch (error) {
      console.error("Erro ao verificar usuário:", error)
      setShowQuiz(true)
    } finally {
      setLoading(false)
    }
  }

  const generateImprovementPlan = (quizData: QuizData): ImprovementPlan => {
    const plan: ImprovementPlan = {
      corpo: [],
      mente: [],
      beleza: [],
      estudos: [],
      financas: []
    }

    // Corpo & Saúde
    if (quizData.sleep_hours < 7) {
      plan.corpo.push("Estabeleça uma rotina de sono regular, dormindo pelo menos 7-8 horas por noite")
    }
    if (quizData.exercise_frequency === "nunca" || quizData.exercise_frequency === "1-2") {
      plan.corpo.push("Comece com 30 minutos de exercício físico 3x por semana")
      plan.corpo.push("Experimente atividades que você goste: caminhada, dança, natação ou yoga")
    }
    plan.corpo.push("Mantenha-se hidratado bebendo pelo menos 2L de água por dia")
    plan.corpo.push("Faça check-ups médicos regulares e cuide da sua saúde preventiva")

    // Mente & Espírito
    if (quizData.stress_level >= 7) {
      plan.mente.push("Pratique meditação ou mindfulness por 10 minutos diariamente")
      plan.mente.push("Considere técnicas de respiração profunda para momentos de estresse")
    }
    plan.mente.push("Reserve tempo para hobbies e atividades que trazem alegria")
    plan.mente.push("Pratique gratidão diária anotando 3 coisas boas do seu dia")
    if (quizData.stress_level >= 8) {
      plan.mente.push("Considere buscar apoio profissional de um psicólogo ou terapeuta")
    }

    // Beleza & Autocuidado
    if (quizData.self_care_routine === "nao" || quizData.self_care_routine === "ocasional") {
      plan.beleza.push("Crie uma rotina matinal e noturna de cuidados com a pele")
      plan.beleza.push("Reserve pelo menos 30 minutos por dia para autocuidado")
    }
    plan.beleza.push("Use protetor solar diariamente para proteger sua pele")
    plan.beleza.push("Mantenha uma alimentação balanceada rica em frutas e vegetais")
    plan.beleza.push("Pratique skincare adequado ao seu tipo de pele")

    // Estudos & Intelecto
    if (quizData.study_hours < 2) {
      plan.estudos.push("Dedique pelo menos 1-2 horas diárias para aprendizado e desenvolvimento")
    }
    plan.estudos.push("Leia pelo menos 20 páginas por dia de livros que expandam seu conhecimento")
    plan.estudos.push("Faça cursos online sobre temas do seu interesse")
    plan.estudos.push("Pratique uma nova habilidade ou idioma regularmente")
    plan.estudos.push("Assista documentários e conteúdos educativos")

    // Finanças
    if (quizData.financial_control === "nao-controlo" || quizData.financial_control === "basico") {
      plan.financas.push("Comece a registrar todas suas despesas e receitas")
      plan.financas.push("Crie um orçamento mensal e acompanhe seus gastos")
    }
    plan.financas.push("Estabeleça uma reserva de emergência de 3-6 meses de despesas")
    plan.financas.push("Defina metas financeiras de curto, médio e longo prazo")
    plan.financas.push("Eduque-se sobre investimentos e planejamento financeiro")
    if (quizData.financial_control === "nao-controlo") {
      plan.financas.push("Considere usar apps de controle financeiro para facilitar o acompanhamento")
    }

    return plan
  }

  const handleQuizComplete = async (quizData: QuizData) => {
    const plan = generateImprovementPlan(quizData)
    setImprovementPlan(plan)
    
    // Salvar respostas do quiz (sem user_id por enquanto)
    try {
      await supabase.from('quiz_responses').insert({
        sleep_hours: quizData.sleep_hours,
        exercise_frequency: quizData.exercise_frequency,
        stress_level: quizData.stress_level,
        study_hours: quizData.study_hours,
        financial_control: quizData.financial_control,
        self_care_routine: quizData.self_care_routine,
        improvement_plan: plan
      })
    } catch (error) {
      console.error("Erro ao salvar quiz:", error)
    }

    setShowQuiz(false)
    setShowPlan(true)
  }

  const handlePlanContinue = () => {
    setShowPlan(false)
    setShowSales(true)
  }

  const handlePurchase = () => {
    setHasPurchased(true)
    setShowSales(false)
    setShowAuth(true)
  }

  const handleAuthSuccess = () => {
    setShowAuth(false)
    checkUser()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setHasPurchased(false)
    setShowQuiz(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  if (showQuiz) {
    return <Quiz onComplete={handleQuizComplete} />
  }

  if (showPlan && improvementPlan) {
    return <ImprovementPlan plan={improvementPlan} onContinue={handlePlanContinue} />
  }

  if (showSales) {
    return <SalesPage onPurchase={handlePurchase} />
  }

  if (showAuth) {
    return <Auth onSuccess={handleAuthSuccess} />
  }

  // Bloqueia acesso ao app se não comprou
  if (!hasPurchased) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
        <Card className="max-w-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Acesso Bloqueado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Para acessar o aplicativo completo, você precisa adquirir um plano.
          </p>
          <Button
            onClick={() => setShowSales(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Ver Planos
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-800/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Evolua.me
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Sua jornada de transformação</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab("perfil")}
                className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                title="Sair"
              >
                <LogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Motivational Quote */}
      {mounted && (
        <div className="container mx-auto px-4 py-6">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg">
            <div className="p-4 text-center">
              <p className="text-white font-medium text-lg">{dailyQuote}</p>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg mb-6">
            <TabsTrigger 
              value="corpo" 
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs font-medium">Corpo</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mente"
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Brain className="w-5 h-5" />
              <span className="text-xs font-medium">Mente</span>
            </TabsTrigger>
            <TabsTrigger 
              value="beleza"
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-medium">Beleza</span>
            </TabsTrigger>
            <TabsTrigger 
              value="estudos"
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-medium">Estudos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dinheiro"
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <DollarSign className="w-5 h-5" />
              <span className="text-xs font-medium">Finanças</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tarefas"
              className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-xl transition-all"
            >
              <CheckSquare className="w-5 h-5" />
              <span className="text-xs font-medium">Tarefas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="corpo" className="mt-0">
            <CorpoSaude />
          </TabsContent>

          <TabsContent value="mente" className="mt-0">
            <MenteEspirito />
          </TabsContent>

          <TabsContent value="beleza" className="mt-0">
            <BelezaAutocuidado />
          </TabsContent>

          <TabsContent value="estudos" className="mt-0">
            <EstudosIntelecto />
          </TabsContent>

          <TabsContent value="dinheiro" className="mt-0">
            <DinheiroFinancas />
          </TabsContent>

          <TabsContent value="tarefas" className="mt-0">
            <TarefasHabitos />
          </TabsContent>

          <TabsContent value="perfil" className="mt-0">
            <PerfilUsuario />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
