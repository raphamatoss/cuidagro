import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react';
import { api } from '../services/api';
import { authService } from '../services/authService';
import type { LoginDTO, UserRole } from '../types/auth';
interface UserState {
    cpf: string;
    nome: string;
    email: string;
    papel: UserRole;
}

interface AuthContextData {
    user: UserState | null;
    isAuthenticated: boolean;
    signIn: (credentials: LoginDTO) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserState | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@CuidAgro:user');
        const storagedToken = localStorage.getItem('@CuidAgro:token');

        if (storagedToken && storagedUser) {
            // Reconecta o Axios com o token salvo
            api.defaults.headers.common['Authorization'] =
                `Bearer ${storagedToken}`;
            setTimeout(() => {
                setUser(JSON.parse(storagedUser));
            }, 0);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 0);
    }, []);

    const signIn = async ({ login, senha }: LoginDTO) => {
        try {
            const response = await authService.login({ login, senha });
            console.log(response);
            
            if (!response.token) {
                throw new Error("O servidor não retornou um token de acesso.");
            }

            const usuario: UserState = {
                cpf: response.cpf,     
                nome: response.nome,   
                email: response.email, 
                papel: response.papel  
            };

            localStorage.setItem('@CuidAgro:token', response.token);
            localStorage.setItem('@CuidAgro:user', JSON.stringify(usuario));

            api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

            setUser(usuario);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem('@CuidAgro:token');
        localStorage.removeItem('@CuidAgro:user');
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                signIn,
                signOut,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    return context;
}
