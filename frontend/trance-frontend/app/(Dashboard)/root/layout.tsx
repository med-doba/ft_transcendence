import NavBar from "@/components/shared/NavBar"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    //    <div className="bg-sky-900 flex h-screen flex-row w-screen px-[1.66%] pb-[1.66%]">
       <div className="bg-sky-900 flex h-screen flex-row w-screen">
            <main className="flex flex-1">
                {/* <NavBar></NavBar> */}
                {children}
            </main>
      </div>
    )
  }