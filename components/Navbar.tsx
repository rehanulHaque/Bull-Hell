import { Input } from "./ui/input";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 py-4 shadow-md">
        <div>
            <h1 className="font-bold text-2xl">Blue Hell</h1>
        </div>
        <div>
            <Input placeholder="Search"/>
        </div>
    </nav>
  )
}
