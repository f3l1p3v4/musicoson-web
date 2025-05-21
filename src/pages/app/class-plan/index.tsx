'use client'

import { useEffect } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/authStore'
import { useClassPlanStore } from '@/store/ClassPlanStore'

import { ClassPlanCard } from './class-plan-card'

export function ClassPlan() {
  const { fetchClassPlans, classPlans, selectedGroup, setSelectedGroup } =
    useClassPlanStore()
  const { token } = useAuthStore()

  useEffect(() => {
    if (token) {
      fetchClassPlans(token)
    }
  }, [fetchClassPlans, token])

  // Filtrar os planos de aula pelo grupo selecionado
  const filteredPlans = classPlans.filter(
    (plan) => plan.group === selectedGroup,
  )

  return (
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
  )
}
