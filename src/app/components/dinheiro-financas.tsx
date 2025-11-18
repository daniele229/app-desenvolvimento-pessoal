"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DollarSign, TrendingUp, TrendingDown, Plus, Trash2, PieChart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
}

const expenseCategories = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Vestuário",
  "Outros"
]

export default function DinheiroFinancas() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [goals, setGoals] = useState<FinancialGoal[]>([])
  const [newTransaction, setNewTransaction] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    category: "",
    description: ""
  })
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    currentAmount: ""
  })

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.category) {
      setTransactions([...transactions, {
        id: Date.now().toString(),
        type: newTransaction.type,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        description: newTransaction.description,
        date: new Date().toLocaleDateString()
      }])
      setNewTransaction({
        type: "expense",
        amount: "",
        category: "",
        description: ""
      })
    }
  }

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount) {
      setGoals([...goals, {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: newGoal.currentAmount ? parseFloat(newGoal.currentAmount) : 0
      }])
      setNewGoal({
        name: "",
        targetAmount: "",
        currentAmount: ""
      })
    }
  }

  const deleteTransaction = (id: string) => setTransactions(transactions.filter(t => t.id !== id))
  const deleteGoal = (id: string) => setGoals(goals.filter(g => g.id !== id))

  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    ))
  }

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const expensesByCategory = expenseCategories.map(category => ({
    category,
    amount: transactions
      .filter(t => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
  })).filter(item => item.amount > 0)

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Ganhos</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  R$ {totalIncome.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-900/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Gastos</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  R$ {totalExpenses.toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${balance >= 0 ? 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900/30' : 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-900/30'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Saldo</p>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  R$ {balance.toFixed(2)}
                </p>
              </div>
              <DollarSign className={`w-8 h-8 ${balance >= 0 ? 'text-blue-500' : 'text-orange-500'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 rounded-xl">
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
        </TabsList>

        {/* Transações Tab */}
        <TabsContent value="transacoes" className="space-y-4">
          <Card className="border-green-200 dark:border-green-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <DollarSign className="w-5 h-5" />
                Controle Financeiro
              </CardTitle>
              <CardDescription>Registre ganhos e gastos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Transação
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                    <DialogDescription>Adicione um ganho ou gasto</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo</Label>
                      <Select 
                        value={newTransaction.type} 
                        onValueChange={(value: "income" | "expense") => setNewTransaction({ ...newTransaction, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="income">Ganho</SelectItem>
                          <SelectItem value="expense">Gasto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Valor (R$)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <Select 
                        value={newTransaction.category} 
                        onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {newTransaction.type === "income" ? (
                            <>
                              <SelectItem value="Salário">Salário</SelectItem>
                              <SelectItem value="Freelance">Freelance</SelectItem>
                              <SelectItem value="Investimentos">Investimentos</SelectItem>
                              <SelectItem value="Outros">Outros</SelectItem>
                            </>
                          ) : (
                            expenseCategories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        placeholder="Ex: Compras do mês"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                      />
                    </div>
                    <Button onClick={addTransaction} className="w-full">Salvar Transação</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-2">
                  {transactions.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Nenhuma transação registrada</p>
                  ) : (
                    transactions.map((transaction) => (
                      <Card key={transaction.id} className={`${transaction.type === "income" ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20'}`}>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {transaction.type === "income" ? (
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-600" />
                                )}
                                <span className={`text-xs font-medium ${transaction.type === "income" ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                  {transaction.category}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{transaction.description || "Sem descrição"}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{transaction.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-lg font-bold ${transaction.type === "income" ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTransaction(transaction.id)}
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
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categorias Tab */}
        <TabsContent value="categorias" className="space-y-4">
          <Card className="border-orange-200 dark:border-orange-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <PieChart className="w-5 h-5" />
                Gastos por Categoria
              </CardTitle>
              <CardDescription>Visualize onde seu dinheiro está indo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expensesByCategory.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhum gasto registrado ainda</p>
                ) : (
                  expensesByCategory.map((item) => {
                    const percentage = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0
                    return (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                          <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                            R$ {item.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metas Tab */}
        <TabsContent value="metas" className="space-y-4">
          <Card className="border-blue-200 dark:border-blue-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-5 h-5" />
                Metas Financeiras
              </CardTitle>
              <CardDescription>Defina e acompanhe seus objetivos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Meta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Meta Financeira</DialogTitle>
                    <DialogDescription>Defina um objetivo de economia</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="goal-name">Nome da Meta</Label>
                      <Input
                        id="goal-name"
                        placeholder="Ex: Viagem de Férias"
                        value={newGoal.name}
                        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-amount">Valor Objetivo (R$)</Label>
                      <Input
                        id="target-amount"
                        type="number"
                        step="0.01"
                        placeholder="5000.00"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-amount">Valor Atual (R$)</Label>
                      <Input
                        id="current-amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newGoal.currentAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                      />
                    </div>
                    <Button onClick={addGoal} className="w-full">Criar Meta</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-3">
                {goals.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhuma meta definida ainda</p>
                ) : (
                  goals.map((goal) => {
                    const progress = (goal.currentAmount / goal.targetAmount) * 100
                    return (
                      <Card key={goal.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-blue-700 dark:text-blue-400">{goal.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                R$ {goal.currentAmount.toFixed(2)} / R$ {goal.targetAmount.toFixed(2)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteGoal(goal.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Progress value={Math.min(progress, 100)} className="h-2 mb-2" />
                          <p className="text-xs text-center text-blue-600 dark:text-blue-400 font-medium">
                            {progress.toFixed(1)}% concluído
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
