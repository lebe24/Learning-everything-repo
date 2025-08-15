 
"use client"

import React, { useState, useCallback } from 'react'
import {
  ReactFlow,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  Handle,
  Position,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  // Dialog,
  // DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog"
import {
  IconBrain,
  IconRobot,
  IconCamera,
  IconFileDescription,
  // IconFileAi,
  IconSettings,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react"


// Custom Node Types


type NodeData = {
  id?: string;
  label: string;
  description?: string;
  type?: string;
  onChange?: (id: string, newLabel: string) => void;
};

const AgentNode = ({ data }: { data: NodeData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [nodeName, setNodeName] = useState(data.label)

  const handleSave = () => {
    if (data.onChange && data.id) {
      data.onChange(data.id, nodeName)
    }
    setIsEditing(false)
  }

  return (
    <Card className="w-64 shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <IconRobot className="h-4 w-4 text-primary" />
            </div>
            <Badge variant="outline" className="text-xs">Agent</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <IconPlus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <IconSettings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="h-8 text-sm"
            />
            <div className="flex gap-1">
              <Button size="sm" onClick={handleSave} className="h-6 text-xs">
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="h-6 text-xs">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <CardTitle className="text-sm cursor-pointer hover:text-primary" onClick={() => setIsEditing(true)}>
              {nodeName}
            </CardTitle>
            <CardDescription className="text-xs">
              AI-powered content generation agent
            </CardDescription>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Status: Active</span>
              <span>Tasks: 12</span>
            </div>
          </div>
        )}
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </Card>
  )
}

const TriggerNode = ({ data }: { data: NodeData }) => {
  return (
    <Card className="w-64 shadow-lg border-2 border-green-200 hover:border-green-300 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-green-100">
            <IconPlus className="h-4 w-4 text-green-600" />
          </div>
          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Trigger</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardTitle className="text-sm">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          Starts the workflow execution
        </CardDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Type: Manual</span>
          <span>Ready</span>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </Card>
  )
}

const ActionNode = ({ data }: { data: NodeData }) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'content': return <IconFileDescription className="h-4 w-4" />
      case 'image': return <IconCamera className="h-4 w-4" />
      case 'ai': return <IconBrain className="h-4 w-4" />
      default: return <IconSettings className="h-4 w-4" />
    }
  }

  const getColor = (type?: string) => {
    switch (type) {
      case 'content': return 'border-blue-200 hover:border-blue-300'
      case 'image': return 'border-purple-200 hover:border-purple-300'
      case 'ai': return 'border-orange-200 hover:border-orange-300'
      default: return 'border-gray-200 hover:border-gray-300'
    }
  }

  return (
    <Card className={`w-64 shadow-lg border-2 ${getColor(data.type)} transition-colors`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            {getIcon(data.type)}
          </div>
          <Badge variant="outline" className="text-xs">Action</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardTitle className="text-sm">{data.label}</CardTitle>
        <CardDescription className="text-xs">
          {data.description}
        </CardDescription>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Type: {data.type}</span>
          <span>Idle</span>
        </div>
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </Card>
  )
}

const nodeTypes: NodeTypes = {
  agentNode: AgentNode,
  triggerNode: TriggerNode,
  actionNode: ActionNode,
}

// Node Templates
const nodeTemplates = [
  {
    id: 'trigger',
    label: 'Manual Trigger',
    type: 'triggerNode',
    description: 'Start workflow manually',
    category: 'Triggers'
  },
  {
    id: 'agent',
    label: 'AI Agent',
    type: 'agentNode',
    description: 'AI-powered content generation',
    category: 'Agents'
  },
  {
    id: 'content',
    label: 'Content Generator',
    type: 'actionNode',
    description: 'Generate text content',
    category: 'Actions',
    nodeType: 'content'
  },
  {
    id: 'image',
    label: 'Image Creator',
    type: 'actionNode',
    description: 'Generate images',
    category: 'Actions',
    nodeType: 'image'
  },
  {
    id: 'ai',
    label: 'AI Processor',
    type: 'actionNode',
    description: 'Process with AI',
    category: 'Actions',
    nodeType: 'ai'
  }
]


export function CanvasWorkflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isNodePanelOpen, setIsNodePanelOpen] = useState(false)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const addNode = useCallback((template: NodeData) => {
    const newNode: Node = {
      id: `${template.id}-${Date.now()}`,
      type: template.type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: template.label,
        description: template.description,
        type: template.type,
        onChange: (id: string, newLabel: string) => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
            )
          )
        }
      }
    }
    setNodes((nds) => [...nds, newNode])
    setIsNodePanelOpen(false)
  }, [setNodes])

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    setSelectedNode(null)
  }, [setNodes, setEdges])

  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Node Panel */}
      <div className="w-80 border-r bg-muted/30 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Node Library</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsNodePanelOpen(!isNodePanelOpen)}
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </div>

        {isNodePanelOpen && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Search Nodes</Label>
              <Input placeholder="Search..." className="h-8" />
            </div>
            
            {nodeTemplates.map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => addNode(template)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-primary/10">
                      {template.type === 'triggerNode' && <IconPlus className="h-3 w-3" />}
                      {template.type === 'agentNode' && <IconRobot className="h-3 w-3" />}
                      {template.type === 'actionNode' && <IconSettings className="h-3 w-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{template.label}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selected Node Properties */}
        {selectedNode && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm">Node Properties</h4>
            <Card>
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={selectedNode.data.label}
                      onChange={(e) => {
                        setNodes((nds) =>
                          nds.map((node) =>
                            node.id === selectedNode.id
                              ? { ...node, data: { ...node.data, label: e.target.value } }
                              : node
                          )
                        )
                      }}
                      className="h-7 text-sm"
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs"
                      onClick={() => deleteNode(selectedNode.id)}
                    >
                      <IconTrash className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>

        {/* Canvas Toolbar */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button size="sm" variant="outline" className="h-8">
            <IconPlus className="h-4 w-4 mr-1" />
            Run
          </Button>
          <Button size="sm" variant="outline" className="h-8">
            <IconSettings className="h-4 w-4 mr-1" />
            Pause
          </Button>
        </div>

        {/* Canvas Info */}
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground">
          Nodes: {nodes.length} | Edges: {edges.length}
        </div>
      </div>
    </div>
  )
}
