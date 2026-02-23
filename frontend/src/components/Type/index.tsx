import { CircleArrowDown, CircleArrowUp } from "lucide-react"

export type TypeProps = {
  type?: 'expense' | 'revenue'
}

export function Type({ type }: TypeProps) {
  return (
    <div className="flex items-center gap-2">
      {type === 'revenue' && (
        <>
          <CircleArrowUp className="size-4 text-green-base" />
          <span className="font-medium text-sm leading-[20px] text-green-dark">Entrada</span>
        </>
      )}
      {type === 'expense' && (
        <>
          <CircleArrowDown className="size-4 text-red-base" />
          <span className="font-medium text-sm leading-[20px] text-red-dark">Saída</span>
        </>
      )}
    </div>
  )
}