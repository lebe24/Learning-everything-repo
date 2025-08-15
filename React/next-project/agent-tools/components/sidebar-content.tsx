"use client"

import { useSidebarContext } from "@/lib/sidebar-context"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { CanvasWorkflow } from "@/components/canvas-workflow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  IconRobot, 
  IconBrain, 
  IconSettings, 
  IconUsers, 
  IconCamera, 
  IconFileDescription, 
  IconFileAi,
  IconPlus,
  IconPlayerPlay,
  IconPlayerPause,
  IconTrash
} from "@tabler/icons-react"

import data from "@/app/dashboard/data.json"

export function SidebarContent() {
  const { activeSection } = useSidebarContext()

  // Add a debug header to show current section
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      'dashboard': 'Dashboard',
      'agents': 'AI Agents',
      'canvas': 'Canvas workflow',
      'analytics': 'Analytics',
      'projects': 'Projects',
      'team': 'Team',
      'capture': 'Capture',
      'proposal': 'Proposals',
      'prompts': 'Prompts',
    }
    return titles[section] || 'Dashboard'
  }

  const renderCanvas = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Canvas Workflow</h1>
            <p className="text-muted-foreground">Design and automate your content creation workflows</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            New Workflow
          </Button>
        </div>
      </div>
      
      <CanvasWorkflow />
    </div>
  )

  const renderDashboardContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
      </div>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  )

  const renderAgentsContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">AI Agents</h1>
            <p className="text-muted-foreground">Manage your AI agents and workflows</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Content Generator", status: "active", type: "Text", icon: IconBrain },
            { name: "Image Creator", status: "idle", type: "Visual", icon: IconRobot },
            { name: "Data Analyzer", status: "active", type: "Analytics", icon: IconSettings },
            { name: "Video Editor", status: "offline", type: "Media", icon: IconCamera },
          ].map((agent, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <agent.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <Badge variant={agent.status === 'active' ? 'default' : agent.status === 'idle' ? 'secondary' : 'destructive'}>
                    {agent.status}
                  </Badge>
                </div>
                <CardDescription>{agent.type} Agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <IconPlayerPlay className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <IconPlayerPause className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="ml-auto">
                    <IconTrash className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalyticsContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights and performance metrics</p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Key metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartAreaInteractive />
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Content Generator", efficiency: 94, tasks: 156 },
                    { name: "Image Creator", efficiency: 87, tasks: 89 },
                    { name: "Data Analyzer", efficiency: 92, tasks: 234 },
                  ].map((agent, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.tasks} tasks completed</p>
                      </div>
                      <Badge variant="outline">{agent.efficiency}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "New agent deployed: Video Editor",
                    "Content Generator completed 15 tasks",
                    "System maintenance completed",
                    "New workflow created: Social Media",
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  const renderProjectsContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your content creation projects</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "YouTube Series", status: "In Progress", progress: 75, type: "Video" },
            { name: "Blog Content", status: "Completed", progress: 100, type: "Article" },
            { name: "Social Media", status: "Planning", progress: 25, type: "Campaign" },
            { name: "Product Demo", status: "In Progress", progress: 60, type: "Video" },
          ].map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription>{project.type} Project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
                    {project.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTeamContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Team</h1>
            <p className="text-muted-foreground">Manage your team members and permissions</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "John Doe", role: "Admin", status: "Online", avatar: "JD" },
            { name: "Jane Smith", role: "Editor", status: "Away", avatar: "JS" },
            { name: "Mike Johnson", role: "Viewer", status: "Offline", avatar: "MJ" },
            { name: "Sarah Wilson", role: "Editor", status: "Online", avatar: "SW" },
          ].map((member, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium">
                    {member.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant={member.status === 'Online' ? 'default' : member.status === 'Away' ? 'secondary' : 'outline'}>
                    {member.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderCaptureContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Capture</h1>
          <p className="text-muted-foreground">Capture and organize your content ideas</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Captures</CardTitle>
              <CardDescription>Currently processing content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "YouTube video script - 75% processed",
                  "Blog post outline - 90% processed",
                  "Social media content - 45% processed",
                ].map((capture, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <IconCamera className="h-4 w-4 text-primary" />
                    <span>{capture}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Capture</CardTitle>
              <CardDescription>Start a new content capture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <IconCamera className="mr-2 h-4 w-4" />
                  Capture Video
                </Button>
                <Button className="w-full" variant="outline">
                  <IconFileDescription className="mr-2 h-4 w-4" />
                  Capture Text
                </Button>
                <Button className="w-full" variant="outline">
                  <IconBrain className="mr-2 h-4 w-4" />
                  Capture Ideas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderProposalContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Proposals</h1>
            <p className="text-muted-foreground">Manage your content proposals and drafts</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Q4 Content Strategy", status: "Draft", type: "Strategy", date: "2024-01-15" },
            { name: "Product Launch Video", status: "Review", type: "Video", date: "2024-01-12" },
            { name: "Blog Series Outline", status: "Approved", type: "Content", date: "2024-01-10" },
            { name: "Social Media Campaign", status: "Draft", type: "Campaign", date: "2024-01-08" },
          ].map((proposal, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{proposal.name}</CardTitle>
                <CardDescription>{proposal.type} Proposal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">{proposal.date}</span>
                  </div>
                  <Badge variant={proposal.status === 'Approved' ? 'default' : proposal.status === 'Review' ? 'secondary' : 'outline'}>
                    {proposal.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPromptsContent = () => (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Active Section: {getSectionTitle(activeSection)}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Prompts</h1>
            <p className="text-muted-foreground">Manage your AI prompts and templates</p>
          </div>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            New Prompt
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Video Script Generator", category: "Content", usage: 156, rating: 4.8 },
            { name: "Image Description", category: "Visual", usage: 89, rating: 4.5 },
            { name: "Blog Post Writer", category: "Content", usage: 234, rating: 4.9 },
            { name: "Social Media Post", category: "Marketing", usage: 67, rating: 4.2 },
          ].map((prompt, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IconFileAi className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{prompt.name}</CardTitle>
                </div>
                <CardDescription>{prompt.category} Prompt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Usage</span>
                    <span className="text-sm font-medium">{prompt.usage} times</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{prompt.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Use
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  switch (activeSection) {
    case 'dashboard':
      return renderDashboardContent()
    case 'agents':
      return renderAgentsContent()
    case 'canvas':
      return renderCanvas()
    case 'analytics':
      return renderAnalyticsContent()
    case 'projects':
      return renderProjectsContent()
    case 'team':
      return renderTeamContent()
    case 'capture':
      return renderCaptureContent()
    case 'proposal':
      return renderProposalContent()
    case 'prompts':
      return renderPromptsContent()
    default:
      return renderDashboardContent()
  }
}
