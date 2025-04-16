"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook personnalisé pour gérer la navigation dans l'application.
 *
 * Ce hook encapsule la logique de navigation et de gestion des paramètres d'URL,
 * offrant une interface simplifiée pour naviguer entre les différentes vues
 * et maintenir l'état de l'application synchronisé avec l'URL.
 *
 * @returns Un objet contenant des fonctions et des valeurs pour la navigation
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Récupère un paramètre spécifique de l'URL.
   *
   * @param param - Le nom du paramètre à récupérer
   * @returns La valeur du paramètre ou null s'il n'existe pas
   */
  const getParam = useCallback(
    (param: string) => {
      return searchParams.get(param);
    },
    [searchParams]
  );

  /**
   * Navigue vers une nouvelle URL en conservant le chemin actuel
   * et en mettant à jour les paramètres de recherche.
   *
   * @param params - Un objet contenant les paramètres à définir ou mettre à jour
   */
  const navigate = useCallback(
    (params: Record<string, string | null>) => {
      // Créer une copie des paramètres actuels
      const newParams = new URLSearchParams(searchParams.toString());

      // Mettre à jour les paramètres
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      // Naviguer vers la nouvelle URL
      router.push(`${pathname}?${newParams.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return {
    navigate,
    getParam,
    pathname,
    searchParams,
  };
}
