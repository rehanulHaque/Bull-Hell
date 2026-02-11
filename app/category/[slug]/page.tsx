
export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const id = (await params).slug

  return (
    <div>
      <h1>Category: {id}</h1>
    </div>
  )
}
