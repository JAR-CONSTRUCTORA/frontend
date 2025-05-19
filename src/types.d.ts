export interface User {
  _id: string
  username: string
  password: string
  firstName: string
  lastName: string
  role: string
}

export interface Task {
  _id: string
  station: string
  incidencia?: number
  description: string
  location: string
  estimatedTime: number
  startDateTime: Date
  enDateTime: Date
  status: string
  assignees: User[]
  completedOnTime: boolean
}
