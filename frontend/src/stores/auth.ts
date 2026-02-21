import { create } from "zustand";
import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN } from "@/lib/graphql/mutations/login";
import { REGISTER } from "@/lib/graphql/mutations/register";
import type { LoginInput, RegisterInput } from "@/types/auth";
import type { UserProps } from "@/types/user";

type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: UserProps;
  };
};

type LoginMutationData = {
  login: {
    token: string,
    refreshToken: string
    user: UserProps
  }
}

type AuthProps = {
  user: UserProps | null;
  token: string | null;
  isAuthenticated: boolean;
  signUp: (data: RegisterInput) => Promise<boolean>;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void
  updateUser: (user: UserProps) => void
};

export const useAuthStore = create<AuthProps>()(
  (set) => {

    const authStorage = localStorage.getItem('auth-storage')

    let authData = {
      user: null,
      token: null,
      isAuthenticated: false,
    }

    if (authStorage) {

      const authParsed = JSON.parse(authStorage)

      authData = {
        user: authParsed.user,
        token: authParsed.token,
        isAuthenticated: authParsed.isAuthenticated,
      }
    }

    return {
      user: authData.user,
      token: authData.token,
      isAuthenticated: authData.isAuthenticated,

      signUp: async (dataInput: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterInput }
          >({
            mutation: REGISTER,
            variables: {
              data: {
                full_name: dataInput.full_name,
                email: dataInput.email,
                password: dataInput.password,
              },
            },
          });

          if (data?.register) {
            const { token, user } = data.register;

            set({
              user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
              },
              token: token,
              isAuthenticated: true,
            });
            return true;
          }
        } catch (error) {
          console.log("Erro ao realizar cadastro");
          throw error;
        }
        return false;
      },

      login: async (dataInput: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginInput }
          >({
            mutation: LOGIN,
            variables: {
              data: {
                email: dataInput.email,
                password: dataInput.password,
              },
            },
          });

          if (data?.login) {
            const { token, user } = data.login;

            const userData = {
              id: user.id,
              full_name: user.full_name,
              email: user.email,
              created_at: user.created_at,
              updated_at: user.updated_at,
            }

            set({
              user: userData,
              token: token,
              isAuthenticated: true,
            });
            if (dataInput.rememberMe) {
              localStorage.setItem('auth-storage', JSON.stringify({
                user: userData,
                token: token,
                isAuthenticated: true,
              }))
            }
            return true;
          }
        } catch (error) {
          console.log("Erro ao efetuar o login");
          throw error;
        }
        return false;
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })

        localStorage.removeItem('auth-storage')
        apolloClient.clearStore()
      },
      updateUser: (user) => {
        set({
          user: user,
        })
      }
    }
  }
);
