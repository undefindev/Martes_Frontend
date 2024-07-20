import { TeamMember } from "@/types/index"
import Button from '../Button';
import { UserPlus2 } from "lucide-react";

type SearchResultProps = {
  user: TeamMember
}

export default function SearchResult({ user }: SearchResultProps) {
  return (
    <>
      <p className="mt-8 text-center font-semibold">Resultados</p>
      <div className="flex items-center justify-between">
        <p>{user.name}</p>
        <Button size='icon' variant='ghost'>
          <UserPlus2 />
        </Button>
      </div>
    </>
  )
}
