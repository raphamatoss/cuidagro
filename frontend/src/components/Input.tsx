import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ElementType, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: ElementType;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps> (
    ({label, icon: Icon, error, id, type, ...rest}, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        const togglePasswordVisibility = () => {
            setShowPassword((prevState) => !prevState);
        }
        
        return (
            <div className="flex w-full flex-col gap-1.5">
                <label 
                    htmlFor={id}
                    className="text-sm font-semibold text-gray-700 ml-1"
                >
                    {label}
                </label>

                <div className="group relative">
                    <div>
                        {Icon && (
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-agro-blue transition-colors">
                                <Icon size={20}/>
                            </div>
                        )}
                    </div>
                    <input
                        id={id}
                        ref={ref}
                        type={inputType}
                        {...rest}
                        className={`
                            p-3 w-full rounded-xl border-b-3 bg-gray-50 px-4 text-gray-700 outline-none transition-all focus:border-agro-blue/50 focus:ring-2 focus:ring-agro-blue-light focus:border-b-2
                            placeholder:text-gray-400/90
                            ${Icon ? 'pl-12' : 'pl-4'}
                            ${isPassword ? 'pr-12' : 'pr-4'}
                            ${error
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-200'
                            }
                        `}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-agro-blue transition-colors"
                            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        >
                            {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                        </button>
                    )}
                </div>

                {error && (
                    <span className="text-xs font-medium text-red-500 ml-1">
                        {error}
                    </span>
                )}
            </div>
        )
    }
);

Input.displayName = 'Input';