'use client'

import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/authStore'
import { useClassPlanStore } from '@/store/ClassPlanStore'
import { useProfileStore } from '@/store/profileStore'

import { ClassPlanCard } from './class-plan-card'
import { ClassPlanCreate } from './class-plan-create'

export function ClassPlan() {
  const { user, fetchUser } = useProfileStore()
  const { id, token, role } = useAuthStore()
  const { fetchClassPlans, classPlans, selectedGroup, setSelectedGroup } =
    useClassPlanStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (id && token) {
      fetchUser(id, token)
    }
  }, [id, token, fetchUser])

  useEffect(() => {
    if (token) {
      fetchClassPlans(token)
    }
  }, [fetchClassPlans, token])

  const handleCreateSuccess = () => {
    if (token) {
      fetchClassPlans(token)
    }
    setIsDialogOpen(false)
  }

  const filteredPlans = classPlans.filter(
    (plan) => plan.group === selectedGroup,
  )

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="hover:pointer mb-2 w-max rounded py-2 text-[14px]"
      >
        ← Voltar
      </button>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tight xs:text-3xl">
          Plano de Aulas
        </h1>
      </div>
      <Tabs
        value={selectedGroup}
        onValueChange={setSelectedGroup}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_01')) && (
            <TabsTrigger className="text-xs xs:text-sm" value="GROUP_01">
              Grupo 01
            </TabsTrigger>
          )}
          {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_02')) && (
            <TabsTrigger className="text-xs xs:text-sm" value="GROUP_02">
              Grupo 02
            </TabsTrigger>
          )}
          {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_03')) && (
            <TabsTrigger className="text-xs xs:text-sm" value="GROUP_03">
              Grupo 03
            </TabsTrigger>
          )}
          {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_04')) && (
            <TabsTrigger className="text-xs xs:text-sm" value="GROUP_04">
              Grupo 04
            </TabsTrigger>
          )}
        </TabsList>
        {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_01')) && (
          <TabsContent value="GROUP_01">
            <ClassPlanCard plans={filteredPlans} />
          </TabsContent>
        )}
        {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_02')) && (
          <TabsContent value="GROUP_02">
            <ClassPlanCard plans={filteredPlans} />
          </TabsContent>
        )}
        {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_03')) && (
          <TabsContent value="GROUP_03">
            <ClassPlanCard plans={filteredPlans} />
          </TabsContent>
        )}
        {(role === 'INSTRUCTOR' || (user && user.group === 'GROUP_04')) && (
          <TabsContent value="GROUP_04">
            <ClassPlanCard plans={filteredPlans} />
          </TabsContent>
        )}
      </Tabs>

      {role === 'INSTRUCTOR' && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed bottom-14 right-6 z-50 bg-primary text-white shadow-lg hover:bg-primary hover:text-white"
            >
              <PlusIcon className="h-8 w-8" />
              <span className="sr-only">Criar Novo</span>
            </Button>
          </DialogTrigger>

          <ClassPlanCreate
            token={token}
            onCreateSuccess={handleCreateSuccess}
          />
        </Dialog>
      )}
    </>
  )
}
