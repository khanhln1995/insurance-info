// app/index.tsx
import { Redirect } from "expo-router";
// import your auth state however you do it
// const isLoggedIn = useSelector(...)

export default function Index() {
  const isLoggedIn = false; // <- your real condition
  return <Redirect href={isLoggedIn ? "/home/index" : "/auth"} />;
}
