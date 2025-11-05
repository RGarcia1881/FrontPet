import { Redirect } from "expo-router";

// Este archivo actúa como el punto de entrada (ruta raíz: /)
export default function Index() {
  // Redirige incondicionalmente a la pantalla Splash,
  // la cual contendrá la lógica de autenticación y redirección.
  return <Redirect href="/splashScreen" />;
}
