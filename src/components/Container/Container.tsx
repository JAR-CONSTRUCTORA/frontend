const Container = ({ children }: any) => {
  return (
    <div className="grid grid-cols-1 bg-[#1a1a1a] px-4 py-2 text-gray-200 lg:grid-cols-12">
      {children}
    </div>
  )
}

export default Container
