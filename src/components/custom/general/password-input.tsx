import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const PasswordInput = ({
    value,
    onChange,
    placeholder,
    name,
}: {
    value: string
    onChange: (value: string) => void
    placeholder: string
    name: string
}) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative">
            <Input
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                name={name}
            />
            <Button
                type="button"
                variant="ghost"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-2 top-0 p-2"
            >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
        </div>
    )
}