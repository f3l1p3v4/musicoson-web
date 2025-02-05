'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ClassPlanCard } from './class-plan-card'

export function ClassPlan() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="group-1">Grupo 01</TabsTrigger>
        <TabsTrigger value="group-2">Grupo 02</TabsTrigger>
        <TabsTrigger value="group-3">Grupo 03</TabsTrigger>
        <TabsTrigger value="group-4">Grupo 04</TabsTrigger>
      </TabsList>
      <TabsContent value="group-1">
        <ClassPlanCard />
      </TabsContent>
      <TabsContent value="group-2">
        <ClassPlanCard />
      </TabsContent>
      <TabsContent value="group-3">
        <ClassPlanCard />
      </TabsContent>
      <TabsContent value="group-4">
        <ClassPlanCard />
      </TabsContent>
    </Tabs>
  )
}
