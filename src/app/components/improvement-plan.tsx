"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, TrendingUp, Target, Sparkles, Zap, Heart, Trophy, Star } from "lucide-react"

interface ImprovementPlan {
  corpo: string[]
  mente: string[]
  beleza: string[]
  estudos: string[]
  financas: string[]
}

interface ImprovementPlanProps {
  plan: ImprovementPlan
  onContinue: () => void
}

export default function ImprovementPlan({ plan, onContinue }: ImprovementPlanProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Seu Plano de Evolução Personalizado
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Baseado nas suas respostas, criamos um plano para você evoluir em todas as áreas
            </p>
          </div>

          {/* Plan Sections */}
          <div className="space-y-6 mb-8">
            {/* Corpo */}
            <Card className="border-l-4 border-red-500">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-red-500" />
                  Corpo & Saúde
                </h3>
                <ul className="space-y-2">
                  {plan.corpo.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Mente */}
            <Card className="border-l-4 border-purple-500">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  Mente & Espírito
                </h3>
                <ul className="space-y-2">
                  {plan.mente.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Beleza */}
            <Card className="border-l-4 border-pink-500">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                  Beleza & Autocuidado
                </h3>
                <ul className="space-y-2">
                  {plan.beleza.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Estudos */}
            <Card className="border-l-4 border-blue-500">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                  Estudos & Intelecto
                </h3>
                <ul className="space-y-2">
                  {plan.estudos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Finanças */}
            <Card className="border-l-4 border-green-500">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  Finanças
                </h3>
                <ul className="space-y-2">
                  {plan.financas.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Benefits Section */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 mb-8">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Benefícios de Seguir Este Plano
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Mais Energia e Disposição</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Melhore sua saúde física e mental com hábitos consistentes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Redução do Estresse</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Técnicas de meditação e mindfulness para uma mente mais tranquila
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Autoestima Elevada</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cuide de si mesmo e sinta-se mais confiante e radiante
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Crescimento Pessoal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Desenvolva novas habilidades e expanda seu conhecimento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Estabilidade Financeira</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Controle suas finanças e alcance seus objetivos financeiros
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Vida Mais Organizada</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gerencie tarefas e hábitos de forma eficiente e produtiva
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
            >
              Comece sua evolução
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Transforme sua vida com um plano personalizado e acompanhamento completo
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
