import { jwtDecode } from "jwt-decode";

function TokenToId(token: string) {
  if (token) {
    const decodedToken = jwtDecode<{ id: string; name: string }>(token);

    const userId = decodedToken.id;

    return userId;
  }
}

export default TokenToId;
