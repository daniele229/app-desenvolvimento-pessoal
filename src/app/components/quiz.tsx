"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Brain, Heart, Sparkles, BookOpen, DollarSign, ArrowRight, ArrowLeft } from "lucide-react"

interface QuizData {
  sleep_hours: number
  exercise_frequency: string
  stress_level: number
  study_hours: number
  financial_control: string
  self_care_routine: string
}

interface QuizProps {
  onComplete: (data: QuizData) => void
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1)
  const [quizData, setQuizData] = useState<QuizData>({
    sleep_hours: 7,
    exercise_frequency: "",
    stress_level: 5,
    study_hours: 0,
    financial_control: "",
    self_care_routine: ""
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(quizData)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return quizData.sleep_hours > 0
      case 2: return quizData.exercise_frequency !== ""
      case 3: return quizData.stress_level > 0
      case 4: return quizData.study_hours >= 0
      case 5: return quizData.financial_control !== ""
      case 6: return quizData.self_care_routine !== ""
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Evolua.me
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Vamos entender seus hábitos para criar um plano personalizado
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Pergunta {step} de {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-8">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Quantas horas você dorme por noite?
                  </h2>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[quizData.sleep_hours]}
                    onValueChange={(value) => setQuizData({ ...quizData, sleep_hours: value[0] })}
                    min={3}
                    max={12}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-center text-2xl font-bold text-purple-600">
                    {quizData.sleep_hours} horas
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Com que frequência você pratica exercícios físicos?
                  </h2>
                </div>
                <RadioGroup
                  value={quizData.exercise_frequency}
                  onValueChange={(value) => setQuizData({ ...quizData, exercise_frequency: value })}
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="nunca" id="nunca" />
                    <Label htmlFor="nunca" className="flex-1 cursor-pointer">Nunca ou raramente</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="1-2" id="1-2" />
                    <Label htmlFor="1-2" className="flex-1 cursor-pointer">1-2 vezes por semana</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="3-4" id="3-4" />
                    <Label htmlFor="3-4" className="flex-1 cursor-pointer">3-4 vezes por semana</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="5+" id="5+" />
                    <Label htmlFor="5+" className="flex-1 cursor-pointer">5 ou mais vezes por semana</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Como está seu nível de estresse atualmente?
                  </h2>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[quizData.stress_level]}
                    onValueChange={(value) => setQuizData({ ...quizData, stress_level: value[0] })}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Muito baixo</span>
                    <span className="text-2xl font-bold text-purple-600">{quizData.stress_level}</span>
                    <span>Muito alto</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Quantas horas por dia você dedica aos estudos?
                  </h2>
                </div>
                <div className="space-y-4">
                  <Slider
                    value={[quizData.study_hours]}
                    onValueChange={(value) => setQuizData({ ...quizData, study_hours: value[0] })}
                    min={0}
                    max={12}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-center text-2xl font-bold text-blue-600">
                    {quizData.study_hours} horas
                  </p>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Como você controla suas finanças?
                  </h2>
                </div>
                <RadioGroup
                  value={quizData.financial_control}
                  onValueChange={(value) => setQuizData({ ...quizData, financial_control: value })}
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="nao-controlo" id="nao-controlo" />
                    <Label htmlFor="nao-controlo" className="flex-1 cursor-pointer">Não controlo minhas finanças</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="basico" id="basico" />
                    <Label htmlFor="basico" className="flex-1 cursor-pointer">Controle básico (mental)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="planilha" id="planilha" />
                    <Label htmlFor="planilha" className="flex-1 cursor-pointer">Uso planilhas ou apps</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="completo" id="completo" />
                    <Label htmlFor="completo" className="flex-1 cursor-pointer">Controle completo e detalhado</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Você tem uma rotina de autocuidado?
                  </h2>
                </div>
                <RadioGroup
                  value={quizData.self_care_routine}
                  onValueChange={(value) => setQuizData({ ...quizData, self_care_routine: value })}
                >
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="nao" id="nao" />
                    <Label htmlFor="nao" className="flex-1 cursor-pointer">Não tenho rotina de autocuidado</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="ocasional" id="ocasional" />
                    <Label htmlFor="ocasional" className="flex-1 cursor-pointer">Ocasionalmente me cuido</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular" className="flex-1 cursor-pointer">Tenho uma rotina regular</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RadioGroupItem value="completa" id="completa" />
                    <Label htmlFor="completa" className="flex-1 cursor-pointer">Rotina completa e consistente</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {step === totalSteps ? "Ver meu plano" : "Próxima"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
