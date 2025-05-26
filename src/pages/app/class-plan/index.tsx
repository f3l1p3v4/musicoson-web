'use client'

import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/authStore'
import { useClassPlanStore } from '@/store/ClassPlanStore'

import { ClassPlanCard } from './class-plan-card'
import { ClassPlanCreate } from './class-plan-create'

export function ClassPlan() {
  const { fetchClassPlans, classPlans, selectedGroup, setSelectedGroup } =
    useClassPlanStore()
  const { token } = useAuthStore()

  // Estado para abrir/fechar modal
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (token) {
      fetchClassPlans(token)
    }
  }, [fetchClassPlans, token])

  // Atualiza a lista e fecha modal
  const handleCreateSuccess = () => {
    if (token) {
      fetchClassPlans(token)
    }
    setIsDialogOpen(false)
  }

  // Filtrar os planos de aula pelo grupo selecionado
  const filteredPlans = classPlans.filter(
    (plan) => plan.group === selectedGroup,
  )

  return (
    <>
      <Tabs
        value={selectedGroup}
        onValueChange={setSelectedGroup}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="GROUP_01">Grupo 01</TabsTrigger>
          <TabsTrigger value="GROUP_02">Grupo 02</TabsTrigger>
          <TabsTrigger value="GROUP_03">Grupo 03</TabsTrigger>
          <TabsTrigger value="GROUP_04">Grupo 04</TabsTrigger>
        </TabsList>
        <TabsContent value="GROUP_01">
          <ClassPlanCard plans={filteredPlans} />
        </TabsContent>
        <TabsContent value="GROUP_02">
          <ClassPlanCard plans={filteredPlans} />
        </TabsContent>
        <TabsContent value="GROUP_03">
          <ClassPlanCard plans={filteredPlans} />
        </TabsContent>
        <TabsContent value="GROUP_04">
          <ClassPlanCard plans={filteredPlans} />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-6 right-6 bg-primary text-white hover:bg-primary hover:text-white"
          >
            <PlusIcon className="h-8 w-8" />
            <span className="sr-only">Criar Novo</span>
          </Button>
        </DialogTrigger>

        <ClassPlanCreate token={token} onCreateSuccess={handleCreateSuccess} />
      </Dialog>
    </>
  )
}
