import { create } from "zustand";
import { persist } from "zustand/middleware";
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
};

export const useAuthStore = create<AuthProps>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

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

        apolloClient.clearStore()
      }
    }),
    {
      name: "auth-storage",
    },
  ),
);
