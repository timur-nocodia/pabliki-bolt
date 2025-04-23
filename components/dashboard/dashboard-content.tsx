"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts"

const data = [
  { year: "2016", Paris: 100, Bangkok: 150, SanFrancisco: 200 },
  { year: "2017", Paris: 150, Bangkok: 200, SanFrancisco: 250 },
  { year: "2018", Paris: 200, Bangkok: 250, SanFrancisco: 300 },
  { year: "2019", Paris: 250, Bangkok: 300, SanFrancisco: 350 }
]

const projectData = [
  { name: "Project A", value: 30 },
  { name: "Project B", value: 25 },
  { name: "Project C", value: 45 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="Paris" 
                    stackId="1" 
                    stroke="#ff7c43" 
                    fill="#ff7c43" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Bangkok" 
                    stackId="1" 
                    stroke="#00b4d8" 
                    fill="#00b4d8" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="SanFrancisco" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div>Total 707</div>
              <div className="flex gap-2">
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#ff7c43] mr-1" />
                  Paris
                </span>
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#00b4d8] mr-1" />
                  Bangkok
                </span>
                <span className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-[#8884d8] mr-1" />
                  San Francisco
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Projects by account
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}