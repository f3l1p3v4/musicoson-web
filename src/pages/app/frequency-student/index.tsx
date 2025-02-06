'use client'

import { NavLink } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function FrequencyStudent() {
  return (
    <section className="grid gap-2">
      <h1 className="mb-6 text-center text-3xl font-bold">Lista de Chamada</h1>
      <NavLink className="flex w-full" to="/frequency">
        <Card className="w-full cursor-pointer">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-md mt-1 font-bold">Antoni Ferreira da Silva</p>
            <p className="mt-2 text-xs">Clarinete</p>
          </CardContent>
        </Card>
      </NavLink>
      <NavLink className="flex w-full" to="/frequency">
        <Card className="w-full cursor-pointer">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-md mt-1 font-bold">Antoni Ferreira da Silva</p>
            <p className="mt-2 text-xs">Clarinete</p>
          </CardContent>
        </Card>
      </NavLink>
      <NavLink className="flex w-full" to="/frequency">
        <Card className="w-full cursor-pointer">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium">GRUPO 01</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-md mt-1 font-bold">Antoni Ferreira da Silva</p>
            <p className="mt-2 text-xs">Clarinete</p>
          </CardContent>
        </Card>
      </NavLink>
    </section>
  )
}
