"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Heart, Brain, BookOpen, DollarSign, Star, Lock, Zap } from "lucide-react"

interface SalesPageProps {
  onPurchase: () => void
}

export default function SalesPage({ onPurchase }: SalesPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Desbloqueie Seu Potencial Máximo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transforme sua vida com o plano personalizado que acabamos de criar para você
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Corpo & Saúde</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Acompanhamento completo de exercícios, sono e hábitos saudáveis
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Mente & Espírito</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Meditações guiadas, controle de estresse e bem-estar mental
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Beleza & Autocuidado</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Rotinas personalizadas de skincare e autocuidado diário
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Estudos & Intelecto</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Organize seus estudos e desenvolva novas habilidades
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Finanças</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Controle total de gastos, investimentos e metas financeiras
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-indigo-500" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">Tarefas & Hábitos</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sistema completo de gerenciamento de tarefas e hábitos diários
            </p>
          </Card>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg inline-flex gap-2">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedPlan === "monthly"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setSelectedPlan("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedPlan === "yearly"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                -40%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Monthly Plan */}
          {selectedPlan === "monthly" && (
            <Card className="p-8 border-2 border-purple-200 dark:border-purple-800 hover:shadow-2xl transition-all">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Plano Mensal</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    R$ 49,90
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Acesso completo a todas as 6 áreas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Plano personalizado baseado no seu quiz</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Meditações guiadas em áudio</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Sistema de tarefas e hábitos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Atualizações e novos recursos</span>
                </li>
              </ul>

              <Button
                onClick={onPurchase}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold"
              >
                Começar Agora
              </Button>
            </Card>
          )}

          {/* Yearly Plan */}
          {selectedPlan === "yearly" && (
            <Card className="p-8 border-4 border-purple-500 dark:border-purple-600 hover:shadow-2xl transition-all relative md:col-span-2 max-w-2xl mx-auto">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  MELHOR OFERTA
                  <Star className="w-4 h-4" />
                </div>
              </div>

              <div className="text-center mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Plano Anual</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    R$ 29,90
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mês</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cobrado anualmente: R$ 358,80 (economize R$ 240)
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">Tudo do plano mensal +</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">40% de desconto (economize R$ 240/ano)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Acesso prioritário a novos recursos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Suporte prioritário</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Conteúdos exclusivos mensais</span>
                </li>
              </ul>

              <Button
                onClick={onPurchase}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold"
              >
                Começar Agora - Economize 40%
              </Button>
            </Card>
          )}
        </div>

        {/* Trust Badges */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Lock className="w-5 h-5" />
            <span className="text-sm">Pagamento 100% seguro e criptografado</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Garantia de 7 dias - Se não gostar, devolvemos seu dinheiro
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              "Mudou completamente minha rotina! Consegui organizar todas as áreas da minha vida."
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">- Maria Silva</p>
          </Card>

          <Card className="p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              "As meditações guiadas me ajudaram muito com o estresse. Recomendo demais!"
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">- João Santos</p>
          </Card>

          <Card className="p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              "Finalmente consegui controlar minhas finanças e criar hábitos saudáveis!"
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">- Ana Costa</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
