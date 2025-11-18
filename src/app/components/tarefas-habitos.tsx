"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Tarefa {
  id: string
  texto: string
  concluida: boolean
}

interface Habito {
  id: string
  nome: string
  dias: boolean[]
}

export default function TarefasHabitos() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [novaTarefa, setNovaTarefa] = useState("")
  const [habitos, setHabitos] = useState<Habito[]>([])
  const [novoHabito, setNovoHabito] = useState("")
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"]

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        await loadTarefas(user.id)
        await loadHabitos(user.id)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadTarefas = async (uid: string) => {
    if (!supabase) return

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (data && !error) {
      setTarefas(data.map(t => ({
        id: t.id,
        texto: t.texto,
        concluida: t.concluida
      })))
    }
  }

  const loadHabitos = async (uid: string) => {
    if (!supabase) return

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (data && !error) {
      setHabitos(data.map(h => ({
        id: h.id,
        nome: h.nome,
        dias: h.dias || [false, false, false, false, false, false, false]
      })))
    }
  }

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() && userId && supabase) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: userId,
          texto: novaTarefa,
          concluida: false
        })
        .select()
        .single()

      if (data && !error) {
        setTarefas([{ id: data.id, texto: data.texto, concluida: data.concluida }, ...tarefas])
        setNovaTarefa("")
      }
    }
  }

  const toggleTarefa = async (id: string) => {
    if (!supabase) return

    const tarefa = tarefas.find(t => t.id === id)
    if (tarefa) {
      const { error } = await supabase
        .from('tasks')
        .update({ concluida: !tarefa.concluida })
        .eq('id', id)

      if (!error) {
        setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t))
      }
    }
  }

  const removerTarefa = async (id: string) => {
    if (!supabase) return

    const { error } = await supabase
      .from('tasks')
      .update({ texto: '[REMOVIDA]', concluida: true })
      .eq('id', id)

    if (!error) {
      setTarefas(tarefas.filter(t => t.id !== id))
    }
  }

  const adicionarHabito = async () => {
    if (novoHabito.trim() && userId && supabase) {
      const { data, error } = await supabase
        .from('habits')
        .insert({
          user_id: userId,
          nome: novoHabito,
          dias: [false, false, false, false, false, false, false]
        })
        .select()
        .single()

      if (data && !error) {
        setHabitos([{ id: data.id, nome: data.nome, dias: data.dias }, ...habitos])
        setNovoHabito("")
      }
    }
  }

  const toggleDiaHabito = async (habitoId: string, diaIndex: number) => {
    if (!supabase) return

    const habito = habitos.find(h => h.id === habitoId)
    if (habito) {
      const novosDias = [...habito.dias]
      novosDias[diaIndex] = !novosDias[diaIndex]

      const { error } = await supabase
        .from('habits')
        .update({ dias: novosDias })
        .eq('id', habitoId)

      if (!error) {
        setHabitos(habitos.map(h => h.id === habitoId ? { ...h, dias: novosDias } : h))
      }
    }
  }

  const removerHabito = async (id: string) => {
    if (!supabase) return

    const { error } = await supabase
      .from('habits')
      .update({ nome: '[REMOVIDO]' })
      .eq('id', id)

    if (!error) {
      setHabitos(habitos.filter(h => h.id !== id))
    }
  }

  const tarefasConcluidas = tarefas.filter(t => t.concluida).length
  const progressoTarefas = tarefas.length > 0 ? (tarefasConcluidas / tarefas.length) * 100 : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com Progresso */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 border-0 shadow-xl">
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Tarefas & Hábitos</h2>
          <p className="text-indigo-100 mb-4">Organize seu dia e acompanhe sua evolução</p>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressoTarefas}%` }}
            />
          </div>
          <p className="text-sm text-indigo-100 mt-2">
            {tarefasConcluidas} de {tarefas.length} tarefas concluídas hoje
          </p>
        </div>
      </Card>

      {/* Tarefas Diárias */}
      <Card className="shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-indigo-600" />
            Tarefas Diárias
          </h3>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Adicionar nova tarefa..."
              value={novaTarefa}
              onChange={(e) => setNovaTarefa(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && adicionarTarefa()}
              className="flex-1"
            />
            <Button onClick={adicionarTarefa} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {tarefas.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Nenhuma tarefa ainda. Adicione sua primeira tarefa!
              </p>
            ) : (
              tarefas.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <button
                    onClick={() => toggleTarefa(tarefa.id)}
                    className="flex-shrink-0"
                  >
                    {tarefa.concluida ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  <span
                    className={`flex-1 ${
                      tarefa.concluida
                        ? "line-through text-gray-400"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {tarefa.texto}
                  </span>
                  <button
                    onClick={() => removerTarefa(tarefa.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Controle de Hábitos */}
      <Card className="shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Circle className="w-6 h-6 text-purple-600" />
            Controle de Hábitos
          </h3>

          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Adicionar novo hábito..."
              value={novoHabito}
              onChange={(e) => setNovoHabito(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && adicionarHabito()}
              className="flex-1"
            />
            <Button onClick={adicionarHabito} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            {habitos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                Nenhum hábito ainda. Adicione seu primeiro hábito!
              </p>
            ) : (
              habitos.map((habito) => (
                <div key={habito.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {habito.nome}
                    </span>
                    <button onClick={() => removerHabito(habito.id)}>
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                    </button>
                  </div>
                  <div className="flex gap-2 justify-between">
                    {habito.dias.map((concluido, index) => (
                      <button
                        key={index}
                        onClick={() => toggleDiaHabito(habito.id, index)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                          concluido
                            ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg scale-110"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {diasSemana[index]}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    {habito.dias.filter(d => d).length} de 7 dias completados
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
