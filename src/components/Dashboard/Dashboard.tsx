import { Task } from '@/types'
import React from 'react'
import { CardTask } from '../CardTask'

interface Prop {
  data: Task[]
  section: string
}

const Dashboard: React.FC<Prop> = ({ data, section }) => {
  return (
    <main className="rounded-2xl border border-white/10 bg-[#212121] p-6 shadow-lg lg:col-span-10">
      <header className="mb-6 flex gap-2">
        <p className="w-fit gap-1 border-b-4 border-green-300 text-2xl font-semibold tracking-wider">
          {section}
        </p>
      </header>
      <section className="grid grid-cols-4 gap-6">
        {data?.map((task, i) => (
          <CardTask key={task._id} {...task} index={i} />
        ))}
      </section>
    </main>
  )
}

export default Dashboard
