import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apolloClient } from "@/lib/graphql/apollo";
import { UPDATE_PROFILE } from "@/lib/graphql/mutations/updateProfile";
import { useAuthStore } from "@/stores/auth";
import type { UserProps } from "@/types/user";
import { type UpdateProfileProps, updateProfileSchema } from "./validation";

type UpdateProfileMutationData = {
  updateProfile: UserProps
};

export function useProfile() {
  const { user, logout, updateUser } = useAuthStore();

  function handleLogOut() {
    logout();
  }

  const updateProfileForm = useForm<UpdateProfileProps>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user?.full_name,
      email: user?.email,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = updateProfileForm;

  const avatarFallback = useMemo(() => {
    let fallback = "";
    if (user) {
      const splittedName = user.full_name.split(" ");

      if (splittedName.length > 1) {
        const size = splittedName.length
        fallback = splittedName[0].charAt(0) + splittedName[size - 1].charAt(0);
      } else {
        fallback = user.full_name.slice(0, 2);
      }
      fallback = fallback.toUpperCase();
    }
    return fallback;
  }, [user]);

  async function onSubmit(data: UpdateProfileProps) {

    if (!user) {
      toast.error("Usuário não encontrado")
      return
    }

    try {
      const updateProfileMutate = await apolloClient.mutate<
        UpdateProfileMutationData,
        { data: UpdateProfileProps, id: string }
      >({
        mutation: UPDATE_PROFILE,
        variables: {
          data: {
            full_name: data.full_name,
            email: user.email,
          },
          id: user.id
        }
      });

      if (updateProfileMutate.data) {
        updateUser(updateProfileMutate.data.updateProfile)
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  return {
    user,
    errors,
    isSubmitting,
    avatarFallback,
    register,
    onSubmit,
    handleSubmit,
    handleLogOut,
  };
}
