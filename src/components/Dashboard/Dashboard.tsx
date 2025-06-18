import { Task } from '@/types'
import React, { useState } from 'react'
import { CardTask } from '../CardTask'
import { ModalUserDetailTask } from '../Modals/ModalUserDetailTask'

interface Prop {
  data: Task[]
  section: string
  getTasks?: () => void
  startTask?: (id: string) => void
  endTask?: (id: string) => void
  sendNote?: (id: string, userId: string, note: string) => void
}

const Dashboard: React.FC<Prop> = ({
  data,
  section,
  getTasks,
  startTask,
  endTask,
  sendNote,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>()
  return (
    <main className="rounded-2xl border border-white/10 bg-[#212121] p-6 shadow-lg lg:col-span-10">
      <header className="mb-6 flex gap-2">
        <p className="w-fit gap-1 border-b-4 border-green-300 text-2xl font-semibold tracking-wider">
          {section}
        </p>
      </header>
      <section className="grid grid-cols-4 gap-6">
        {data?.map((task, i) => (
          <CardTask
            onClick={() => setSelectedTask(task)}
            key={task._id}
            {...task}
            index={i}
            getTasks={getTasks}
            startTask={startTask}
            endTask={endTask}
          />
        ))}
      </section>
      {selectedTask && (
        <ModalUserDetailTask
          {...selectedTask}
          setSelectedTask={setSelectedTask}
          sendNote={sendNote}
        />
      )}
    </main>
  )
}

export default Dashboard
